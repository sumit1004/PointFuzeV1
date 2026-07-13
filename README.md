# PointFuze

The Fastest Esports Tournament Result Operating System.

## Project Overview
PointFuze is a web platform built specifically for esports tournament organizers. It automates tournament score calculation and instantly generates professional branded result graphics directly within the browser.

## Tech Stack
- React.js (Vite)
- Normal CSS (No Tailwind/Bootstrap)
- React Router
- Firebase Authentication
- Firebase Realtime Database
- Context API

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Rename `.env.example` to `.env` and fill in your Firebase credentials.
4. Run `npm run dev` to start the development server.

## Folder Structure
```text
src/
├── assets/
├── components/
├── constants/
├── contexts/
├── hooks/
├── pages/
├── routes/
├── services/
├── styles/
└── utils/
```

## Development Workflow
- All UI styling is strictly constrained to standard CSS and variables defined in `src/styles/variables.css`.
- Ensure new features adhere strictly to `docs/ARCHITECTURE.md` and `docs/RULES.md`.
- All authentication flows through `src/contexts/AuthContext.jsx`. Use `useAuth()` inside components.
