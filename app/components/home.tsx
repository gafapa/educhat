"use client";

require("../polyfill");

import styles from "./home.module.scss";

import log from "loglevel";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ServiceWorkerMLCEngine } from "@mlc-ai/web-llm";

import LogoIcon from "../icons/logo.svg";
import LoadingIcon from "../icons/three-dots.svg";

import Locale from "../locales";
import { getCSSVar, useMobileScreen } from "../utils";
import { DEFAULT_MODELS, Path, SlotID } from "../constant";
import { getPublicPath } from "../config/paths";
import { ErrorBoundary } from "./error";
import { getISOLang, getLang } from "../locales";
import { SideBar } from "./sidebar";
import { useAppConfig } from "../store/config";
import { WebLLMApi } from "../client/webllm";
import { ModelClient, useChatStore } from "../store";
import { WebLLMContext } from "../context";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && (
        <div className={styles["loading-content-logo"] + " no-dark"}>
          <LogoIcon />
        </div>
      )}
      <LoadingIcon />
    </div>
  );
}

export function ErrorScreen(props: { message: string }) {
  return (
    <div className={styles["error-screen"] + " no-dark"}>
      <p>{props.message}</p>
    </div>
  );
}

const Settings = dynamic(async () => (await import("./settings")).Settings, {
  loading: () => <Loading noLogo />,
});

const Chat = dynamic(async () => (await import("./chat")).Chat, {
  loading: () => <Loading noLogo />,
});

const TemplatePage = dynamic(
  async () => (await import("./template")).TemplatePage,
  {
    loading: () => <Loading noLogo />,
  },
);

export function useSwitchTheme() {
  const config = useAppConfig();

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    if (config.theme === "dark") {
      document.body.classList.add("dark");
    } else if (config.theme === "light") {
      document.body.classList.add("light");
    }

    const metaDescriptionDark = document.querySelector(
      'meta[name="theme-color"][media*="dark"]',
    );
    const metaDescriptionLight = document.querySelector(
      'meta[name="theme-color"][media*="light"]',
    );

    if (config.theme === "auto") {
      metaDescriptionDark?.setAttribute("content", "#151515");
      metaDescriptionLight?.setAttribute("content", "#fafafa");
    } else {
      const themeColor = getCSSVar("--theme-color");
      metaDescriptionDark?.setAttribute("content", themeColor);
      metaDescriptionLight?.setAttribute("content", themeColor);
    }
  }, [config.theme]);
}

