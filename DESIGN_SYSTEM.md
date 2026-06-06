# HomeBuddy Design System - Modern Platform Aesthetic

## Overview

HomeBuddy now features a vibrant, modern design inspired by leading Indian platforms like **Zepto**, **Zomato**, and **Swiggy**. The design emphasizes speed, convenience, trust, and action-oriented interactions.

## Color Palette

### Primary Colors
- **Primary Red**: `#EF4F5F` - Bold, energetic, action-oriented (primary CTAs, emphasis)
- **Accent Orange**: `#FF6B35` - Dynamic, warm, complementary (secondary CTAs, highlights)

### Supporting Colors
- **Background**: `#FFFFFF` - Clean, minimal foundation
- **Card**: `#FFFFFF` - Pure white for maximum contrast
- **Secondary**: `#FFF5F3` - Light rose, subtle background accent
- **Muted**: `#F0F0F0` - Light gray for secondary elements
- **Foreground**: `#0F0F0F` - Deep black for text (near-black for better readability)
- **Border**: `#E8E8E8` - Subtle dividers
- **Input**: `#F8F8F8` - Light background for form fields

### Dark Mode
- **Background**: `#0A0A0A` - True black
- **Card**: `#1A1A1A` - Deep charcoal
- **Primary**: `#EF4F5F` - Same vibrant red (maintains energy)
- **Foreground**: `#FFFFFF` - Pure white text

## Typography

### Fonts
- **Headings**: Sora (weights: 400, 500, 600, 700)
- **Body**: DM Sans (weights: 400, 500, 700)
- **Monospace**: Geist Mono (for code)

### Font Sizing & Hierarchy
```
H1: 48px (md: 56-64px) - Page titles
H2: 36px (md: 48px) - Section headings
H3: 24px - Card titles
H4: 18px - Subheadings
Body: 16px - Default text
Small: 14px - Secondary text
```

## Spacing System

Uses Tailwind's standard spacing scale (0.25rem = 4px):
- `p-4` = 16px padding
- `gap-4` = 16px gap between items
- `py-20` = 80px vertical padding
- Use consistent spacing to create visual rhythm

## Border Radius

- **Subtle**: `rounded` (0.25rem) - Minimal curves
- **Default**: `rounded-xl` (0.75rem) - Most components
- **Large**: `rounded-2xl` (1rem) - Cards, large containers
- **Extra**: `rounded-3xl` (1.5rem) - Hero sections

## Component Patterns

### Buttons
- **Primary CTA**: Red background (`bg-primary`), white text, hover effect
- **Secondary**: White background with border, hover with shadow
- **Sizes**: Small (h-10), Medium (h-12), Large (h-14+)
- **Border Radius**: `rounded-lg` to `rounded-xl`
- **Font Weight**: Always semibold (`font-semibold`)

### Cards
- **Style**: White background with subtle border (`border border-border`)
- **Shadow**: `hover:shadow-lg` for interactivity
- **Border Radius**: `rounded-2xl`
- **Padding**: `p-8` standard
- **Spacing**: `gap-6` between cards

### Navigation
- **Sticky**: `sticky top-0 z-50`
- **Blur**: `backdrop-blur-lg bg-background/95`
- **Logo**: Gradient text with background icon

### Featured Sections
- **Scale**: Use `md:scale-105` for featured pricing/plan cards
- **Gradient**: `from-primary to-accent` for premium elements
- **Badge**: `absolute -top-5` positioned "POPULAR" labels

### Icons
- **Colored backgrounds**: Circular containers with `w-14 h-14` and `bg-secondary`
- **Icon styling**: `text-primary` or `text-accent` for colored icons
- **Icon size**: `w-7 h-7` inside circular containers

## Layout Patterns

### Hero Section
- **Grid**: `grid md:grid-cols-2 gap-8 items-center`
- **Text width**: `max-w-md` for body copy
- **Spacing**: `py-40` for breathing room

