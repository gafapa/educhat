import withSerwistInit from "@serwist/next";

const mode = process.env.BUILD_MODE;
const isProd = process.env.NODE_ENV === "production";
const useBasePath = isProd || mode === "export";
const basePath = useBasePath ? "/educhat" : "";
const assetPrefix = useBasePath ? "/educhat/" : "";
const SERWIST_MAX_PRECACHE_SIZE = 2 * 1024 * 1024;
console.log("[Next] build mode", mode);

const disableChunk = !!process.env.DISABLE_CHUNK || mode === "export";
console.log("[Next] build with chunk: ", !disableChunk);

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net;
    worker-src 'self' https://cdn.jsdelivr.net;
    connect-src 'self' blob: data: https: http:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = {
      child_process: false,
    };
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        perf_hooks: false,
        "import.meta": false, // prevent import.meta error
      };

      config.resolve.alias = {
        ...config.resolve.alias,
        // Removed @huggingface/transformers alias to allow proper module resolution for WebGPU
        "node:fs": false,
        "node:path": false,
        "node:util": false,
        "node:module": false,
        "node:child_process": false,
        "node:crypto": false,
        "node:events": false,
        "node:os": false,
        "node:stream": false,
        "node:url": false,
      };
    }

    return config;
  },
  output: mode,
  outputFileTracingExcludes: {
    "/*": ["./.agents/**/*", "./.claude/**/*", "./.metagallego/**/*"],
  },
  basePath,
  assetPrefix,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_ASSET_PREFIX: assetPrefix,
  },
  images: {
    unoptimized: mode === "export",
  },
  // Removed transpilePackages for @huggingface/transformers to allow proper worker loading
  // experimental: {
  //   forceSwcTransforms: true,
  // },
};

if (mode !== "export") {
  nextConfig.headers = async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  };
}

export default withSerwistInit({
  swSrc: "app/worker/service-worker.ts",
  swDest: "public/sw.js",
  register: false,
  maximumFileSizeToCacheInBytes: SERWIST_MAX_PRECACHE_SIZE,
  exclude: [
    ({ asset }) =>
      asset.name.endsWith(".wasm") ||
      asset.source.size() > SERWIST_MAX_PRECACHE_SIZE,
  ],
})(nextConfig);
