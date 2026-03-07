# Project Structure

## File Organization
```
/
├── index.html      # Main HTML document with semantic structure
├── script.js       # JavaScript for scroll animations and interactions
├── styles.css      # All styling including animations and responsive design
└── .kiro/          # Kiro AI assistant configuration
    └── steering/   # Project guidance documents
```

## Code Organization Patterns

### HTML Structure
- Semantic HTML5 elements (header, nav, main, section, footer)
- Sections use ID attributes for navigation anchors (#about, #projects, #contact)
- External CSS and JS linked at appropriate locations (CSS in head, JS before closing body)

### CSS Architecture
- Global reset at the top (`* { margin: 0; padding: 0; box-sizing: border-box; }`)
- System font stack for native appearance
- CSS custom properties not used (consider for theming)
- Animations defined as classes (.fade-in, .slide-up) applied via JavaScript
- Media queries at the bottom for responsive adjustments
- Hover states for interactive elements

### JavaScript Patterns
- Event-driven architecture using DOMContentLoaded
- Intersection Observer for performance-efficient scroll detection
- Class-based animation triggers (.animate class added when visible)
- Staggered animations using inline style delays

## Naming Conventions
- **CSS Classes**: kebab-case (e.g., `project-card`, `contact-links`)
- **IDs**: kebab-case (e.g., `#hero`, `#about`)
- **JavaScript**: camelCase for variables (e.g., `observerOptions`, `projectCards`)

## Styling Approach
- Mobile-first responsive design with max-width breakpoint at 768px
- Consistent spacing using rem units
- Color palette: Primary blue (#0066cc), neutral grays, white backgrounds
- Smooth transitions (0.3s standard duration)
