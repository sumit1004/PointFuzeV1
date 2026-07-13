# Design System

## Design Philosophy
PointFuze must feel premium, modern, and extremely fast. It should utilize a dark theme primarily suited for the gaming/esports aesthetic.

## Color Palette
- **Primary**: `#FF7A00`
- **Background**: `#0F1115`
- **Surface**: `#181C24`
- **Border**: `#2D313A`
- **Text**: `#FFFFFF`
- **Secondary Text**: `#B4BAC7`
- **Success**: `#22C55E`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`

## Typography
- **Primary Font**: Poppins (for headers, buttons, and UI elements)
- **Secondary Font**: Rajdhani (for numbers, scores, and technical data)

## Spacing System
Use an 8px base spacing system:
- `8px`, `16px`, `24px`, `32px`, `48px`, `64px`

## UI Elements

### Border Radius
- Subtle rounding for standard elements: `4px` or `8px`
- Surface cards: `12px`

### Shadows
- Deep, subtle shadows to separate Surface from Background. Glow effects using Primary color for active states.

### Buttons
- Solid primary color, sharp text. Hover effects must be dynamic and responsive.

### Cards & Dashboard Elements
- Surface color background, border color for outline. Hover lift effect.

### Inputs & Forms
- Darker background inputs (`#0F1115` inside `#181C24` surfaces), light text, primary color on focus outline.

### Tables
- Clean borders, distinct alternating row colors or hover states. Data must be highly readable (use Rajdhani for digits).

### Icons
- Minimalist, stroke-based icons (e.g., Lucide or Feather).

### Layout
- **Navbar**: Top horizontal bar for global actions/auth.
- **Sidebar**: Fixed left for main navigation (Dashboard, Tournaments, Templates, Settings).
- **Modal**: Dark overlay with Surface colored popups.

## Theme
- **Dark Theme**: Strictly dark mode optimized for gaming.

## Responsive Rules
- Mobile-first approach where applicable, though primary use case is desktop/tablet for rapid data entry.
- Stack sidebars and shrink tables with horizontal scrolling on smaller screens.

## Accessibility Rules
- Ensure sufficient contrast for Secondary Text against Surface/Background.
- Focus states must be clearly visible (using Primary color).
