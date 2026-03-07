# Design Document: Portfolio Redesign with Dark Theme

## Overview

This design document specifies the technical implementation for transforming the existing light-themed portfolio website into a modern dark-themed experience. The redesign introduces new sections (Technology Stack, Leadership, Featured Project), expands the hero section with character illustration and full biography, and implements a cohesive dark purple/navy color scheme throughout.

The implementation maintains the existing vanilla JavaScript architecture with no build process, leveraging CSS Grid for new layouts, CSS custom properties for theme management, and the existing Intersection Observer pattern for scroll animations. The design prioritizes accessibility (WCAG AA contrast compliance), responsive behavior across all device sizes, and smooth 60fps animations.

### Key Design Goals

1. **Theme Consistency**: Establish a dark theme system using CSS custom properties for maintainable color management
2. **Visual Hierarchy**: Create clear content organization through typography scale, spacing system, and layout structure
3. **Responsive Design**: Ensure seamless experience from mobile (320px) to desktop (1920px+) viewports
4. **Performance**: Maintain fast load times through optimized assets and efficient CSS/JS
5. **Accessibility**: Meet WCAG AA standards for contrast, keyboard navigation, and screen reader support

## Architecture

### System Structure

The portfolio remains a static single-page application (SPA) with three core files:

```
/
├── index.html          # Semantic HTML5 structure
├── styles.css          # All styling including theme, layout, animations
├── script.js           # Intersection Observer, navigation, interactions
└── assets/             # New directory for images and icons
    ├── images/
    │   ├── character-illustration.svg
    │   ├── ecommunity-mockup.png
    │   └── flutterflow-badge.svg
    └── icons/
        ├── dart.svg
        ├── java.svg
        ├── python.svg
        └── ... (15 tech icons total)
```

### Component Architecture

The design follows a component-based mental model implemented through CSS classes:

1. **Layout Components**: Container, section wrapper, grid systems
2. **Content Components**: Cards, badges, navigation items
3. **Interactive Components**: Buttons, links, hover states
4. **Animation Components**: Fade-in, slide-up, scale effects

### Technology Decisions

**CSS Custom Properties for Theming**
- Rationale: Centralized color management, easier maintenance, potential for future theme switching
- Implementation: Define all colors as CSS variables in `:root`

**CSS Grid for New Sections**
- Rationale: Superior two-dimensional layout control for tech stack grid and leadership cards
- Fallback: Not needed (CSS Grid has 96%+ browser support)

**SVG for Icons and Illustrations**
- Rationale: Scalable, small file size, can be styled with CSS
- Alternative considered: PNG icons (rejected due to scaling issues on high-DPI displays)

**Intersection Observer API**
- Rationale: Already implemented, performant scroll detection
- Enhancement: Add staggered animation delays for grid items

## Components and Interfaces

### Theme System

**CSS Custom Properties**
```css
:root {
  /* Colors */
  --color-bg-primary: #1a0b2e;
  --color-bg-secondary: #2d1b4e;
  --color-text-primary: #ffffff;
  --color-text-secondary: #b8a9d4;
  --color-accent: #8b5cf6;
  --color-accent-hover: #a78bfa;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
  
  /* Typography */
  --font-size-h1: 3rem;
  --font-size-h2: 2.5rem;
  --font-size-h3: 2rem;
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
  
  /* Layout */
  --max-width: 1200px;
  --section-padding: 80px;
  
  /* Animation */
  --transition-speed: 0.3s;
  --animation-duration: 0.6s;
}
```

### Navigation Component

**Structure**
- Fixed position header with dark background
- Horizontal menu items: Home, Leadership, Projects, Awards, Contacts
- Hamburger menu for mobile (<768px)
- Smooth scroll behavior on link clicks

**Interface**
```javascript
// Navigation state management
const navigation = {
  isOpen: false,
  toggle: () => { /* toggle mobile menu */ },
  scrollTo: (sectionId) => { /* smooth scroll to section */ }
};
```

