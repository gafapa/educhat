import withSerwistInit from "@serwist/next";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const mode = process.env.BUILD_MODE;
console.log("[Next] build mode", mode);

const disableChunk = !!process.env.DISABLE_CHUNK || mode === "export";
console.log("[Next] build with chunk: ", !disableChunk);

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    worker-src 'self';
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
  swcMinify: false,
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
  basePath: "/educhat",
  assetPrefix: "/educhat/",
  images: {
    unoptimized: mode === "export",
  },
  // Removed transpilePackages for @huggingface/transformers to allow proper worker loading
  // experimental: {
  //   forceSwcTransforms: true,
  // },
};

const CorsHeaders = [
  { key: "Access-Control-Allow-Credentials", value: "true" },
  { key: "Access-Control-Allow-Origin", value: "*" },
  {
    key: "Access-Control-Allow-Methods",
    value: "*",
  },
  {
    key: "Access-Control-Allow-Headers",
    value: "*",
  },
  {
    key: "Access-Control-Max-Age",
    value: "86400",
  },
];

if (mode !== "export") {
  nextConfig.headers = async () => {
    return [
      {
        source: "/api/:path*",
        headers: CorsHeaders,
      },
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
})(nextConfig);
