# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BLACKTAR landing page - a modern, animated single-page application built with React 19, TypeScript, Three.js, and Tailwind CSS 4. The site features a distinctive triangle reveal animation on load and an interactive 3D flower logo component.

## Development Commands

**Package Manager:** This project uses `pnpm` (not npm or yarn)

```bash
# Install dependencies
pnpm install

# Development server (http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Linting
pnpm lint

# Code formatting
pnpm format
```

## Architecture

### Tech Stack
- **React 19.1.1** with new JSX transform
- **TypeScript 5.9.2** in strict mode
- **Rsbuild** (Rust-based bundler) with minimal configuration
- **Tailwind CSS 4.1.14** via PostCSS plugin
- **Three.js 0.180.0** + React Three Fiber for 3D graphics

### Key Files

- `src/App.tsx` - Main landing page component (hero, work section, philosophy, footer)
- `src/styles.css` - Global design system with Tailwind import, custom animations, and form styling
- `src/components/TriangleReveal.tsx` - Page load animation using SVG masks
- `src/components/logo/ThreeLunarTear.tsx` - 3D interactive flower with physics simulation

### Styling Architecture

This project uses a **hybrid styling approach**:

1. **Tailwind CSS utilities** for component-level styling
   - Responsive breakpoints: `sm:`, `md:`
   - Inline utilities: `className="text-4xl sm:text-5xl md:text-7xl"`
   - Color utilities with hex values: `bg-[#d1cdb7]`, `text-[#454138]/80`

2. **Custom CSS in styles.css** for:
   - Global styling and base elements (h1-h6, blockquote, forms)
   - Grid background pattern via linear-gradient
   - Complex button animations using pseudo-elements (::before, ::after)
   - Keyframe animations
   - Cross-browser form element styling

**Design System Colors:**
- Primary Beige: `#d1cdb7` (body background)
- Accent Tan: `#dcd8c0` (overlays, inputs)
- Dark Brown: `#454138` (text)
- Light Gray: `#bab5a1` (borders)

**Important:** All text uses `letter-spacing: 0.03rem` for consistent typography.

### Animation System

**TriangleReveal Component:**
- Generates a grid of SVG triangles (200px × 100px each)
- Uses overlapping grid pattern (base + offset) to eliminate gaps
- SVG `<mask>` cuts through beige overlay to reveal content
- Staggered animation delays (0-0.7s) with `step-end` timing
- Total animation: 1.2 seconds
- Callback `onComplete` removes component after animation

**ThreeLunarTear Component:**
- Physics-based 3D flower animation using custom `PhysicsNode` class
- Mass-weighted components: flower (0.8), petals (1.2), stamens (0.5)
- Mouse tracking with velocity calculation applies wind forces
- `useFrame` hook updates physics every frame
- Damping value (0.95) creates natural friction
- Multi-directional lighting setup for depth

### Component Patterns

1. **Functional components only** - No class components
2. **Simple local state** - Uses `useState` (no Redux/Zustand)
3. **State lifting** - Parent components manage state, pass callbacks to children
4. **Event cleanup** - Always remove window event listeners in useEffect return

### Physics Simulation (ThreeLunarTear)

The 3D flower uses a custom physics engine:

```typescript
class PhysicsNode {
  position: THREE.Vector3
  velocity: THREE.Vector3
  force: THREE.Vector3
  mass: number

  applyForce(force) // F = ma
  update(damping)   // Apply velocity, damping, reset forces
}
```

- Separate physics nodes for each component (petals, stamens, pistil)
- Wind force calculated from mouse velocity
- Restoration force pulls components back to origin
- Damping creates realistic, smooth movement

### Build System

**Rsbuild** handles all bundling with minimal configuration. The React plugin automatically provides:
- JSX/TSX compilation
- Hot Module Replacement (HMR)
- React Fast Refresh
- Production optimizations (tree-shaking, minification, code splitting)

**PostCSS** processes Tailwind CSS 4 via `@tailwindcss/postcss` plugin.

## Code Style

- **TypeScript strict mode** enabled
- **Double quotes** for strings
- **2-space indentation**
- **Trailing commas** in all cases
- **80 character line width**
- **Semicolons required**

ESLint config from `@nkzw/eslint-config` with React hooks and React refresh rules.

## Important Notes

- The triangle reveal animation relies on precise timing - be careful modifying delays or durations
- Custom CSS button animations use pseudo-elements - changes to button structure may break animations
- Three.js physics simulation updates every frame - performance-sensitive code
- Tailwind v4 uses new PostCSS architecture (different from v3)
- Project uses React 19 features - ensure compatibility when adding dependencies
