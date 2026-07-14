# dk:ui-review — apps/web

Verdict: **major-violations**. Scope: full frontend source; no source code changed.

## Findings

- Critical | `apps/web/package.json:24`, `apps/web/app/globals.css:1` | Team UI Kit is absent; standalone Tailwind is consumed. | Install and root-import `@frontend-team/ui-kit`; add providers; remove standalone Tailwind from consuming app after migration.
- Critical | `apps/web/app/globals.css:4` | 516 literal hex and 25 RGB/RGBA color occurrences violate token-first design. | Map all visual states to ikame Core DS 1.1 tokens.
- Major | `apps/web/app/igoal-app.tsx:236` | One 1,265-LOC component owns UI, 57 state hooks, navigation, policy/events and workflows; `globals.css` is 328 LOC. | Split by feature and extract workflow hooks; keep each UI/style file <=200 LOC.
- Major | `apps/web/app/igoal-app.tsx:1142` | Seven custom drawers lack dialog semantics, focus trap/return and Escape behavior. | Migrate to UI Kit Drawer/Modal.
- Major | `apps/web/app/igoal-app.tsx:1236` | Manager AI tabs have incomplete ARIA tab semantics and no keyboard navigation. | Use UI Kit Tabs.
- Minor | `apps/web/app/igoal-app.tsx:841` | Active navigation has no `aria-current`. | Expose current page state.
- Minor | `apps/web/app/globals.css:325` | Mobile hides notification entry control. | Provide an equivalent accessible mobile entry point.

## Positive Evidence

- No Ant Design, MUI, or shadcn was found.
- Actions/Risks implement loading, empty, error and forbidden states.
- Existing focus-visible and reduced-motion styles exist.
- Role boundaries and evidence-first flows are visibly represented.

## Validation Note

`npm run lint` could not run: local `node_modules` does not contain ESLint. No dependencies were installed or modified during this review.

## Unresolved Questions

- Is private registry access for `@frontend-team/ui-kit` available locally and in CI?
