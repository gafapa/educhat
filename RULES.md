# Rules

## Language and Naming

- All code identifiers must remain in English
- All Markdown documentation in this repository must remain in English
- All code comments and commit messages must remain in English

## Source of Truth

- Keep code and documentation synchronized in every change set
- Update `README.md`, `ARCHITECTURE.md`, and `RULES.md` when behavior, structure, or workflow changes
- Do not leave architectural decisions undocumented

## Package Management

- Use `npm` as the package manager
- Treat `package-lock.json` as the dependency lock source of truth
- Do not introduce `yarn.lock` or mixed package-manager workflows without an explicit migration

## Deployment Rules

- GitHub Pages static export is served under the `/educhat` base path
- Public assets, manifest links, prompt files, fonts, and service worker registration must use base-path-aware URLs
- Changes that affect export behavior must be validated with `npm run export`

## Quality Gates

- Run `npm run lint` before finalizing changes
- Run `npm run build` for runtime-impacting changes
- Run `npm run export` for any change that touches routing, public assets, or deployment behavior
- Keep `eslint.config.mjs` aligned with the lint script when upgrading Next.js or ESLint

## Runtime Rules

- Preserve the current client-first architecture unless there is an explicit product decision to add a backend
- Maintain the fallback path from service worker execution to web worker execution
- Avoid adding dependencies that duplicate existing runtime responsibilities

## Workflow Rules

- Prefer focused, descriptive commits
- Keep GitHub Actions aligned with the active package manager and build commands
- Keep the Next.js scripts on the same bundler path used by the repository configuration when custom Webpack behavior is required
- Do not merge dependency upgrades and framework migrations blindly; separate patch-level maintenance from major-version migrations
- Keep local agent or editor tooling folders out of version control and out of Next.js output tracing so workspace-only junctions cannot break builds
