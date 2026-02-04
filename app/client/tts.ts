import { useAppConfig } from "../store/config";

export class TtsService {
  private static instance: TtsService;
  private worker: Worker | null = null;
  private ready: boolean = false;
  private isLoading: boolean = false;

  private constructor() {
    if (typeof window !== "undefined") {
      this.worker = new Worker(
        new URL("../worker/tts.worker.ts", import.meta.url),
        {
          type: "module",
        },
      );

      this.worker.addEventListener("message", (event) => {
        const { type, data } = event.data;
        if (type !== "status") {
          console.log("[TtsService] Message from worker", type, data);
        }

        switch (type) {
          case "ready":
            this.ready = true;
            this.isLoading = false;
            console.log("[TtsService] Model ready");
            break;
          case "error":
            console.error("[TtsService] Worker error", data);
            this.isLoading = false;
            break;
        }
      });
    }
  }

  public static getInstance(): TtsService {
    if (!TtsService.instance) {
      TtsService.instance = new TtsService();
    }
    return TtsService.instance;
  }

  private initPromise: Promise<void> | null = null;

  private async ensureInitialized(model: string): Promise<void> {
    if (this.ready) return;

    if (!this.initPromise) {
      this.initPromise = new Promise((resolve, reject) => {
        const handler = (event: MessageEvent) => {
          const { type, data } = event.data;
          if (type === "ready") {
            this.worker?.removeEventListener("message", handler);
            resolve();
          } else if (type === "error") {
            // Check for initialization specific errors if possible, or assume generic error during init is fatal
            this.worker?.removeEventListener("message", handler);
            this.initPromise = null; // Allow retry
            reject(
              new Error(
                typeof data === "string" ? data : "TTS initialization failed",
              ),
            );
          }
        };
        this.worker?.addEventListener("message", handler);

        this.worker?.postMessage({
          type: "configure",
          data: { model },
        });
      });
    }
    return this.initPromise;
  }

  public async speak(text: string): Promise<void> {
    const config = useAppConfig.getState().ttsConfig;
    const model = "onnx-community/Supertonic-TTS-2-ONNX";

    try {
      await this.ensureInitialized(model);
    } catch (error) {
      console.error("[TtsService] Initialization failed:", error);
      throw error;
    }

    return new Promise((resolve, reject) => {
      const handler = (event: MessageEvent) => {
        const { type, data } = event.data;
        if (type === "result") {
          this.worker?.removeEventListener("message", handler);
          this.playAudio(data.audio, data.sampling_rate);
          resolve();
        } else if (type === "error") {
          this.worker?.removeEventListener("message", handler);
          reject(data);
        }
      };

      this.worker?.addEventListener("message", handler);

      this.worker?.postMessage({
        type: "speak",
        data: {
          text,
          model,
          language: config.language,
          voice: config.voice,
        },
      });
    });
  }

  private playAudio(audioData: Float32Array, sampleRate: number) {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, audioData.length, sampleRate);
    buffer.getChannelData(0).set(audioData);

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  }
}
