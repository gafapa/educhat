import { useAppConfig } from "../store/config";

export class SpeechService {
  private static instance: SpeechService;
  private worker: Worker | null = null;
  private ready: boolean = false;
  private isLoading: boolean = false;
  private onProgressCallback: ((data: any) => void) | null = null;

  private constructor() {
    if (typeof window !== "undefined") {
      this.worker = new Worker(
        new URL("../worker/stt.worker.ts", import.meta.url),
        {
          type: "module",
        },
      );

      this.worker.addEventListener("message", (event) => {
        const { type, data } = event.data;
        console.log("[SpeechService] Message from worker", type, data);

        switch (type) {
          case "status":
            if (this.onProgressCallback) {
              this.onProgressCallback(data);
            }
            break;
          case "ready":
            this.ready = true;
            this.isLoading = false;
            console.log("[SpeechService] Model ready");
            break;
          case "error":
            console.error("[SpeechService] Worker error", data);
            this.isLoading = false;
            break;
        }
      });
    }
  }

  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  public async preloadModel(onProgress?: (data: any) => void) {
    const config = useAppConfig.getState().sttConfig;
    const modelToLoad = config.model; // e.g. "Xenova/whisper-tiny"

    this.onProgressCallback = onProgress || null;
    this.isLoading = true;
    this.ready = false;

    this.worker?.postMessage({
      type: "configure",
      data: { model: modelToLoad },
    });

    // We don't await here because communication is async via messages
    // The calling code might want to wait, usually UI handles loading state via isLoading checks or callbacks
  }

  public async transcribe(
    audioBlob: Blob,
    onProgress?: (data: any) => void,
  ): Promise<string> {
    const config = useAppConfig.getState().sttConfig;

    this.onProgressCallback = onProgress || null;

    if (!this.ready) {
      this.worker?.postMessage({
        type: "configure",
        data: { model: config.model },
      });
    }

    const audioContext = new AudioContext();
    let audioData: Float32Array;

    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Resample to 16000Hz using OfflineAudioContext if needed
      if (audioBuffer.sampleRate !== 16000) {
        const offlineContext = new OfflineAudioContext(
          1,
          audioBuffer.duration * 16000,
          16000,
        );
        const source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(offlineContext.destination);
        source.start();
        const resampledBuffer = await offlineContext.startRendering();
        audioData = resampledBuffer.getChannelData(0);
      } else {
        audioData = audioBuffer.getChannelData(0);
      }
    } finally {
      // Important: close the context to prevent resource leaks (limit is usually 6 contexts)
      await audioContext.close();
    }

    return new Promise((resolve, reject) => {
      const handler = (event: MessageEvent) => {
        const { type, data } = event.data;
        if (type === "result") {
          this.worker?.removeEventListener("message", handler);
          resolve(data);
        } else if (type === "error") {
          this.worker?.removeEventListener("message", handler);
          reject(data);
        }
      };
      this.worker?.addEventListener("message", handler);

      this.worker?.postMessage({
        type: "transcribe",
        data: {
          audio: audioData,
          model: config.model,
          language: config.language,
        },
      });
    });
  }

  // Removed manual resampleAudio method as we use OfflineAudioContext now
}
