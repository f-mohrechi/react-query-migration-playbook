# From Redux Saga to TanStack Query: a migration playbook

A generic, anonymized write-up of how to move a large, live React/Next.js application from Redux Saga to TanStack React Query without freezing feature work, and how to keep the result from decaying.

> **Everything here is illustrative.** "Acme Exchange" is a fictional product, and every endpoint, component and key name is a placeholder. Nothing is copied from any employer's code, documents, tickets or systems, and there are no real metrics. The value is the method.

## The story (STAR)

**Situation.** Acme Exchange's server state lived in Redux Saga: sagas fetched, reducers stored the response, selectors read it, and each screen wired its own loading and error handling. Behavior drifted from screen to screen, and nobody could say with confidence which code owned a given piece of data.

**Task.** Move server state to TanStack React Query across dozens of routes while the product kept shipping, and make sure the same mess could not grow back. Money-adjacent and identity-adjacent screens (checkout, profile, security) had to stay correct throughout.

**Action.**
1. Wrote one short architecture standard first ([layered architecture](docs/02-layered-architecture.md)) so every migrated screen would end up shaped the same way.
2. Broke the work into small, route-sized tasks with a written plan each ([playbook](docs/01-migration-playbook.md), [task template](templates/migration-task-prompt.md)), migrated one feature area at a time, and kept each commit reviewable.
3. Split caches into public and user-scoped private data so that logout and account switching clear only what must be cleared ([cache scoping](docs/03-cache-scoping.md)).
4. Turned the rules into lint errors ([ESLint boundary examples](examples/eslint-boundaries.mjs)) and wrote them into an [agent/contributor guide](templates/AGENTS.md) so humans and coding agents follow the same conventions.
5. Deleted the old store and sagas at the end, and archived the plans.

**Result.** One documented way to handle server state, enforced by tooling rather than memory. I am deliberately not quoting performance or bug-count numbers here, because the point of this repository is the method, not a benchmark.

## Contents

| File | What it is |
|---|---|
| [docs/01-migration-playbook.md](docs/01-migration-playbook.md) | Phases, ordering, per-route workflow and exit criteria |
| [docs/02-layered-architecture.md](docs/02-layered-architecture.md) | The endpoints → calls → keys → services → helpers → UI layering |
| [docs/03-cache-scoping.md](docs/03-cache-scoping.md) | Public vs private query keys, invalidation and logout rules |
| [templates/migration-task-prompt.md](templates/migration-task-prompt.md) | A per-route task/prompt template for a human or a coding agent |
| [templates/AGENTS.md](templates/AGENTS.md) | A starter guide for contributors and coding agents |
| [examples/eslint-boundaries.mjs](examples/eslint-boundaries.mjs) | Flat-config rules that enforce the layers |
| [examples/src](examples/src) | Small TypeScript reference implementation of the layers and cache scoping |

## A note on AI-assisted migration

The task template is written so that a coding agent can execute a single route at a time. The leverage is in the written plan and the automated checks, not in the agent. A human still reviews every change before it merges.

## License

[MIT](LICENSE)
