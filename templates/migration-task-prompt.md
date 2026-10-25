# Migration task: <route or component name>

> Hand this to a developer or a coding agent. One task = one route or feature area. Read the architecture standard first.

## Task
Remove Redux/Saga usage from `<path/to/Component>` and replace it with React Query hooks that follow the layered architecture.

## Source files
- Component: `<path>`
- Related store modules: `<path>`, `<path>`

## Current Redux usage (fill in before starting)
- Imports: `<list>`
- Actions dispatched: `<list>`
- Selectors read: `<list>`
- Saga(s) involved and the endpoint each calls: `<list>`

## Classify each piece of data
| Data | Server state / mutation / client state | Public or private |
|---|---|---|
| `<name>` | `<kind>` | `<scope>` |

## Target structure
- Endpoint constant(s) in `constants/api.ts`
- API call(s) in `apiServices/<area>/apiCalls.ts`
- Key factory/options in `apiServices/<area>/constants.ts`
- Hook(s) in `apiServices/<area>/service.ts`
- Pure helpers in `apiServices/<area>/helpers.ts`
- Types in `components/<Area>/<area>.interface.ts`

## Implementation instructions
1. Implement the API calls with the shared HTTP client; return response data only.
2. Create query-key factories. Include every variable the query function uses.
3. Private data: wrap the key with the user-scope helper and gate with `enabled`.
4. Mutations: perform and document the narrowest invalidation.
5. Replace the component's dispatch/selector code with the hooks. Keep the component thin.
6. Remove actions, reducers and sagas that are now unused. Do not leave dead code.
7. Do not add new Redux, saga or store imports.

## Acceptance criteria
- [ ] No Redux/saga imports in the component tree
- [ ] All API access goes through the service layer
- [ ] Keys complete; private data scoped
- [ ] Each mutation's invalidations are documented and tested where practical
- [ ] Loading and error states handled via the query states
- [ ] Types, lint and tests pass

## Verification commands
```bash
<typecheck command>
<lint command>
<test command for this area>
```

## Notes for the implementer
- Anything uncertain about behavior: stop and ask rather than guessing.
- Record anything surprising in the pull request description.