**Styling Requirements**
- Background: `var(--color-bg-secondary)` with 95% opacity and backdrop blur
- Height: 70px
- Z-index: 1000
- Hover state: Accent color underline with 0.3s transition

### Hero Section Component

**Layout Structure**
- Two-column grid on desktop (50/50 split)
- Left column: Character illustration (SVG)
- Right column: Text content (heading, tagline, subtitle, bio)
- Bottom right: FlutterFlow badge (absolute positioned)
- Background: Gradient from `#1a0b2e` to `#2d1b4e`

**Content Hierarchy**
1. Heading (h1): "Hello! I Am Ernest Byrron Flores"
2. Tagline (p.tagline): "A Developer who Judges a book by its cover..." (with "cover" in accent color)
3. Subtitle (p.subtitle): "Because if the cover does not impress you, what else can?"
4. Bio (p.bio): Full professional description (6 lines)

**Responsive Behavior**
- Desktop (>768px): Side-by-side layout
- Mobile (≤768px): Stacked layout, illustration above text, reduced font sizes

### Technology Stack Component

**Layout**
- CSS Grid with auto-fit columns
- Desktop: 5 icons per row (15 total = 3 rows)
- Tablet: 4 icons per row
- Mobile: 3 icons per row
- Gap: 2rem horizontal, 2.5rem vertical

**Icon Specifications**
- Size: 64px × 64px
- Format: SVG
- Hover effect: Scale(1.1) + glow (box-shadow with accent color)
- Transition: 0.3s ease

**Icon List**
Dart, Java, Python, C#, PHP, HTML5, JavaScript, CSS3, Flutter, Figma, React, Laravel, Firebase, MySQL, Arduino

### Leadership Section Component

**Layout**
- Three cards in horizontal row (desktop)
- Stacked vertically (mobile)
- Card structure: Placeholder for future content

**Card Specifications**
- Width: calc((100% - 4rem) / 3) on desktop
- Height: 300px minimum
- Background: Linear gradient (purple tones)
- Border-radius: 12px
- Padding: 2rem
- Hover effect: Lift (translateY(-8px)) + shadow increase

### Featured Project Component

**Layout**
- Two-column grid on desktop (60/40 split)
- Left column: Text content (heading, title, description)
- Right column: Mobile mockup image
- Background: Slightly lighter than primary background

**Content Structure**
- Section heading (h2): "Featured Project"
- Project title (h3): "Ecommunity.ph"
- Description (p): Full project description
- Mockup: PNG image of mobile phone with app interface

**Mockup Specifications**
- Max-width: 300px
- Drop shadow for depth
- Centered in column

### Animation System

**Scroll Animations**
- Reuse existing Intersection Observer pattern
- Apply to: All sections, tech icons, leadership cards, project mockup
- Animation types:
  - Fade-in: Opacity 0→1, translateY(30px)→0
  - Slide-up: Opacity 0→1, translateY(50px)→0
  - Scale-in: Opacity 0→1, scale(0.9)→1

**Staggered Animations**
- Tech icons: 50ms delay between each
- Leadership cards: 100ms delay between each
- Implementation: Inline style with calculated delay

**Hover Animations**
- All interactive elements: 0.3s transition
- Tech icons: Scale + glow
- Leadership cards: Lift + shadow
- Navigation links: Color change + underline
- Contact links: Background color change

## Data Models

### Asset Structure

