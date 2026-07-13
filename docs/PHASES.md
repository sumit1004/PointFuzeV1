# Project Phases

## Phase 1: Authentication & Landing
- **Goal**: Establish entry points and user access.
- **Features**: Landing Page, Firebase Authentication (Login, Register).
- **Pages**: `/`, `/login`, `/register`.
- **Components**: AuthForms, Navbar.
- **Deliverables**: Working login/signup flow.
- **Completion Checklist**: [ ] Auth setup, [ ] Landing UI, [ ] Protected routes skeleton.

## Phase 2: Dashboard
- **Goal**: Core navigation and overview.
- **Features**: Sidebar, Statistics, Recent Tournaments overview.
- **Pages**: `/dashboard`.
- **Components**: Sidebar, Topbar, StatCards, TournamentList.
- **Deliverables**: Responsive dashboard layout.
- **Completion Checklist**: [ ] Sidebar UI, [ ] Dashboard metrics UI.

## Phase 3: Tournament Creation
- **Goal**: Allow users to initialize a new tournament.
- **Features**: Game Selection, Point Configuration setup, Basic Info.
- **Pages**: `/tournaments/new`.
- **Components**: Wizard/Form steps, GameSelector, PointConfigurator.
- **Deliverables**: Ability to save a new tournament config to Firebase.
- **Completion Checklist**: [ ] DB schema for tournament, [ ] Creation Form, [ ] Save to DB.

## Phase 4: Calculation Method 1
- **Goal**: Automate score parsing from Excel.
- **Features**: Excel Import, Player Kills mapping, Auto Calculation.
- **Components**: ExcelUploader, DataMapper table.
- **Deliverables**: Accurate point generation from uploaded sheets.
- **Completion Checklist**: [ ] Excel parser, [ ] Point engine logic, [ ] Result table preview.

## Phase 5: Calculation Method 2
- **Goal**: Manual rapid entry for Team Names, Kills, and Placement.
- **Features**: Fast grid input system.
- **Components**: DataGridInput.
- **Deliverables**: Real-time calculation as user types.
- **Completion Checklist**: [ ] Grid UI, [ ] Real-time state update.

## Phase 6: Calculation Method 3
- **Goal**: Direct Score Input for pre-calculated scenarios.
- **Features**: Simple override and manual score adjustments.
- **Components**: DirectScoreForm.
- **Deliverables**: Bypass calculation engine and save raw scores.
- **Completion Checklist**: [ ] Manual entry UI, [ ] DB saving logic.

## Phase 7: History
- **Goal**: View past match data and tournament results.
- **Features**: Archival view, Match details.
- **Pages**: `/history`, `/tournaments/:id`.
- **Components**: HistoryTable, MatchDetailCard.
- **Deliverables**: Full read-only view of past tournaments.
- **Completion Checklist**: [ ] DB querying, [ ] UI list formatting.

## Phase 8: Settings
- **Goal**: User configuration and profile management.
- **Features**: Update profile, change default point systems.
- **Pages**: `/settings`.
- **Components**: SettingsForm.
- **Deliverables**: Persisted user preferences.
- **Completion Checklist**: [ ] Profile update, [ ] Preferences save.

## Phase 9: Template Studio
- **Goal**: Customize result graphics.
- **Features**: Select layouts, upload custom backgrounds (converted to Base64), color themes.
- **Pages**: `/studio`.
- **Components**: TemplatePreview, DesignControls.
- **Deliverables**: Live preview of the result image.
- **Completion Checklist**: [ ] HTML/CSS templates, [ ] Base64 image handler, [ ] Live data injection.

## Phase 10: Download Engine
- **Goal**: Export HTML/CSS template to an image file.
- **Features**: High-quality render, instant download.
- **Components**: ExportButton.
- **Deliverables**: 1-click download of the result graphic.
- **Completion Checklist**: [ ] DOM to Image utility, [ ] File trigger logic.

## Phase 11: Testing & Optimization
- **Goal**: Production readiness.
- **Features**: Bug fixes, performance optimization, Base64 payload optimization.
- **Deliverables**: Stable, fast application ready for users.
- **Completion Checklist**: [ ] Load testing, [ ] Cross-browser check, [ ] Code cleanup.
