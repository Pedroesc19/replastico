# Design System Overview

This design system introduces a unified set of tokens, components, and guidelines to ensure a consistent and accessible experience across the app.

## Design Tokens

Tokens centralize colors, spacing, typography, and motion values. They are defined in [`src/design/tokens.css`](src/design/tokens.css) and [`src/design/tokens.js`](src/design/tokens.js).

### Colors
- `--color-primary` `#28a745`
- `--color-secondary` `#007bff`
- `--color-danger` `#dc3545`
- `--color-surface` `#ffffff`
- `--color-background` `#f2f2f2`
- `--color-text` `#333333`

### Spacing Scale
`0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`

### Typography Scale
`0.875rem`, `1rem`, `1.25rem`, `1.5rem`

### Motion
Durations of `150ms`, `250ms`, `400ms` with easing `cubic-bezier(0.4, 0, 0.2, 1)`.

## Component Library

Reusable components live in [`src/components/ui/`](src/components/ui/):
- **Button** – supports `primary`, `secondary`, and `danger` variants, focus outlines, and hover states.
- **Card** – surface container with shadow and radius.
- **Modal** – accessible dialog with overlay, close button, and fade-in animation.
- **TextInput** – form field with label and focus style.

## Icon Replacement Plan

Use a single icon family such as [Heroicons](https://heroicons.com). Audit existing icons and replace them with the outlined style at 24\u00a0px for consistency. Store icons in a dedicated `src/icons` directory and expose them via a centralized icon component.

## Motion Guidelines

- Page transitions and interactive elements should use the motion tokens for timing and easing.
- Avoid animations longer than `400ms` to keep interactions snappy.
- Reusable helpers `fade`, `slide`, and `scale` live in [`src/design/motion.js`](src/design/motion.js).
- Small interactions like buttons should animate in `≤150ms` (`motion.fade()`).
- Overlays such as modals use `≤250ms` via `motion.fade({ overlay: true })` or `motion.scale({ overlay: true })`.
- Example:

  ```jsx
  import motion from "../design/motion";
  <div style={motion.slide()}>Content</div>
  ```

## Accessibility Checklist

Automated:
- Run `yarn test --watchAll=false` for unit tests.
- Use a tool like `axe-core` or `lighthouse` to check color contrast (`≥4.5:1`) and ARIA attributes.

Manual:
- Ensure all interactive elements have visible focus states.
- Verify keyboard navigation reaches all controls.
- Test with screen readers for form labels and modal announcements.

## Implementation Guide

1. Import the tokens CSS in `index.js` (already set up).
2. Replace ad-hoc styles with variables from `tokens.css`.
3. Use components from `src/components/ui/` instead of duplicating styles.
4. Gradually migrate icons to the chosen icon set.
5. Follow motion and accessibility guidelines when creating new features.