**Image Assets**
```javascript
const assets = {
  images: {
    characterIllustration: {
      path: 'assets/images/character-illustration.svg',
      alt: 'Illustration of Ernest with laptop',
      width: 400,
      height: 400
    },
    ecommunityMockup: {
      path: 'assets/images/ecommunity-mockup.png',
      alt: 'Ecommunity.ph mobile app interface',
      width: 300,
      height: 600,
      loading: 'lazy'
    },
    flutterflowBadge: {
      path: 'assets/images/flutterflow-badge.svg',
      alt: 'Built in FlutterFlow',
      width: 120,
      height: 40
    }
  },
  icons: [
    { name: 'Dart', path: 'assets/icons/dart.svg', alt: 'Dart logo' },
    { name: 'Java', path: 'assets/icons/java.svg', alt: 'Java logo' },
    { name: 'Python', path: 'assets/icons/python.svg', alt: 'Python logo' },
    { name: 'C#', path: 'assets/icons/csharp.svg', alt: 'C# logo' },
    { name: 'PHP', path: 'assets/icons/php.svg', alt: 'PHP logo' },
    { name: 'HTML5', path: 'assets/icons/html5.svg', alt: 'HTML5 logo' },
    { name: 'JavaScript', path: 'assets/icons/javascript.svg', alt: 'JavaScript logo' },
    { name: 'CSS3', path: 'assets/icons/css3.svg', alt: 'CSS3 logo' },
    { name: 'Flutter', path: 'assets/icons/flutter.svg', alt: 'Flutter logo' },
    { name: 'Figma', path: 'assets/icons/figma.svg', alt: 'Figma logo' },
    { name: 'React', path: 'assets/icons/react.svg', alt: 'React logo' },
    { name: 'Laravel', path: 'assets/icons/laravel.svg', alt: 'Laravel logo' },
    { name: 'Firebase', path: 'assets/icons/firebase.svg', alt: 'Firebase logo' },
    { name: 'MySQL', path: 'assets/icons/mysql.svg', alt: 'MySQL logo' },
    { name: 'Arduino', path: 'assets/icons/arduino.svg', alt: 'Arduino logo' }
  ]
};
```

### Navigation Structure

```javascript
const navigationItems = [
  { label: 'Home', href: '#hero', id: 'nav-home' },
  { label: 'Leadership', href: '#leadership', id: 'nav-leadership' },
  { label: 'Projects', href: '#projects', id: 'nav-projects' },
  { label: 'Awards', href: '#awards', id: 'nav-awards' },
  { label: 'Contacts', href: '#contact', id: 'nav-contact' }
];
```

### Content Data

```javascript
const content = {
  hero: {
    heading: 'Hello! I Am Ernest Byrron Flores',
    tagline: 'A Developer who Judges a book by its cover...',
    taglineAccent: 'cover',
    subtitle: 'Because if the cover does not impress you, what else can?',
    bio: "Hi there! I'm a self-taught full-stack mobile and web developer, and a Magna Cum Laude graduate of BS Information Technology from National University-Baliwag. I love creating digital products that not only look great but also solve real problems. My goal is to design experiences that feel seamless and meaningful while balancing both user needs and business goals. I am always excited to learn new things and build projects that make a positive impact!"
  },
  featuredProject: {
    heading: 'Featured Project',
    title: 'Ecommunity.ph',
    description: 'A mobile-based solid waste management system for Baliwag, aimed at empowering residents, local government, and businesses to engage in sustainable practices. Implemented modules for garbage collection schedules, junkshop transactions, and waste segregation, alongside an educational blogspot that enhanced awareness of solid waste management.'
  }
};
```

### Responsive Breakpoints

