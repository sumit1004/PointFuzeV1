# Development Rules

## Coding Rules
- Write clean, readable, and well-documented code.
- Optimize for speed and performance.

## Naming Convention
- **Components**: PascalCase (e.g., `TournamentCard.js`)
- **Functions/Variables**: camelCase (e.g., `calculatePoints`, `tournamentData`)
- **CSS Classes**: kebab-case (e.g., `.btn-primary`, `.dashboard-container`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_TEAMS_ALLOWED`)

## Folder Rules
- Group related files together.
- Maintain a flat structure inside `/components` unless components are highly domain-specific.
- Assets should always reside in `/assets`.

## Component Rules
- Functional Components ONLY.
- Prop destructuring is mandatory.
- Keep components small and focused on a single responsibility.
- Reusable components must be generic and configurable.

## CSS Rules
- Normal CSS ONLY.
- NO inline CSS (unless absolutely necessary for dynamic layout calculations).
- Utilize CSS variables for colors, typography, and spacing defined in `DESIGN.md`.
- Ensure responsive design using standard media queries.

## React Rules
- Must use Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`).
- Must use Context API for global state management.
- Minimize re-renders by structuring state efficiently.

## Firebase Rules
- Handle all Firebase interactions within the `/services` folder.
- DO NOT use Firebase Storage. All images MUST be Base64 strings stored in Firebase Realtime Database.
- Always handle potential network delays/errors gracefully.

## Validation Rules
- All forms must have comprehensive client-side validation.
- Sanitize inputs to prevent unexpected data structures.

## Error Handling Rules
- Use try/catch blocks for all async operations.
- Display user-friendly error messages (no technical stack traces in UI).
- Log errors contextually.

## Performance Rules
- Images uploaded by users must be compressed before Base64 encoding to prevent database bloat.
- Lazy load routes/pages where applicable.

## Allowed Libraries
- React.js
- React Router
- Firebase
- Utility libraries for specific complex tasks (e.g., html2canvas for image generation) only if approved.

## Forbidden Libraries
- Tailwind CSS
- Bootstrap
- Material UI (MUI)
- Redux / RTK
- Class Components
- jQuery

## AI Boundaries
Never allow AI to do the following without explicit user approval:
- Rename folders
- Change architecture
- Modify database schema
- Introduce new libraries

## Must Use
- Functional Components
- Hooks
- Context API
- Reusable Components
- Normal CSS

## Must Avoid
- Tailwind
- Bootstrap
- Material UI
- Redux
- Class Components
- jQuery
- Inline CSS
- Hardcoded Values (use configuration files or constants)
