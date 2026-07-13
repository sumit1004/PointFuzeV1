# Product Requirement Document (PRD)

## Project Vision
To provide the fastest Esports Tournament Result Operating System that automates score calculation and instantly generates professional branded result graphics for organizers.

## Problem Statement
Esports tournament organizers (for Free Fire, BGMI, PUBG, COD Mobile) currently calculate kills, placement points, total points, and rankings manually. Following calculations, they spend 10–30 minutes manually designing result images, often when they have less than five minutes before the next match starts.

## Solution
PointFuze is a web platform that automates the entire workflow. Organizers can quickly enter match data, automatically calculate points, and generate professional result graphics instantly.

## Target Users
### Primary Users
- Free Fire Tournament Organizers
- BGMI Tournament Organizers
- PUBG Tournament Organizers
- COD Mobile Organizers
- Gaming Communities
- Esports Organizations
- Gaming Cafes

### Secondary Users
- Casters
- Score Managers
- Production Teams
- Community Managers

## User Journey
1. Create Tournament
2. Add Teams
3. Enter Match Data
4. Automatically Calculate Points
5. Generate Match Result
6. Generate Overall Standings
7. Download Professional Result Graphics
8. Save Tournament

## Features & Modules

### Dashboard
- Overview of ongoing tournaments and recent activities.

### Authentication
- Secure login and registration using Firebase Authentication.

### Tournament Creation
- Setup tournament details, game selection, and participating teams.

### Three Calculation Methods
- Method 1: Excel Import, Player Kills, Auto Calculation
- Method 2: Team Names, Kills, Placement (Manual entry)
- Method 3: Direct Score Input

### Point Configuration
- Customize point systems for placements and per-kill values according to game rules.

### Match Management
- Track individual matches, enter data, and calculate match-specific results.

### Overall Result
- Aggregated standings across multiple matches in a tournament.

### History
- View past tournaments and generated results.

### Settings
- User preferences, default configurations, and profile settings.

### Template Studio
- Manage and customize professional result graphic templates for automated generation.

### Download Engine
- Instantly generate and download branded result images.

## Future Features
- Advanced analytics for teams.
- Public result sharing links.
- API access for third-party integrations.

## Non-Functional Requirements
- **Speed**: Optimized for rapid data entry and instant image generation.
- **Reliability**: Everything saved securely in Firebase Realtime Database.
- **Image Storage**: All uploaded images must be converted to Base64 and stored in the database to avoid CORS issues.

## Success Metrics
- Reduction in time taken to produce result graphics (from 10-30 mins to under 1 min).
- Daily active users (DAU) and number of tournaments managed per user.

## Out Of Scope
- Player registration portals (B2C).
- In-game integration or direct API pulls from games (purely manual/excel data entry).