```javascript
const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1440
};
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas where properties can be consolidated:

**Redundancy Elimination:**
- Multiple criteria check for "dark background consistency" across different sections (1.4, 3.4, 6.3) - these can be combined into a single property about theme consistency
- Several criteria check responsive stacking behavior at <768px breakpoint (2.8, 4.5, 5.6, 6.6, 7.1) - these can be consolidated into properties about responsive layout behavior
- Hover feedback criteria (3.5, 6.5, 8.2) can be combined into a property about interactive element transitions
- Spacing consistency criteria (3.3, 4.4, 7.4, 9.1, 9.3) can be consolidated into properties about the spacing system

**Properties vs Examples:**
- Specific content checks (exact text, specific colors, element presence) are examples, not properties
- Behavioral rules that apply across multiple elements (contrast ratios, responsive behavior, animation timing) are properties
- I will focus properties on universal behaviors and use unit tests for specific examples

### Property 1: Theme Consistency Across Sections

*For any* section element in the portfolio, the computed background color should use the dark theme color palette (primary or secondary background colors from the theme system).

**Validates: Requirements 1.4, 3.4, 6.3**

### Property 2: WCAG AA Contrast Compliance

*For any* text element displayed on a dark background, the contrast ratio between the text color and background color should meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text ≥18pt).

**Validates: Requirements 1.5**

### Property 3: Responsive Stacking Below Mobile Breakpoint

*For any* multi-column layout section (hero, tech stack, leadership, featured project), when the viewport width is less than 768px, the layout should change to a single-column vertical stack.

**Validates: Requirements 2.8, 4.5, 5.6, 7.1**

### Property 4: Grid Spacing Consistency

*For any* grid layout (tech stack icons, leadership cards), the spacing between adjacent grid items should be consistent both horizontally and vertically according to the design system spacing values.

**Validates: Requirements 3.3, 4.4**

### Property 5: Hover State Visual Feedback

*For any* interactive element (navigation links, tech icons, leadership cards, contact links), when hover state is triggered, the element should apply a visual change (color, transform, or shadow) with a transition duration of 300ms or less.

**Validates: Requirements 3.5, 6.5, 8.2**

### Property 6: Mobile Grid Column Reduction

*For any* grid layout, when the viewport width is less than 768px, the number of columns should be fewer than the desktop layout to accommodate smaller screens.

**Validates: Requirements 3.6**

### Property 7: Navigation Smooth Scroll Behavior

*For any* navigation link, when clicked, the page should scroll smoothly to the corresponding section anchor without jumping.

**Validates: Requirements 6.4, 8.3**

### Property 8: Mobile Menu Visibility Toggle

*For any* viewport width less than 768px, the hamburger menu icon should be visible and the desktop navigation menu should be hidden; when the hamburger icon is clicked, the mobile menu should toggle between open and closed states.

**Validates: Requirements 6.6, 6.7**

### Property 9: No Horizontal Overflow on Mobile

*For any* viewport width less than 768px, no element should cause horizontal scrolling—all content should fit within the viewport width.

**Validates: Requirements 7.2**

### Property 10: Responsive Image Scaling

*For any* image or illustration element, when the viewport width is less than 768px, the image should scale down proportionally and not exceed its container width.

**Validates: Requirements 7.3**

### Property 11: Minimum Touch Target Size

*For any* interactive element (buttons, links, icons), the computed width and height should each be at least 44px to ensure adequate touch target size on mobile devices.

**Validates: Requirements 7.5**

### Property 12: Scroll Animation Trigger

*For any* section with scroll animation, when the section enters the viewport (intersects with viewport), the animation class should be applied and the element should transition from its initial state (opacity 0, transformed) to its final state (opacity 1, no transform).

**Validates: Requirements 8.1**

### Property 13: CSS Transition Usage

*For any* element with state changes (hover, focus, active), the visual changes should be implemented using CSS transition properties rather than JavaScript-based animations.

**Validates: Requirements 8.4**

### Property 14: Section Vertical Spacing

*For any* pair of adjacent sections, the vertical spacing (margin or padding) between them should be at least 80px to maintain visual hierarchy.

**Validates: Requirements 9.1**

### Property 15: Typography Hierarchy

*For any* page, the font sizes should follow a clear hierarchy where h1 > h2 > h3 > body text, with each level having a distinct and measurably different size.

**Validates: Requirements 9.2**

### Property 16: Content Block Whitespace

*For any* content block (cards, sections, text containers), the padding around the content should be at least 1rem (16px) to provide adequate breathing room.

**Validates: Requirements 9.3**

### Property 17: Section Content Alignment

*For any* section, all direct child content elements should share consistent alignment (all left, all center, or all right) unless explicitly designed for mixed alignment.

**Validates: Requirements 9.4**

### Property 18: Lazy Loading for Below-Fold Images

*For any* image element that is positioned below the initial viewport (below the fold), the image should have the loading="lazy" attribute to defer loading until needed.

**Validates: Requirements 10.3**

### Property 19: Image Alt Text Presence

*For any* img element in the document, the element should have a non-empty alt attribute to provide accessibility for screen readers.

**Validates: Requirements 10.4**

### Property 20: Image Load Error Handling

*For any* image element, when the image fails to load (404 or network error), the element should display fallback content or styling to indicate the missing image gracefully.

**Validates: Requirements 10.5**

## Error Handling

### Image Loading Failures

**Strategy**: Implement onerror handlers and CSS fallbacks

**Implementation**:
```javascript
// Add error handlers to all images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.classList.add('image-error');
    this.alt = `Failed to load: ${this.alt}`;
  });
});
```

```css
.image-error {
  background: var(--color-bg-secondary);
  border: 2px dashed var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.image-error::before {
  content: '🖼️ Image unavailable';
  color: var(--color-text-secondary);
}
```

### Missing Icon Assets

**Strategy**: Provide fallback text labels when SVG icons fail to load

**Implementation**:
```html
<div class="tech-icon">
  <img src="assets/icons/dart.svg" alt="Dart" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
  <span class="icon-fallback" style="display:none;">Dart</span>
</div>
```

### Intersection Observer Not Supported

**Strategy**: Feature detection with graceful degradation

**Implementation**:
```javascript
if ('IntersectionObserver' in window) {
  // Use Intersection Observer for animations
  const observer = new IntersectionObserver(callback, options);
  elements.forEach(el => observer.observe(el));
} else {
  // Fallback: Show all elements immediately without animation
  elements.forEach(el => el.classList.add('animate'));
}
```

### Mobile Menu State Management

**Strategy**: Ensure menu state is properly managed and reset on viewport resize

**Implementation**:
```javascript
let mobileMenuOpen = false;

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  document.querySelector('.mobile-menu').classList.toggle('open', mobileMenuOpen);
  document.body.classList.toggle('menu-open', mobileMenuOpen);
}

