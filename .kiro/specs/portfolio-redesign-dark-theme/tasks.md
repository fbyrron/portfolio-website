# Implementation Plan: Portfolio Redesign with Dark Theme

## Overview

This implementation plan transforms the existing light-themed portfolio into a modern dark-themed experience with expanded sections (Technology Stack, Leadership, Featured Project), enhanced hero section with character illustration, and cohesive dark purple/navy color scheme. The implementation maintains the vanilla JavaScript architecture with no build process, using CSS custom properties for theme management and the existing Intersection Observer pattern for animations.

## Tasks

- [x] 1. Set up theme system and CSS custom properties
  - Create CSS custom properties in `:root` for colors, spacing, typography, and animation values
  - Define dark theme color palette: primary background (#1a0b2e), secondary background (#2d1b4e), text colors, accent purple (#8b5cf6)
  - Set up spacing scale (xs: 0.5rem, sm: 1rem, md: 2rem, lg: 4rem, xl: 6rem)
  - Define typography scale (h1: 3rem, h2: 2.5rem, h3: 2rem, body: 1rem)
  - Apply theme colors to body, sections, and base elements
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 1.1 Write property test for theme consistency
  - **Property 1: Theme Consistency Across Sections**
  - **Validates: Requirements 1.4**

- [x] 2. Create assets directory structure and placeholder files
  - Create `assets/images/` directory for illustrations and mockups
  - Create `assets/icons/` directory for technology icons
  - Add placeholder comment files or README in each directory documenting required assets
  - Document required assets: character-illustration.svg, ecommunity-mockup.png, flutterflow-badge.svg, and 15 tech icons
  - _Requirements: 10.1_

- [x] 3. Redesign hero section with two-column layout
  - [x] 3.1 Update HTML structure for hero section
    - Add character illustration image element on left side
    - Update heading to "Hello! I Am Ernest Byrron Flores"
    - Add tagline with "cover" wrapped in accent span
    - Add subtitle text
    - Add full professional bio paragraph
    - Add FlutterFlow badge with absolute positioning
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  
  - [x] 3.2 Style hero section with CSS Grid layout
    - Implement two-column grid (50/50 split) for desktop
    - Apply dark purple/navy gradient background
    - Style character illustration (max-width: 400px)
    - Style typography hierarchy (h1, tagline, subtitle, bio)
    - Apply accent color to "cover" word in tagline
    - Position FlutterFlow badge in bottom right
    - Add responsive stacking for mobile (<768px)
    - _Requirements: 2.7, 2.8, 1.3_

- [ ]* 3.3 Write property test for responsive hero stacking
  - **Property 3: Responsive Stacking Below Mobile Breakpoint**
  - **Validates: Requirements 2.8**

- [x] 4. Implement technology stack section
  - [x] 4.1 Create HTML structure for tech stack grid
    - Add section with id "tech-stack"
    - Add heading "Technology Stack"
    - Create grid container for 15 technology icons
    - Add img elements for each technology with proper alt text: Dart, Java, Python, C#, PHP, HTML5, JavaScript, CSS3, Flutter, Figma, React, Laravel, Firebase, MySQL, Arduino
    - _Requirements: 3.1, 3.2, 10.4_
  
  - [x] 4.2 Style tech stack grid with CSS Grid
    - Implement CSS Grid with auto-fit columns (5 per row on desktop)
    - Set icon size to 64px × 64px
    - Apply consistent gap spacing (2rem horizontal, 2.5rem vertical)
    - Add hover effects: scale(1.1) + purple glow (box-shadow)
    - Add 0.3s transition for hover states
    - Implement responsive column reduction for tablet (4 per row) and mobile (3 per row)
    - _Requirements: 3.3, 3.4, 3.5, 3.6_

- [ ]* 4.3 Write property test for grid spacing consistency
  - **Property 4: Grid Spacing Consistency**
  - **Validates: Requirements 3.3, 4.4**

- [ ]* 4.4 Write property test for hover state feedback
  - **Property 5: Hover State Visual Feedback**
  - **Validates: Requirements 3.5**

- [x] 5. Checkpoint - Verify theme and new sections
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement leadership section
  - [x] 6.1 Create HTML structure for leadership cards
    - Add section with id "leadership"
    - Add heading "Leadership"
    - Create container for three leadership card placeholders
    - Add three card divs with placeholder content
    - _Requirements: 4.1, 4.2_
  
  - [x] 6.2 Style leadership cards with CSS
    - Implement horizontal layout with flexbox or grid (3 cards per row)
    - Set card dimensions: calc((100% - 4rem) / 3) width, 300px min-height
    - Apply purple gradient backgrounds to cards
    - Add border-radius (12px) and padding (2rem)
    - Add hover effects: translateY(-8px) + shadow increase
    - Add 0.3s transition for hover states
    - Implement responsive stacking for mobile (<768px)
    - _Requirements: 4.3, 4.4, 4.5_

- [ ]* 6.3 Write property test for mobile grid column reduction
  - **Property 6: Mobile Grid Column Reduction**
  - **Validates: Requirements 3.6**

- [x] 7. Implement featured project section
  - [x] 7.1 Create HTML structure for featured project
    - Add section with id "featured-project"
    - Add heading "Featured Project"
    - Create two-column layout container
    - Add left column with project title "Ecommunity.ph" and full description
    - Add right column with mobile mockup image element
    - Set lazy loading attribute on mockup image
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 10.3_
  
  - [x] 7.2 Style featured project with CSS Grid
    - Implement two-column grid (60/40 split) for desktop
    - Style project title (h3) and description text
    - Style mobile mockup: max-width 300px, drop shadow for depth
    - Center mockup in right column
    - Apply slightly lighter background than primary
    - Implement responsive stacking for mobile (<768px)
    - _Requirements: 5.5, 5.6_

- [ ]* 7.3 Write property test for responsive image scaling
  - **Property 10: Responsive Image Scaling**
  - **Validates: Requirements 7.3**

- [x] 8. Enhance navigation bar
  - [x] 8.1 Update navigation HTML structure
    - Update menu items to: Home, Leadership, Projects, Awards, Contacts
    - Add hamburger menu icon for mobile
    - Add mobile menu container
    - Update href attributes to match new section IDs
    - _Requirements: 6.1_
  
  - [x] 8.2 Style navigation bar with dark theme
    - Apply dark background (var(--color-bg-secondary)) with 95% opacity and backdrop blur
    - Ensure fixed positioning at top (z-index: 1000)
    - Style menu items with hover effects (accent color underline, 0.3s transition)
    - Hide hamburger menu on desktop (>768px)
    - Hide desktop menu on mobile (<768px)
    - Style mobile menu layout
    - _Requirements: 6.2, 6.3, 6.5, 6.6_
  
  - [x] 8.3 Implement navigation JavaScript functionality
    - Add smooth scroll behavior to navigation links
    - Implement hamburger menu toggle functionality
    - Add mobile menu state management
    - Add viewport resize handler to reset menu state when switching to desktop
    - Ensure smooth scroll works across browsers (CSS scroll-behavior with JS fallback)
    - _Requirements: 6.4, 6.7, 8.3_

- [ ]* 8.4 Write property test for navigation smooth scroll
  - **Property 7: Navigation Smooth Scroll Behavior**
  - **Validates: Requirements 6.4, 8.3**

- [ ]* 8.5 Write property test for mobile menu toggle
  - **Property 8: Mobile Menu Visibility Toggle**
  - **Validates: Requirements 6.6, 6.7**

- [x] 9. Checkpoint - Test navigation and responsive behavior
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Implement responsive layout system
  - [x] 10.1 Add mobile-first media queries
    - Add breakpoint at 768px for tablet/mobile layouts
    - Ensure all multi-column sections stack vertically on mobile
    - Adjust font sizes for mobile (reduce h1, h2, h3 sizes)
    - Adjust spacing values for mobile (reduce section padding)
    - _Requirements: 7.1, 7.2_
  
  - [x] 10.2 Ensure touch-friendly interactive elements
    - Verify all buttons, links, and icons meet 44x44px minimum touch target
    - Add appropriate padding to interactive elements if needed
    - Test tap targets on tech icons, navigation items, and contact links
    - _Requirements: 7.5_
  
  - [x] 10.3 Prevent horizontal overflow on mobile
    - Add `overflow-x: hidden` to body if needed
    - Ensure all images have `max-width: 100%`
    - Verify no fixed-width elements exceed viewport
    - Test all sections at 320px viewport width
    - _Requirements: 7.2, 7.3_

- [ ]* 10.4 Write property test for no horizontal overflow
  - **Property 9: No Horizontal Overflow on Mobile**
  - **Validates: Requirements 7.2**

- [ ]* 10.5 Write property test for minimum touch target size
  - **Property 11: Minimum Touch Target Size**
  - **Validates: Requirements 7.5**

- [x] 11. Enhance scroll animations with Intersection Observer
  - [x] 11.1 Update JavaScript animation system
    - Extend existing Intersection Observer to include new sections (tech-stack, leadership, featured-project)
    - Add staggered animation delays for tech icons (50ms between each)
    - Add staggered animation delays for leadership cards (100ms between each)
    - Ensure fade-in animations apply to all new sections
    - Add feature detection fallback for browsers without Intersection Observer support
    - _Requirements: 8.1_
  
  - [x] 11.2 Create animation CSS classes
    - Define `.fade-in` animation: opacity 0→1, translateY(30px)→0, duration 0.6s
    - Define `.slide-up` animation: opacity 0→1, translateY(50px)→0, duration 0.6s
    - Define `.scale-in` animation: opacity 0→1, scale(0.9)→1, duration 0.6s
    - Ensure all animations use CSS transitions (not JavaScript-based)
    - Set initial state for animated elements (opacity: 0, transform)
    - _Requirements: 8.4_

- [ ]* 11.3 Write property test for scroll animation trigger
  - **Property 12: Scroll Animation Trigger**
  - **Validates: Requirements 8.1**

- [ ]* 11.4 Write property test for CSS transition usage
  - **Property 13: CSS Transition Usage**
  - **Validates: Requirements 8.4**

- [ ] 12. Implement visual hierarchy and spacing system
  - [ ] 12.1 Apply consistent section spacing
    - Add section padding using CSS custom properties (--section-padding: 80px)
    - Ensure minimum 80px vertical spacing between sections
    - Apply max-width container (1200px) to all sections
    - Center containers with margin: 0 auto
    - _Requirements: 9.1, 9.5_
  
  - [ ] 12.2 Refine typography hierarchy
    - Verify h1 > h2 > h3 > body font size hierarchy
    - Adjust line-height for readability (1.6 for body, 1.2 for headings)
    - Ensure consistent font-weight usage (bold for headings, normal for body)
    - Apply proper text color contrast (white on dark backgrounds)
    - _Requirements: 9.2, 1.5_
  
  - [ ] 12.3 Add whitespace and content alignment
    - Add padding to all content blocks (minimum 1rem)
    - Ensure consistent alignment within sections (center for headings, left for body)
    - Add margin-bottom to headings for separation from content
    - Apply consistent card padding (2rem)
    - _Requirements: 9.3, 9.4_

- [ ]* 12.4 Write property test for section vertical spacing
  - **Property 14: Section Vertical Spacing**
  - **Validates: Requirements 9.1**

- [ ]* 12.5 Write property test for typography hierarchy
  - **Property 15: Typography Hierarchy**
  - **Validates: Requirements 9.2**

- [ ]* 12.6 Write property test for content block whitespace
  - **Property 16: Content Block Whitespace**
  - **Validates: Requirements 9.3**

- [ ] 13. Implement error handling and accessibility
  - [ ] 13.1 Add image error handling
    - Add onerror event handlers to all images
    - Create CSS fallback styling for failed images (.image-error class)
    - Display fallback text or icon when images fail to load
    - _Requirements: 10.5_
  
  - [ ] 13.2 Ensure WCAG AA contrast compliance
    - Verify all text on dark backgrounds meets 4.5:1 contrast ratio (normal text)
    - Verify large text (≥18pt) meets 3:1 contrast ratio
    - Test with browser DevTools or contrast checker tool
    - Adjust colors if needed to meet standards
    - _Requirements: 1.5_
  
  - [ ] 13.3 Add accessibility attributes
    - Verify all images have descriptive alt text
    - Add aria-labels to navigation elements
    - Ensure keyboard navigation works for all interactive elements
    - Add focus indicators for keyboard users
    - Test with screen reader (if available)
    - _Requirements: 10.4_

- [ ]* 13.4 Write property test for WCAG AA contrast compliance
  - **Property 2: WCAG AA Contrast Compliance**
  - **Validates: Requirements 1.5**

- [ ]* 13.5 Write property test for image alt text presence
  - **Property 19: Image Alt Text Presence**
  - **Validates: Requirements 10.4**

- [ ]* 13.6 Write property test for lazy loading below-fold images
  - **Property 18: Lazy Loading for Below-Fold Images**
  - **Validates: Requirements 10.3**

- [ ] 14. Final integration and polish
  - [ ] 14.1 Update existing projects section styling
    - Apply dark theme colors to existing project cards
    - Ensure consistent styling with new sections
    - Update hover effects to match new design
    - _Requirements: 1.4_
  
  - [ ] 14.2 Update contact section styling
    - Apply dark theme colors to contact section
    - Style contact links with accent color
    - Add hover effects consistent with navigation
    - Ensure email and social links are visible and accessible
    - _Requirements: 1.4_
  
  - [ ] 14.3 Optimize asset loading
    - Implement lazy loading for all below-fold images
    - Add loading="lazy" attribute to appropriate images
    - Consider WebP format with PNG/JPG fallbacks for optimized images
    - Verify all asset paths are correct
    - _Requirements: 10.2, 10.3_

- [ ] 15. Final checkpoint - Complete testing
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional property-based tests and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation maintains the existing vanilla JavaScript architecture with no build process
- All new sections follow the established Intersection Observer animation pattern
- CSS custom properties enable easy theme management and future customization
- Responsive design uses mobile-first approach with 768px breakpoint
- Asset files (images and icons) need to be provided or sourced separately
