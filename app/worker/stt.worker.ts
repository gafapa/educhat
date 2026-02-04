import "./public-path";
import { pipeline, env } from "@huggingface/transformers";

// Skip local checks for models since we are running in browser environment
env.allowLocalModels = false;
env.useBrowserCache = true;

class STTWorker {
  static instance: any = null;
  static modelId: string | null = null;

  static async getInstance(model: string, callback?: (data: any) => void) {
    if (this.instance === null || this.modelId !== model) {
      if (this.instance) {
        // cleanup if possible? transformers.js pipelines don't have explicit dispose yet mostly
        // but we can just overwrite
      }

      this.modelId = model;
      this.instance = await pipeline("automatic-speech-recognition", model, {
        quantized: true,
        progress_callback: callback,
      } as any);
    }
    return this.instance;
  }
}

self.addEventListener("message", async (event) => {
  const { type, data } = event.data;

  if (type === "configure") {
    // Preload model
    const { model } = data;
    try {
      await STTWorker.getInstance(model, (progress) => {
        self.postMessage({
          type: "status",
          data: progress,
        });
      });
      self.postMessage({ type: "ready", data: { model } });
    } catch (err) {
      self.postMessage({ type: "error", data: err });
    }
  } else if (type === "transcribe") {
    const { audio, language, model } = data;

    try {
      const transcriber = await STTWorker.getInstance(model);

      console.log(
        `[STTWorker] Transcribing with language: ${language || "auto"} using model: ${model}`,
      );

      const output = await transcriber(audio, {
        chunk_length_s: 30,
        stride_length_s: 5,
        language: language === "auto" ? null : language,
        task: "transcribe",
      });

      const text = output.text || (Array.isArray(output) ? output[0].text : "");

      self.postMessage({
        type: "result",
        data: text,
      });
    } catch (err) {
      self.postMessage({ type: "error", data: err });
    }
  }
});