// Reset menu state on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && mobileMenuOpen) {
    toggleMobileMenu();
  }
});
```

### Smooth Scroll Fallback

**Strategy**: Use CSS scroll-behavior with JavaScript fallback for older browsers

**Implementation**:
```css
html {
  scroll-behavior: smooth;
}
```

```javascript
// Fallback for browsers without smooth scroll support
function smoothScrollTo(target) {
  if ('scrollBehavior' in document.documentElement.style) {
    target.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Polyfill or alternative smooth scroll implementation
    const targetPosition = target.offsetTop;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}
```

### CSS Custom Properties Not Supported

**Strategy**: Provide fallback values for older browsers

**Implementation**:
```css
body {
  background-color: #1a0b2e; /* Fallback */
  background-color: var(--color-bg-primary); /* Modern browsers */
  color: #ffffff; /* Fallback */
  color: var(--color-text-primary); /* Modern browsers */
}
```

## Testing Strategy

### Overview

The testing strategy employs a dual approach combining unit tests for specific examples and edge cases with property-based tests for universal behaviors. This ensures both concrete correctness (specific content, layout, styling) and general correctness (responsive behavior, accessibility, interactions).

### Unit Testing

**Framework**: Jest with jsdom for DOM testing

**Focus Areas**:
1. **Content Verification**: Specific text content, headings, labels
2. **Element Presence**: Required sections, navigation items, icons
3. **Specific Styling**: Exact colors, specific CSS values, layout properties
4. **Edge Cases**: Empty states, missing assets, error conditions

**Example Unit Tests**:
```javascript
describe('Hero Section', () => {
  test('displays correct heading text', () => {
    const heading = document.querySelector('#hero h1');
    expect(heading.textContent).toBe('Hello! I Am Ernest Byrron Flores');
  });

  test('displays character illustration', () => {
    const illustration = document.querySelector('#hero .character-illustration');
    expect(illustration).toBeInTheDocument();
    expect(illustration.src).toContain('character-illustration.svg');
  });

  test('applies accent color to "cover" in tagline', () => {
    const accentWord = document.querySelector('.tagline .accent');
    const computedStyle = window.getComputedStyle(accentWord);
    expect(computedStyle.color).toBe('rgb(139, 92, 246)'); // #8b5cf6
  });
});

describe('Navigation', () => {
  test('displays all required menu items', () => {
    const menuItems = document.querySelectorAll('nav a');
    const labels = Array.from(menuItems).map(item => item.textContent);
    expect(labels).toEqual(['Home', 'Leadership', 'Projects', 'Awards', 'Contacts']);
  });

  test('navigation bar is fixed at top', () => {
    const nav = document.querySelector('header');
    const computedStyle = window.getComputedStyle(nav);
    expect(computedStyle.position).toBe('fixed');
    expect(computedStyle.top).toBe('0px');
  });
});

describe('Tech Stack Section', () => {
  test('displays exactly 15 technology icons', () => {
    const icons = document.querySelectorAll('#tech-stack .tech-icon');
    expect(icons.length).toBe(15);
  });

  test('includes all required technologies', () => {
    const expectedTechs = ['Dart', 'Java', 'Python', 'C#', 'PHP', 'HTML5', 
                          'JavaScript', 'CSS3', 'Flutter', 'Figma', 'React', 
                          'Laravel', 'Firebase', 'MySQL', 'Arduino'];
    const icons = document.querySelectorAll('#tech-stack .tech-icon img');
    const altTexts = Array.from(icons).map(img => img.alt.replace(' logo', ''));
    expect(altTexts.sort()).toEqual(expectedTechs.sort());
  });
});

describe('Leadership Section', () => {
  test('displays exactly 3 leadership cards', () => {
    const cards = document.querySelectorAll('#leadership .leadership-card');
    expect(cards.length).toBe(3);
  });
});

describe('Featured Project', () => {
  test('displays Ecommunity.ph project title', () => {
    const title = document.querySelector('#featured-project h3');
    expect(title.textContent).toBe('Ecommunity.ph');
  });

  test('displays mobile mockup image', () => {
    const mockup = document.querySelector('#featured-project .project-mockup');
    expect(mockup).toBeInTheDocument();
    expect(mockup.src).toContain('ecommunity-mockup');
  });
});

describe('Asset Management', () => {
  test('uses WebP format for optimized images', () => {
    const picture = document.querySelector('picture');
    const webpSource = picture.querySelector('source[type="image/webp"]');
    expect(webpSource).toBeInTheDocument();
  });

  test('max content width is 1200px', () => {
    const container = document.querySelector('.container');
    const computedStyle = window.getComputedStyle(container);
    expect(computedStyle.maxWidth).toBe('1200px');
  });
});
```

### Property-Based Testing

**Framework**: fast-check (JavaScript property-based testing library)

**Configuration**: Minimum 100 iterations per property test

**Focus Areas**:
1. **Responsive Behavior**: Layout changes across viewport sizes
2. **Accessibility**: Contrast ratios, touch targets, alt text
3. **Consistency**: Spacing, alignment, theming
4. **Interactions**: Hover states, animations, scroll behavior

**Example Property Tests**:

```javascript
const fc = require('fast-check');

describe('Property Tests', () => {
  
  // Feature: portfolio-redesign-dark-theme, Property 1: Theme Consistency Across Sections
  test('all sections use dark theme colors', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...document.querySelectorAll('section')),
        (section) => {
          const bgColor = window.getComputedStyle(section).backgroundColor;
          const darkColors = ['rgb(26, 11, 46)', 'rgb(45, 27, 78)']; // primary and secondary
          return darkColors.some(color => bgColor === color);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 2: WCAG AA Contrast Compliance
  test('text on dark backgrounds meets WCAG AA contrast', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...document.querySelectorAll('section *')),
        (element) => {
          if (element.textContent.trim() === '') return true;
          
          const textColor = window.getComputedStyle(element).color;
          const bgColor = window.getComputedStyle(element).backgroundColor;
          const fontSize = parseFloat(window.getComputedStyle(element).fontSize);
          
          const contrastRatio = calculateContrastRatio(textColor, bgColor);
          const isLargeText = fontSize >= 18;
          const minRatio = isLargeText ? 3 : 4.5;
          
          return contrastRatio >= minRatio;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 3: Responsive Stacking Below Mobile Breakpoint
  test('multi-column layouts stack vertically on mobile', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }), // Mobile viewport widths
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          
          const multiColumnSections = [
            '#hero .hero-content',
            '#tech-stack .tech-grid',
            '#leadership .leadership-cards',
            '#featured-project .project-content'
          ];
          
          return multiColumnSections.every(selector => {
            const element = document.querySelector(selector);
            const style = window.getComputedStyle(element);
            
            // Check if layout is single column (flex-direction: column or grid with 1 column)
            return style.flexDirection === 'column' || 
                   style.gridTemplateColumns.split(' ').length === 1;
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 4: Grid Spacing Consistency
  test('grid items have consistent spacing', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('#tech-stack .tech-grid', '#leadership .leadership-cards'),
        (gridSelector) => {
          const grid = document.querySelector(gridSelector);
          const items = Array.from(grid.children);
          
          if (items.length < 2) return true;
          
          const gaps = [];
          for (let i = 0; i < items.length - 1; i++) {
            const gap = items[i + 1].offsetLeft - (items[i].offsetLeft + items[i].offsetWidth);
            if (gap > 0) gaps.push(gap);
          }
          
          // All gaps should be equal (within 1px tolerance for rounding)
          return gaps.every(gap => Math.abs(gap - gaps[0]) <= 1);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 5: Hover State Visual Feedback
  test('interactive elements provide hover feedback within 300ms', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...document.querySelectorAll('nav a, .tech-icon, .leadership-card, .contact-links a')
        ),
        (element) => {
          const style = window.getComputedStyle(element);
          const transitionDuration = parseFloat(style.transitionDuration) * 1000; // Convert to ms
          
          // Should have transition and it should be 300ms or less
          return transitionDuration > 0 && transitionDuration <= 300;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 6: Mobile Grid Column Reduction
  test('grids have fewer columns on mobile than desktop', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('#tech-stack .tech-grid'),
        (gridSelector) => {
          const grid = document.querySelector(gridSelector);
          
          // Get desktop column count
          setViewportWidth(1024);
          const desktopColumns = window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
          
          // Get mobile column count
          setViewportWidth(375);
          const mobileColumns = window.getComputedStyle(grid).gridTemplateColumns.split(' ').length;
          
          return mobileColumns < desktopColumns;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 9: No Horizontal Overflow on Mobile
  test('no horizontal overflow on mobile viewports', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }),
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          
          const body = document.body;
          const html = document.documentElement;
          
          const bodyScrollWidth = body.scrollWidth;
          const htmlScrollWidth = html.scrollWidth;
          const clientWidth = html.clientWidth;
          
          return bodyScrollWidth <= clientWidth && htmlScrollWidth <= clientWidth;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 10: Responsive Image Scaling
  test('images scale down on mobile and do not exceed container', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }),
        fc.constantFrom(...document.querySelectorAll('img')),
        (viewportWidth, img) => {
          setViewportWidth(viewportWidth);
          
          const imgWidth = img.offsetWidth;
          const containerWidth = img.parentElement.offsetWidth;
          
          return imgWidth <= containerWidth;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 11: Minimum Touch Target Size
  test('interactive elements meet minimum 44x44px touch target', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...document.querySelectorAll('a, button, .tech-icon, .leadership-card')
        ),
        (element) => {
          const rect = element.getBoundingClientRect();
          return rect.width >= 44 && rect.height >= 44;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 14: Section Vertical Spacing
  test('adjacent sections have at least 80px vertical spacing', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...document.querySelectorAll('section')),
        (section) => {
          const nextSection = section.nextElementSibling;
          if (!nextSection || nextSection.tagName !== 'SECTION') return true;
          
          const sectionBottom = section.offsetTop + section.offsetHeight;
          const nextSectionTop = nextSection.offsetTop;
          const gap = nextSectionTop - sectionBottom;
          
          return gap >= 80;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 15: Typography Hierarchy
  test('font sizes follow hierarchy h1 > h2 > h3 > body', () => {
    fc.assert(
      fc.property(
        fc.constant(true),
        () => {
          const h1Size = parseFloat(window.getComputedStyle(document.querySelector('h1')).fontSize);
          const h2Size = parseFloat(window.getComputedStyle(document.querySelector('h2')).fontSize);
          const h3Size = parseFloat(window.getComputedStyle(document.querySelector('h3')).fontSize);
          const bodySize = parseFloat(window.getComputedStyle(document.body).fontSize);
          
          return h1Size > h2Size && h2Size > h3Size && h3Size > bodySize;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 18: Lazy Loading for Below-Fold Images
  test('images below the fold have lazy loading', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...document.querySelectorAll('img')),
        (img) => {
          const rect = img.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // If image is below the fold
          if (rect.top > viewportHeight) {
            return img.loading === 'lazy';
          }
          return true; // Above fold images don't need lazy loading
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-redesign-dark-theme, Property 19: Image Alt Text Presence
  test('all images have non-empty alt text', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...document.querySelectorAll('img')),
        (img) => {
          return img.hasAttribute('alt') && img.alt.trim().length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

});

// Helper functions
function calculateContrastRatio(color1, color2) {
  // Implementation of WCAG contrast ratio calculation
  // Returns ratio between 1 and 21
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(color) {
  // Convert RGB to relative luminance
  // Implementation details omitted for brevity
}

function setViewportWidth(width) {
  // Helper to simulate viewport resize in tests
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width
  });
  window.dispatchEvent(new Event('resize'));
}
```

### Integration Testing

**Focus**: Test interactions between components

**Key Scenarios**:
1. Navigation click → smooth scroll → section in view
2. Viewport resize → layout changes → menu state updates
3. Scroll → intersection observer → animations trigger
4. Image load error → error handler → fallback display

### Visual Regression Testing

**Tool**: Percy or Chromatic (optional, for visual diffs)

**Approach**: Capture screenshots at key breakpoints (320px, 768px, 1024px, 1440px) and compare against baseline

### Accessibility Testing

**Tools**:
- axe-core for automated accessibility checks
- Manual keyboard navigation testing
- Screen reader testing (NVDA/JAWS)

**Checklist**:
- All interactive elements keyboard accessible
- Focus indicators visible
- Alt text present and descriptive
- Color contrast meets WCAG AA
- Semantic HTML structure
- ARIA labels where appropriate

### Performance Testing

**Metrics**:
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.5s

**Tools**: Lighthouse, WebPageTest

### Test Execution

**Unit Tests**: Run on every commit
```bash
npm test
```

**Property Tests**: Run on every commit (100 iterations each)
```bash
npm test -- --testPathPattern=property
```

**Integration Tests**: Run before deployment
```bash
npm test -- --testPathPattern=integration
```

**Manual Testing**: Test on real devices
- iPhone SE (320px width)
- iPhone 12 (390px width)
- iPad (768px width)
- Desktop (1920px width)

### Coverage Goals

- Unit test coverage: >90% of CSS selectors and JS functions
- Property test coverage: All universal behaviors from requirements
- Browser coverage: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Device coverage: Mobile, tablet, desktop viewports

