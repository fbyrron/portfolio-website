# Technology Stack

## Core Technologies
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern styling with animations and responsive design
- **Vanilla JavaScript**: No frameworks, using native browser APIs

## Key Features
- Intersection Observer API for scroll-triggered animations
- CSS Grid for responsive project layout
- CSS transitions and keyframe animations
- Fixed navigation with backdrop blur effect
- Mobile-responsive design with media queries

## Browser APIs Used
- `IntersectionObserver` for scroll animations
- `DOMContentLoaded` event for initialization
- `querySelectorAll` for element selection

## Development
This is a static website with no build process required. Simply open `index.html` in a browser to view.

### Local Development
```bash
# Serve locally (any static server works)
python -m http.server 8000
# or
npx serve
```

### Deployment
Deploy the three files (index.html, script.js, styles.css) to any static hosting service.
