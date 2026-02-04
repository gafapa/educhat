import { pipeline, env } from "@huggingface/transformers";

// Configure transformers.js - use WASM backend
if (env.backends?.onnx?.wasm) {
  env.backends.onnx.wasm.numThreads = 1;
}

// Voice embeddings URL base
const BASE_VOICE_URL =
  "https://huggingface.co/onnx-community/Supertonic-TTS-2-ONNX/resolve/main/voices/";

class TTSWorker {
  synthesizer: any = null;
  modelId = "onnx-community/Supertonic-TTS-2-ONNX";

  async initialize(): Promise<void> {
    try {
      self.postMessage({
        type: "status",
        data: { progress: 0.1, text: "Loading TTS model..." },
      });

      this.synthesizer = await pipeline("text-to-speech", this.modelId, {
        device: "webgpu",
        progress_callback: (progress: any) => {
          if (progress.status === "progress") {
            const pct = progress.progress || 0;
            self.postMessage({
              type: "status",
              data: {
                progress: pct / 100,
                text: `Loading TTS: ${progress.file || ""}`,
              },
            });
          }
        },
      });

      self.postMessage({ type: "ready" });
    } catch (error: any) {
      console.error("TTS Worker Init Error:", error);
      self.postMessage({
        type: "error",
        data: error?.message || "Failed to initialize TTS",
      });
    }
  }

  wrapWithLanguageTag(text: string, lang: string): string {
    // Map common language codes to Supertonic-2 supported codes
    const langMap: Record<string, string> = {
      en: "en",
      es: "es",
      fr: "fr",
      pt: "pt",
      ko: "ko",
      // Fallback to English for unsupported languages
      de: "en",
      it: "en",
      zh: "en",
      ja: "en",
      ru: "en",
    };

    const targetLang = langMap[lang] || "en";
    return `<${targetLang}>${text}</${targetLang}>`;
  }

  async generate(
    text: string,
    language: string,
    voice: string = "F1",
  ): Promise<void> {
    if (!this.synthesizer) {
      self.postMessage({ type: "error", data: "TTS Engine not initialized" });
      return;
    }

    try {
      const taggedText = this.wrapWithLanguageTag(text, language);
      const voiceUrl = `${BASE_VOICE_URL}${voice}.bin`;

      const result = await this.synthesizer(taggedText, {
        speaker_embeddings: voiceUrl,
        num_inference_steps: 5,
      });

      // result.audio is Float32Array
      self.postMessage({
        type: "result",
        data: {
          audio: result.audio,
          sampling_rate: result.sampling_rate,
        },
      });
    } catch (error: any) {
      console.error("TTS Generation Error:", error);
      self.postMessage({
        type: "error",
        data: error?.message || "TTS generation failed",
      });
    }
  }
}

const worker = new TTSWorker();

self.onmessage = async (e: MessageEvent) => {
  const { type, data } = e.data;

  switch (type) {
    case "configure":
      await worker.initialize();
      break;
    case "speak":
      await worker.generate(data.text, data.language, data.voice);
      break;
  }
};
