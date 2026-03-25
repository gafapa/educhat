"use client";

import log from "loglevel";
import { createContext } from "react";
import {
  InitProgressReport,
  prebuiltAppConfig,
  ChatCompletionMessageParam,
  ServiceWorkerMLCEngine,
  ChatCompletionChunk,
  ChatCompletion,
  WebWorkerMLCEngine,
  CompletionUsage,
  ChatCompletionFinishReason,
} from "@mlc-ai/web-llm";

import { ChatOptions, LLMApi, LLMConfig, RequestMessage } from "./api";
import { LogLevel } from "@mlc-ai/web-llm";
import { fixMessage } from "../utils";
import { DEFAULT_MODELS } from "../constant";
import { CacheType } from "../store";

const KEEP_ALIVE_INTERVAL = 5_000;

type ServiceWorkerWebLLMHandler = {
  type: "serviceWorker";
  engine: ServiceWorkerMLCEngine;
};

type WebWorkerWebLLMHandler = {
  type: "webWorker";
  engine: WebWorkerMLCEngine;
};

type WebLLMHandler = ServiceWorkerWebLLMHandler | WebWorkerWebLLMHandler;

export class WebLLMApi implements LLMApi {
  private llmConfig?: LLMConfig;
  private initialized = false;
  webllm: WebLLMHandler;
  private readonly logLevel: LogLevel;
  private readonly cacheType: CacheType;

  constructor(
    type: "serviceWorker" | "webWorker",
    logLevel: LogLevel = "WARN",
    cacheType: CacheType = CacheType.Cache,
  ) {
    this.logLevel = logLevel;
    this.cacheType = cacheType;
    this.webllm = this.createEngine(type);
  }

  private getEngineConfig() {
    return {
      appConfig: {
        ...prebuiltAppConfig,
        useIndexedDBCache: this.cacheType === CacheType.IndexDB,
      },
      logLevel: this.logLevel,
    };
  }

  private createEngine(type: "serviceWorker" | "webWorker"): WebLLMHandler {
    const engineConfig = this.getEngineConfig();

    if (type === "serviceWorker") {
      log.info("Create ServiceWorkerMLCEngine");
      return {
        type: "serviceWorker",
        engine: new ServiceWorkerMLCEngine(engineConfig, KEEP_ALIVE_INTERVAL),
      };
    }

    log.info("Create WebWorkerMLCEngine");
    if (typeof Worker === "undefined") {
      log.warn("Web Worker is not available in this environment.");
      // This case only happens if the class is instantiated on the server side.
      return {
        type: "webWorker",
        engine: null as any,
      };
    }

    return {
      type: "webWorker",
      engine: new WebWorkerMLCEngine(
        new Worker(new URL("../worker/web-worker.ts", import.meta.url), {
          type: "module",
        }),
        engineConfig,
      ),
    };
  }

  private shouldFallbackToWebWorker(error: unknown) {
    if (this.webllm.type !== "serviceWorker") {
      return false;
    }

    const errorMessage =
      error instanceof Error ? error.message : String(error ?? "");
    const normalized = errorMessage.toLowerCase();

    return (
      normalized.includes("linkerror") ||
      normalized.includes("webassembly.instantiate") ||
      normalized.includes("tvmffiwasmsafecall")
    );
  }

  private async fallbackToWebWorker(error: unknown) {
    if (this.webllm.type !== "serviceWorker") {
      return false;
    }

    log.warn(
      "Service worker model initialization failed. Falling back to web worker.",
      error,
    );

    try {
      await this.webllm.engine.unload();
    } catch (unloadError) {
      log.warn(
        "Failed to unload service worker engine before fallback",
        unloadError,
      );
    }

    try {
      this.webllm = this.createEngine("webWorker");
      this.initialized = false;
      return true;
    } catch (fallbackError) {
      log.error("Web worker fallback initialization failed", fallbackError);
      return false;
    }
  }

  private async initModel(
    onInitProgress?: (report: InitProgressReport) => void,
  ) {
    if (!this.llmConfig) {
      throw Error("llmConfig is undefined");
    }
    this.webllm.engine.setInitProgressCallback((report: InitProgressReport) => {
      onInitProgress?.(report);
    });
    await this.webllm.engine.reload(this.llmConfig.model, this.llmConfig);
    this.initialized = true;
  }