function useHtmlLang() {
  useEffect(() => {
    const lang = getISOLang();
    const htmlLang = document.documentElement.lang;

    if (lang !== htmlLang) {
      document.documentElement.lang = lang;
    }
  }, []);
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

const loadAsyncFonts = () => {
  const linkEl = document.createElement("link");
  linkEl.rel = "stylesheet";
  linkEl.href = getPublicPath("/fonts/font.css");
  document.head.appendChild(linkEl);
};

function Screen() {
  const config = useAppConfig();
  const location = useLocation();
  const isHome = location.pathname === Path.Home;
  const isMobileScreen = useMobileScreen();
  const shouldTightBorder = config.tightBorder && !isMobileScreen;

  useEffect(() => {
    loadAsyncFonts();
  }, []);

  return (
    <div
      className={
        styles.container +
        ` ${shouldTightBorder ? styles["tight-container"] : styles.container} ${
          (getLang() as string) === "ar" ? styles["rtl-screen"] : ""
        }`
      }
    >
      <>
        <SideBar className={isHome ? styles["sidebar-show"] : ""} />

        <div className={styles["window-content"]} id={SlotID.AppBody}>
          <Routes>
            <Route path={Path.Home} element={<Chat />} />
            <Route path={Path.Templates} element={<TemplatePage />} />
            <Route path={Path.Chat} element={<Chat />} />
            <Route path={Path.Settings} element={<Settings />} />
          </Routes>
        </div>
      </>
    </div>
  );
}

const useWebLLM = () => {
  const config = useAppConfig();
  const [webllm, setWebLLM] = useState<WebLLMApi | undefined>(undefined);
  const [isWebllmActive, setWebllmAlive] = useState(false);
  const [isWebllmInitializing, setWebllmInitializing] = useState(true);

  const isWebllmInitialized = useRef(false);
  const logLevelRef = useRef(config.logLevel);

  useEffect(() => {
    logLevelRef.current = config.logLevel;
  }, [config.logLevel]);

  // Initialize WebLLM engine
  useEffect(() => {
    let disposed = false;
    let sendEventInterval: ReturnType<typeof setInterval> | undefined;
    let webGPUCheckCallback: ((event: MessageEvent) => void) | undefined;
    const cleanupWebGPUProbe = () => {
      if (sendEventInterval) {
        clearInterval(sendEventInterval);
        sendEventInterval = undefined;
      }
      if (webGPUCheckCallback) {
        navigator.serviceWorker?.removeEventListener(
          "message",
          webGPUCheckCallback,
        );
        webGPUCheckCallback = undefined;
      }
    };

    isWebllmInitialized.current = false;
    setWebllmAlive(false);
    setWebLLM(undefined);
    setWebllmInitializing(true);

    const createInstance = (type: "serviceWorker" | "webWorker") => {
      if (disposed) return;
      try {
        setWebLLM(new WebLLMApi(type, logLevelRef.current, config.cacheType));
        setWebllmAlive(true);
        isWebllmInitialized.current = true;
      } catch (error) {
        console.error("[WebLLM] Failed to initialize engine:", error);
        setWebLLM(undefined);
        setWebllmAlive(false);
      } finally {
        setWebllmInitializing(false);
      }
    };

    // If service worker registration timeout, fall back to web worker
    const timeout = setTimeout(() => {
      if (!isWebllmInitialized.current && !disposed) {
        log.info(
          "Service Worker activation is timed out. Falling back to use web worker.",
        );
        cleanupWebGPUProbe();
        createInstance("webWorker");
      }
    }, 10_000);

    if ("serviceWorker" in navigator) {
      log.info("Service Worker API is available and in use.");
      navigator.serviceWorker.ready
        .then(() => {
          if (disposed) return;
          log.info("Service Worker is activated.");
          // Check whether WebGPU is available in Service Worker
          const request = {
            kind: "checkWebGPUAvilability",
            uuid: crypto.randomUUID(),
            content: "",
          };

          sendEventInterval = setInterval(() => {
            navigator.serviceWorker.controller?.postMessage(request);
          }, 200);

          webGPUCheckCallback = (event: MessageEvent) => {
            const message = event.data;
            if (message.kind === "return" && message.uuid === request.uuid) {
              const isWebGPUAvailable = message.content;
              log.info(
                isWebGPUAvailable
                  ? "Service Worker has WebGPU Available."
                  : "Service Worker does not have available WebGPU.",
              );
              if (!isWebllmInitialized.current) {
                createInstance(
                  isWebGPUAvailable ? "serviceWorker" : "webWorker",
                );
                clearTimeout(timeout);
              }
              cleanupWebGPUProbe();
            }
          };
          navigator.serviceWorker.addEventListener(
            "message",
            webGPUCheckCallback,
          );
        })
        .catch((error) => {
          log.warn(
            "Service Worker readiness check failed. Falling back to web worker.",
            error,
          );
          cleanupWebGPUProbe();
          createInstance("webWorker");
          clearTimeout(timeout);
        });
    } else {
      log.info(
        "Service Worker API is unavailable. Falling back to use web worker.",
      );
      createInstance("webWorker");
      clearTimeout(timeout);
    }

    return () => {
      disposed = true;
      clearTimeout(timeout);
      cleanupWebGPUProbe();
    };
  }, [config.cacheType]);

  // Heartbeat monitoring for service worker engine - must be in useEffect with cleanup
  useEffect(() => {
    if (webllm?.webllm.type !== "serviceWorker") {
      return;
    }

    const heartbeatInterval = setInterval(() => {
      if (webllm) {
        // 10s per heartbeat, dead after 30 seconds of inactivity
        setWebllmAlive(
          !!webllm.webllm.engine &&
            (webllm.webllm.engine as ServiceWorkerMLCEngine).missedHeartbeat <
              3,
        );
      }
    }, 10_000);

    return () => {
      clearInterval(heartbeatInterval);
    };
  }, [webllm]);

  return { webllm, isWebllmActive, isWebllmInitializing };
};

const useLoadUrlParam = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parseNumberParam = (
      key: string,
      parser: (value: string) => number,
    ) => {
      const raw = params.get(key);
      if (raw === null) return null;
      const parsed = parser(raw);
      return Number.isFinite(parsed) ? parsed : null;
    };

    const modelParam = params.get("model");

    let modelConfig: any = {
      model: modelParam && modelParam.length > 0 ? modelParam : null,
      temperature: parseNumberParam("temperature", parseFloat),
      top_p: parseNumberParam("top_p", parseFloat),
      max_tokens: parseNumberParam("max_tokens", (v) => parseInt(v, 10)),
      presence_penalty: parseNumberParam("presence_penalty", parseFloat),
      frequency_penalty: parseNumberParam("frequency_penalty", parseFloat),
    };
    Object.keys(modelConfig).forEach((key) => {
      // If the value of the key is null, delete the key
      if (modelConfig[key] === null) {
        delete modelConfig[key];
      }
    });
    if (Object.keys(modelConfig).length > 0) {
      log.info("Loaded model config from URL params", modelConfig);
      useAppConfig.getState().updateModelConfig(modelConfig);
    }
  }, []);
};

const useStopStreamingMessages = () => {
  // Clean up bad chat messages due to refresh during generating
  useEffect(() => {
    useChatStore.getState().stopStreaming();
  }, []);
};

const useLogLevel = (webllm?: WebLLMApi) => {
  const config = useAppConfig();

  // Update log level once app config loads
  useEffect(() => {
    log.setLevel(config.logLevel);
    if (webllm?.webllm?.engine) {
      webllm.webllm.engine.setLogLevel(config.logLevel);
    }
  }, [config.logLevel, webllm?.webllm?.engine]);
};

const useModels = () => {
  useEffect(() => {
    useAppConfig.getState().setModels(DEFAULT_MODELS);
  }, []);
};

export function Home() {
  const hasHydrated = useHasHydrated();
  const { webllm, isWebllmActive, isWebllmInitializing } = useWebLLM();

  useSwitchTheme();
  useHtmlLang();
  useLoadUrlParam();
  useStopStreamingMessages();
  useModels();
  useLogLevel(webllm);

  if (!hasHydrated || isWebllmInitializing) {
    return <Loading />;
  }

  if (!webllm || !isWebllmActive) {
    return <ErrorScreen message={Locale.ServiceWorker.Error} />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <WebLLMContext.Provider value={webllm}>
          <Screen />
        </WebLLMContext.Provider>
      </Router>
    </ErrorBoundary>
  );
}
