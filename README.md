# Edu Chat

Edu Chat is a browser-first AI chat application focused on privacy, local inference, and classroom-friendly usage. It runs large language models in the browser with WebLLM and WebGPU, without requiring a backend for the core chat experience.

## Highlights

- Local inference in the browser through WebGPU and WebLLM
- Privacy-first chat flows with no mandatory remote API dependency
- Progressive Web App support with a Serwist service worker
- Multilingual interface, including Galician support
- Static export support for GitHub Pages under the `/educhat` base path

## Stack

- Next.js 16 App Router
- React 18
- TypeScript
- Zustand for client-side state
- WebLLM for local model execution
- Hugging Face Transformers.js for speech workers
- Serwist for service worker bundling
- Sass modules for styling

## Project Documents

- [Architecture](./ARCHITECTURE.md)
- [Rules](./RULES.md)

## Development

Install dependencies and run the local development server:

```bash
npm install
npm run dev
```

The main scripts are:

- `npm run dev`: Start the development server
- `npm run lint`: Run ESLint through `eslint.config.mjs`
- `npm run build`: Build the standalone Next.js output with Webpack
- `npm run export`: Build the static export used by GitHub Pages with Webpack
- `npm run prompts`: Refresh the prompt catalog in `public/prompts.json`

## Deployment Modes

Edu Chat currently supports two deployment modes:

- GitHub Pages using `npm run export`
- Vercel production deployment through the repository workflow

Static deployments use the `/educhat` base path. Public assets and service worker registration must always respect that base path.

## Current Technical Notes

- The repository uses `npm` and `package-lock.json` as the source of truth
- GitHub Pages CI is expected to build through `npm ci` and `npm run export`
- The lint pipeline uses ESLint CLI with flat config in `eslint.config.mjs`
- The client is heavy because model runtime assets and WebAssembly bundles are large
- Very large runtime bundles are intentionally excluded from the precache manifest to avoid oversized offline downloads
- Next.js security advisories are cleared on the current dependency tree after the migration to 16.x

## License

This project is distributed under the Apache 2.0 license. See [LICENSE](./LICENSE) for details.
