# Animation & LineWaves Integration Guide

## Overview
Your portfolio website has been upgraded with sophisticated animated components throughout all major sections. This document outlines all the components created and how they've been integrated.

## New Animated Components Created

### 1. **LineWaves** (Enhanced & Optimized)
- **Location**: `components/line-waves.tsx`
- **Features**:
  - WebGL-based fluid wave animations using OGL library
  - 5 color presets: warm, cool, purple, neutral, vibrant
  - Mouse interaction support (optional)
  - Performance optimizations for smooth 60fps animation
  - Fully responsive design
  - Full TypeScript support

**Usage Example**:
```tsx
import { LineWaves } from '@/components/line-waves'

<LineWaves
  preset="warm"
  speed={0.2}
  enableMouseInteraction={true}
  brightness={0.15}
  className="h-full w-full"
/>
```

### 2. **ParticleWaves** (New)
- **Location**: `components/particle-waves.tsx`
- **Features**:
  - Canvas-based particle animation
  - Wave motion patterns
  - Customizable particle count, size, and colors
  - Smooth easing for natural movement

### 3. **GradientOrb** (New)
- **Location**: `components/gradient-orb.tsx`
- **Features**:
  - SVG-based animated gradient spheres
  - Floating animation with configurable speed
  - Blur effect for soft appearance
  - Great as accent elements

### 4. **GlowText** (New)
- **Location**: `components/glow-text.tsx`
- **Features**:
  - Text with animated glow effects
  - Configurable glow color and intensity
  - Pulsing animation
  - Lightweight and performant

### 5. **AnimatedBorder** (New)
- **Location**: `components/animated-border.tsx`
- **Features**:
  - Border with pulsing glow animation
  - Customizable border color and width
  - Great for CTAs and important elements

## Integration Across Your Website

### Homepage (`app/page.tsx`)
- **LineWaves preset**: "warm" 
- **Speed**: 0.2
- **Interaction**: Mouse-enabled
- **Position**: Hero section background
- **Effect**: Creates dynamic, interactive background for main landing area

### Projects Page (`app/projects/page.tsx`)
- **LineWaves preset**: "cool"
- **Speed**: 0.25
- **Interaction**: Disabled (cleaner for browsing)
- **Position**: Full page background
- **Effect**: Provides calming blue backdrop for project showcase

### About Page (`app/about/page.tsx`)
- **LineWaves preset**: "purple"
- **Speed**: 0.2
- **Interaction**: Mouse-enabled
- **Position**: Hero section
- **Effect**: Creates mystical atmosphere for your story

### Skills Page (`app/skills/page.tsx`)
- **LineWaves preset**: "vibrant"
- **Speed**: 0.3
- **Interaction**: Disabled
- **Position**: Full page background
- **Effect**: Energetic backdrop for skill showcase with 3D galaxy

### Contact Page (`app/contact/page.tsx`)
- **LineWaves preset**: "warm"
- **Speed**: 0.25
- **Interaction**: Mouse-enabled
- **Position**: Full page background
- **Effect**: Inviting atmosphere for contact form

### Journey Page (`app/journey/page.tsx`)
- **LineWaves preset**: "cool"
- **Speed**: 0.22
- **Interaction**: Disabled
- **Position**: Hero section
- **Effect**: Professional backdrop for timeline

### Store/Configurator Page (`app/store/page.tsx`)
- **LineWaves preset**: "vibrant"
- **Speed**: 0.28
- **Interaction**: Mouse-enabled
- **Position**: Full page background
- **Effect**: Dynamic, engaging atmosphere for product configuration

## LineWaves Presets Reference

### Warm
- Colors: `#f5eadb`, `#d8c6ae`, `#8d7d6b`
- Best for: Homepage, contact pages, welcoming sections
- Brightness: 0.25

### Cool
- Colors: `#e0f7fa`, `#80deea`, `#4dd0e1`
- Best for: Projects, portfolio, technical pages
- Brightness: 0.3

### Purple
- Colors: `#e1bee7`, `#ce93d8`, `#ba68c8`
- Best for: About, story sections, mystical vibes
- Brightness: 0.28

### Neutral
- Colors: `#9e9e9e`, `#757575`, `#616161`
- Best for: Professional, corporate sections
- Brightness: 0.2

### Vibrant
- Colors: `#ff6b6b`, `#4ecdc4`, `#45b7d1`
- Best for: High-energy sections, CTAs, dynamic pages
- Brightness: 0.32

## Performance Considerations

- **LineWaves** uses WebGL for GPU-accelerated rendering
- Performance is throttled to ~60fps on all devices
- Mouse interaction is disabled on slower sections to maintain performance
- Canvas is properly cleaned up on component unmount
- All components use proper event listener cleanup

## Customization Guide

### Changing Preset Colors
Edit the `PRESETS` object in `components/line-waves.tsx`:
```tsx
const PRESETS = {
  warm: { color1: '#f5eadb', color2: '#d8c6ae', color3: '#8d7d6b', brightness: 0.25 },
  // ... modify as needed
}
```

### Adjusting Speed
Modify the `speed` prop in component usage:
```tsx
<LineWaves preset="warm" speed={0.1} /> // Slower
<LineWaves preset="warm" speed={0.5} /> // Faster
```

### Controlling Brightness
The `brightness` prop controls animation intensity:
```tsx
<LineWaves preset="warm" brightness={0.1} /> // Subtle
<LineWaves preset="warm" brightness={0.3} /> // Prominent
```

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- Requires WebGL support for LineWaves

## Dependencies
- `ogl`: WebGL rendering library (already installed)
- `framer-motion`: Animation library (already in project)
- React 19+

## Future Enhancement Ideas
1. Add more color presets based on user feedback
2. Create theme switcher component
3. Add animation intensity presets (chill, normal, intense)
4. Implement device detection for auto-optimization
5. Add animation pause on scroll feature
6. Create animation combination examples

## Notes
- All components are fully responsive and mobile-optimized
- Mouse interaction is intelligently disabled on touch devices
- All animations respect `prefers-reduced-motion` system setting
- Components are tree-shaken and won't increase bundle size if unused

Visit `/line-waves` to see a demo of all color presets and configurations.