### Features Grid
- **Desktop**: 3 columns (`md:grid-cols-3`)
- **Gap**: `gap-6` between feature cards
- **Max width**: `max-w-7xl` for container

### Pricing Grid
- **Desktop**: 3 columns with featured center card larger
- **Featured**: Use `md:scale-105` transform
- **Cards**: White background, gradient for premium

## Color Usage Guidelines

### When to Use Primary Red (#EF4F5F)
- Main CTA buttons
- Logo and branding
- Active states
- Important metrics
- Primary text emphasis

### When to Use Accent Orange (#FF6B35)
- Secondary CTAs
- Decorative elements
- Gradients with primary
- Icon backgrounds (in containers)
- Highlights and accents

### When to Use Secondary Light (#FFF5F3)
- Subtle background sections
- Icon containers
- Badge backgrounds
- Alternative section backgrounds

### When to Use Grays
- Borders (use `border-border`)
- Muted text (use `text-muted-foreground`)
- Disabled states
- Secondary information

## Interactive States

### Hover Effects
- Buttons: Slightly darker shade
- Cards: Add shadow (`hover:shadow-lg`)
- Links: Color transition to primary

### Focus States
- Use `outline-ring/50` from Tailwind
- Ring color defaults to primary

## Responsive Design

### Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px (md:)
- Desktop: 1025px+ (lg:)

### Mobile-First Approach
1. Design mobile layout first
2. Use `md:` prefix for tablet+ changes
3. Use `lg:` prefix for desktop changes

### Key Mobile Patterns
- Stack sections vertically
- Full-width buttons on mobile
- Hide secondary navigation on mobile
- Use `hidden sm:flex` or `hidden md:flex`

## Quick Reference CSS Classes

```css
/* Primary colors */
.bg-primary = Red background
.text-primary = Red text
.border-primary = Red border
.from-primary = Red gradient start

/* Buttons */
.bg-primary hover:bg-primary/90 = Primary button
.border-2 = Stronger border visibility

/* Cards */
.rounded-2xl = Standard card radius
.border border-border = Card border
.shadow-sm hover:shadow-lg = Card hover

/* Spacing */
.p-8 = Standard padding
.gap-6 = Standard gap
.py-20 = Vertical spacing

/* Text */
.text-muted-foreground = Secondary text
.font-semibold = Button/heading weight
.text-balance = Better line breaking
```

## Best Practices

1. **Consistency**: Always use the defined color palette
2. **Hierarchy**: Use size and weight to establish clear hierarchy
3. **Whitespace**: Don't crowd elements - use generous spacing
4. **Color Contrast**: Ensure text is readable (dark text on light, light text on dark)
5. **Touch Targets**: Make buttons at least 44px tall for mobile
6. **Rounded Corners**: Prefer `rounded-xl` to `rounded-2xl` for most UI
7. **Shadows**: Use shadows sparingly for depth, not decoration
8. **Icons**: Always color icons or put them in colored containers
9. **Gradients**: Use for emphasis (featured items, CTAs) not background
10. **Accessibility**: Maintain sufficient color contrast ratios (WCAG AA minimum)

## Examples

### Primary CTA Button
```jsx
<Button className="bg-primary hover:bg-primary/90 text-white font-semibold h-12 rounded-xl">
  Book Now
</Button>
```

### Feature Card
```jsx
<div className="bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition">
  <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-5">
    <Icon className="w-7 h-7 text-primary" />
  </div>
  <h3 className="text-xl font-bold text-foreground mb-3">Title</h3>
  <p className="text-muted-foreground text-sm">Description</p>
</div>
```

### Gradient Hero
```jsx
<div className="bg-gradient-to-r from-primary via-accent to-primary rounded-3xl p-16 text-white">
  <h2 className="text-5xl font-bold mb-4">Headline</h2>
  <p className="text-xl mb-10 opacity-95">Subheading</p>
  <Button className="bg-white text-primary hover:bg-white/90">CTA</Button>
</div>
```

---

Last Updated: 2024
Inspired by: Zepto, Zomato, Swiggy