  async chat(options: ChatOptions): Promise<void> {
    let retried = false;

    const ensureInitialized = async (force = false) => {
      const needsInit =
        force || !this.initialized || this.isDifferentConfig(options.config);
      if (!needsInit) return;

      if (force && this.webllm.engine?.unload) {
        try {
          await this.webllm.engine.unload();
        } catch (e) {
          log.warn("Failed to unload model before reload", e);
        }
      }

      this.llmConfig = { ...(this.llmConfig || {}), ...options.config };
      // Check if this is a Qwen3 model with thinking mode enabled
      const isQwen3Model = this.llmConfig?.model
        ?.toLowerCase()
        .startsWith("qwen3");
      const isThinkingEnabled = this.llmConfig?.enable_thinking === true;

      // Apply special config for Qwen3 models with thinking mode enabled
      if (isQwen3Model && isThinkingEnabled && this.llmConfig) {
        this.llmConfig = {
          ...this.llmConfig,
          temperature: 0.6,
          top_p: 0.95,
        };
      }
      try {
        await this.initModel(options.onInitProgress);
        options.onInitDone?.();
      } catch (err: any) {
        if (this.shouldFallbackToWebWorker(err)) {
          const didFallback = await this.fallbackToWebWorker(err);
          if (didFallback) {
            await this.initModel(options.onInitProgress);
            options.onInitDone?.();
            return;
          }
        }

        let errorMessage = err.message || err.toString() || "";
        if (errorMessage === "[object Object]") {
          errorMessage = JSON.stringify(err);
        }
        options.onInitDone?.();
        console.error("Error while initializing the model", errorMessage);
        throw new Error(errorMessage);
      }
    };

    try {
      await ensureInitialized(false);
    } catch (err: any) {
      options?.onError?.(err instanceof Error ? err : new Error(String(err)));
      return;
    }

    let reply: string | null = "";
    let stopReason: ChatCompletionFinishReason | undefined;
    let usage: CompletionUsage | undefined;
    while (true) {
      try {
        const completion = await this.chatCompletion(
          !!options.config.stream,
          options.messages,
          options.onUpdate,
        );
        reply = completion.content;
        stopReason = completion.stopReason;
        usage = completion.usage;
        break;
      } catch (err: any) {
        let errorMessage = err.message || err.toString() || "";
        if (errorMessage === "[object Object]") {
          log.error(JSON.stringify(err));
          errorMessage = JSON.stringify(err);
        }

        const isModelNotLoaded =
          err?.name === "ModelNotLoadedError" ||
          errorMessage.includes("ModelNotLoadedError") ||
          errorMessage.toLowerCase().includes("model not loaded");

        if (!retried && isModelNotLoaded) {
          retried = true;
          this.initialized = false;
          try {
            await ensureInitialized(true);
            continue;
          } catch (initErr: any) {
            options.onError?.(
              initErr instanceof Error ? initErr : new Error(String(initErr)),
            );
            return;
          }
        }

        console.error("Error in chatCompletion", errorMessage);
        if (
          errorMessage.includes("WebGPU") &&
          errorMessage.includes("compatibility chart")
        ) {
          // Add WebGPU compatibility chart link
          errorMessage = errorMessage.replace(
            "compatibility chart",
            "[compatibility chart](https://caniuse.com/webgpu)",
          );
        }
        options.onError?.(new Error(errorMessage));
        return;
      }
    }

    if (reply) {
      reply = fixMessage(reply);
      options.onFinish(reply, stopReason, usage);
    } else {
      options.onError?.(new Error("Empty response generated by LLM"));
    }
  }

  async abort() {
    await this.webllm.engine?.interruptGenerate();
  }

  private isDifferentConfig(config: LLMConfig): boolean {
    if (!this.llmConfig) {
      return true;
    }

    // Compare required fields
    if (this.llmConfig.model !== config.model) {
      return true;
    }

    // Compare optional fields
    const optionalFields: (keyof LLMConfig)[] = [
      "temperature",
      "context_window_size",
      "top_p",
      "stream",
      "presence_penalty",
      "frequency_penalty",
      "enable_thinking",
    ];

    for (const field of optionalFields) {
      if (
        this.llmConfig[field] !== undefined &&
        config[field] !== undefined &&
        this.llmConfig[field] !== config[field]
      ) {
        return true;
      }
    }

    return false;
  }

  async chatCompletion(
    stream: boolean,
    messages: RequestMessage[],
    onUpdate?: (
      message: string,
      chunk: string,
      usage?: CompletionUsage,
    ) => void,
  ) {
    // For Qwen3 models, we need to filter out the <think>...</think> content
    // Do not do it inplace, create a new messages array
    let newMessages: RequestMessage[] | undefined;
    const isQwen3Model = this.llmConfig?.model
      ?.toLowerCase()
      .startsWith("qwen3");
    if (isQwen3Model) {
      newMessages = messages.map((message) => {
        const newMessage = { ...message };
        if (
          message.role === "assistant" &&
          typeof message.content === "string"
        ) {
          newMessage.content = message.content.replace(
            /^<think>[\s\S]*?<\/think>\n?\n?/,
            "",
          );
        }
        return newMessage;
      });
    }

    // Prepare extra_body with enable_thinking option for Qwen3 models
    const extraBody: Record<string, any> = {};
    if (isQwen3Model) {
      extraBody.enable_thinking = this.llmConfig?.enable_thinking ?? false;
    }

    const completion = await this.webllm.engine.chatCompletion({
      stream: stream,
      messages: (newMessages || messages) as ChatCompletionMessageParam[],
      ...(stream ? { stream_options: { include_usage: true } } : {}),
      ...(Object.keys(extraBody).length > 0 ? { extra_body: extraBody } : {}),
    });

    if (stream) {
      let content: string | null = "";
      let stopReason: ChatCompletionFinishReason | undefined;
      let usage: CompletionUsage | undefined;
      const asyncGenerator = completion as AsyncIterable<ChatCompletionChunk>;
      for await (const chunk of asyncGenerator) {
        if (chunk.choices[0]?.delta.content) {
          content += chunk.choices[0].delta.content;
          onUpdate?.(content, chunk.choices[0].delta.content);
        }
        if (chunk.usage) {
          usage = chunk.usage;
        }
        if (chunk.choices[0]?.finish_reason) {
          stopReason = chunk.choices[0].finish_reason;
        }
      }
      return { content, stopReason, usage };
    }

    const chatCompletion = completion as ChatCompletion;
    return {
      content: chatCompletion.choices[0].message.content,
      stopReason: chatCompletion.choices[0].finish_reason,
      usage: chatCompletion.usage,
    };
  }

  async models() {
    return DEFAULT_MODELS;
  }
}
