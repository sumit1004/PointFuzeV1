# Architecture Document

## Project Architecture
PointFuze follows a modern, client-side rendered Single Page Application (SPA) architecture utilizing React and Firebase.

## Technology Stack
- **Frontend**: React.js
- **Styling**: Normal CSS only (NO Tailwind, Bootstrap, or Material UI)
- **Routing**: React Router
- **State Management**: React Context API
- **Authentication**: Firebase Authentication
- **Database**: Firebase Realtime Database
- **Image Storage**: Base64 strings inside Firebase Realtime Database (DO NOT use Firebase Storage)
- **Package Manager**: npm

## Application Flow
1. **Authentication Flow**: Users log in via Firebase Auth. Context API provides auth state globally.
2. **Tournament Flow**: Users create a tournament, configuration is saved in Firebase Realtime DB.
3. **Calculation Flow**: Inputs are processed by local utility functions based on selected calculation method, updating state and DB synchronously.
4. **Template Flow**: Result data is injected into HTML/CSS templates within the React DOM.
5. **Export Flow**: The Download Engine (e.g., html2canvas or similar approach) converts the DOM element to an image for download.

## Folder Structure (Proposed)
```
/src
  /assets        # Images, fonts, icons
  /components    # Reusable UI components (Buttons, Cards, Inputs)
  /contexts      # React Contexts (AuthContext, TournamentContext)
  /hooks         # Custom React hooks
  /pages         # Route components (Dashboard, Tournament, etc.)
  /services      # Firebase config and API calls
  /styles        # Global and component-specific Normal CSS files
  /utils         # Calculation logic, Base64 converters, helpers
  App.js
  index.js
```

## Component Structure
- Keep components modular.
- Use functional components with hooks exclusively.
- Presentational components should be decoupled from logic where possible.

## Firebase Structure
### Realtime Database Schema
```json
{
  "users": {
    "userId": {
      "profile": {},
      "tournaments": {
        "tournamentId": {
          "details": {},
          "teams": [],
          "matches": {},
          "settings": {}
        }
      }
    }
  }
}
```

## Design Principles
- Optimized for speed and instant UI feedback.
- Stateless utility functions for calculations.
- Clean separation between UI rendering and business logic.

## Scalability Notes
- Storing Base64 images directly in Realtime Database increases bandwidth and storage usage per node. Optimization (compression before Base64 encoding) will be critical.
- Realtime DB structured to avoid deep nesting; tournaments are grouped under user IDs to allow secure, fast querying.
