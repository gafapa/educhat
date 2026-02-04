import { ServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, ExpirationPlugin, Serwist } from "serwist";

declare const self: ServiceWorkerGlobalScope;
const CHATGPT_NEXT_WEB_CACHE = "chatgpt-next-web-cache";
let handler: ServiceWorkerMLCEngineHandler;

async function checkGPUAvailablity() {
  if (!("gpu" in navigator)) {
    console.log("Service Worker: Web-LLM Engine Activated");
    return false;
  }
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    console.log("Service Worker: Web-LLM Engine Activated");
    return false;
  }
  return true;
}

self.addEventListener("message", (event) => {
  if (!handler) {
    handler = new ServiceWorkerMLCEngineHandler();
    console.log("Service Worker: Web-LLM Engine Activated");
  }

  const msg = event.data;
  if (msg.kind === "checkWebGPUAvilability") {
    console.log("Service Worker: Web-LLM Engine Activated");
    checkGPUAvailablity().then((gpuAvailable) => {
      console.log(
        "Service Worker: WebGPU is " +
          (gpuAvailable ? "available" : "unavailable"),
      );
      const reply = {
        kind: "return",
        uuid: msg.uuid,
        content: gpuAvailable,
      };
      event.source?.postMessage(reply);
    });
  }
});

self.addEventListener("install", (event) => {
  // Always update right away
  self.skipWaiting();

  event.waitUntil(
    caches.open(CHATGPT_NEXT_WEB_CACHE).then((cache) => {
      return cache.addAll([]);
    }),
  );
});

self.addEventListener("activate", (event) => {
  if (!handler) {
    handler = new ServiceWorkerMLCEngineHandler();
    console.log("Service Worker: Web-LLM Engine Activated");
  }
});

// This declares the value of the injection point to TypeScript.
// The string is removed to prevent "Multiple instances" error.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

// Transform manifest to use relative paths (strip leading slash and add ./)
// We must reference the injection point only once.
const originalManifest = self.__SW_MANIFEST;
const manifest = originalManifest?.map((entry) => {
  let url = "";
  if (typeof entry === "string") {
    url = entry;
  } else if (entry && entry.url) {
    url = entry.url;
  }

  if (url.startsWith("/")) {
    const newUrl = "." + url;
    if (typeof entry === "string") return newUrl;
    return { ...entry, url: newUrl };
  }
  return entry;
});

console.log("SW: Original Manifest", originalManifest);
console.log("SW: Transformed Manifest", manifest);

const serwist = new Serwist({
  precacheEntries: manifest,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ sameOrigin, url: { pathname } }) =>
        sameOrigin && pathname === "/ping.txt",
      handler: new CacheFirst({
        cacheName: "WebLLMChatServiceWorkerKeepAlive",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
            maxAgeFrom: "last-used",
          }),
        ],
      }),
    },
  ],
});

serwist.addEventListeners();
