# Agent and contributor guide (template)

> Replace placeholders. Keep this file short and accurate; out-of-date guidance is worse than none.

## Project overview
`<one paragraph: what the app is, stack, how it is deployed>`

## Essential commands
```bash
<install>   <dev>   <build>   <lint>   <typecheck>   <test>
```

## Architecture rules
- Follow the layered API/services/UI pipeline: endpoints → API calls → keys/options → service hooks → helpers → interfaces → UI.
- Fetched API data lives in React Query only; keep it out of Redux, Context and Zustand.
- UI components never call the HTTP client or API call functions directly.
- Private data uses user-scoped query keys; register new private roots.
- Every mutation documents and performs its invalidations.

## Conventions
- Naming, file layout, import aliases: `<fill in>`
- Types live in the area's `*.interface.ts`.
- Avoid inline prop types.

## Testing
- Pure helpers and service hooks get unit tests.
- A bug fix includes a regression test where practical.

## Security
- Never commit secrets or real credentials.
- Never log tokens or personal data.

## Commits and pull requests
- Small, reviewable changes tied to a ticket.
- Describe what changed and how it was verified.

## For coding agents
- Read the task document and the architecture standard before editing.
- Make the smallest change that satisfies the acceptance criteria.
- Run the verification commands and report their real output.
- If a requirement is ambiguous, ask instead of guessing.
