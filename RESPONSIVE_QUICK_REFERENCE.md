# HomeBuddy - Responsive Design Quick Reference

## Breakpoints at a Glance

| Screen | Size | Orientation | Devices |
|--------|------|-------------|---------|
| **Mobile** | 320-640px | Portrait | iPhone, Android Phone |
| **Tablet** | 640-1024px | Portrait/Landscape | iPad, Tablets |
| **Desktop** | 1024px+ | Landscape | Laptops, Desktops |

---

## Mobile-First Class Patterns

### Show/Hide Elements
```html
<!-- Show only on mobile -->
<div className="md:hidden">Mobile only</div>

<!-- Show only on desktop -->
<div className="hidden md:flex">Desktop only</div>

<!-- Show on tablet+ -->
<div className="hidden sm:block">Tablet+</div>
```

### Responsive Sizing
```html
<!-- Responsive text -->
<h1 className="text-3xl md:text-6xl">Heading</h1>

<!-- Responsive buttons -->
<button className="w-full sm:w-auto">Click</button>

<!-- Responsive padding -->
<div className="px-4 sm:px-6 lg:px-8">Content</div>

<!-- Responsive gaps -->
<div className="gap-4 sm:gap-6 lg:gap-8">Grid</div>
```

### Responsive Grids
```html
<!-- Single → Two → Three columns -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* Auto-responsive grid */}
</div>
```

---

## Font Scaling

| Size | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Body | text-sm | text-base | text-lg |
| Heading | text-2xl | text-4xl | text-6xl |
| Hero | text-3xl | text-5xl | text-7xl |

---

## Spacing Progression

| Context | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Padding | px-4 | px-6 | px-8 |
| Gap | gap-4 | gap-6 | gap-8 |
| Margin | my-8 | my-12 | my-16 |
| Section | py-12 | py-20 | py-40 |

---

## Touch Targets

✓ Minimum 44px height for buttons
✓ Minimum 44px width for buttons
✓ 8px spacing between touch elements
✓ Large enough text to read without zooming (16px+)

---

## Navigation Behavior

| Size | Style | Menu |
|------|-------|------|
| Mobile (< 640px) | Hamburger Icon | Hidden drawer |
| Tablet (640-1024px) | Hamburger Icon | Hidden drawer |
| Desktop (> 1024px) | Full horizontal nav | Always visible |

---

## Button Behavior

```html
<!-- Mobile: Full width, large -->
<Button className="w-full py-3 h-auto text-base">
  Click Me
</Button>

<!-- Desktop: Auto width, normal -->
<Button className="w-auto py-2 h-10 text-sm">
  Click Me
</Button>
```

---

## Image Sizing

```html
<!-- Responsive container -->
<div className="h-64 sm:h-96 md:h-full">
  {/* 256px → 384px → full height */}
</div>

<!-- Responsive icons -->
<Icon className="w-6 sm:w-8 h-6 sm:h-8" />
{/* 24px → 32px */}
```

---

## Grid Layouts

### 1 → 2 → 3 Columns
```html
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {/* Features, cards, etc */}
</div>
```

### 1 → 2 Columns
```html
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
  {/* Hero sections, content blocks */}
</div>
```

### Full Width on Mobile, Fixed on Desktop
```html
<div className="w-full lg:w-1/2">
  {/* Takes full width on mobile, 50% on desktop */}
</div>
```

---

## Flexbox Responsive

```html
<!-- Stacked on mobile, row on tablet+ -->
<div className="flex flex-col sm:flex-row gap-4">
  {/* Responsive flex direction */}
</div>

<!-- Full width items on mobile -->
<Link className="w-full sm:w-auto">
  <Button>Text</Button>
</Link>
```

---

## Typography Rules

### Headings
- Mobile H1: 24px-32px (text-2xl to text-3xl)
- Tablet H1: 36px-48px (text-4xl to text-5xl)
- Desktop H1: 48px-72px (text-6xl to text-7xl)

### Body Text
- Mobile: 14px (text-sm)
- Tablet: 16px (text-base)
- Desktop: 18px (text-lg)

### Minimum Readable Size
- Never go below 14px on mobile
- 16px ideal for body text across all devices

---

## Testing Checklist

### Mobile (320-640px)
- [ ] All text readable without zoom
- [ ] Buttons easily tappable
- [ ] Images scale properly
- [ ] Menu opens/closes smoothly
- [ ] No horizontal scrolling
- [ ] Forms are usable

### Tablet (640-1024px)
- [ ] Two-column layouts work
- [ ] Spacing feels balanced
- [ ] Images properly proportioned
- [ ] Buttons have proper size
- [ ] No excessive whitespace

### Desktop (1024px+)
- [ ] Three-column grids work
- [ ] Full menu displays
- [ ] Hover effects visible
- [ ] Content centered properly
- [ ] Max-width applied

---

## Common Responsive Patterns

### Pattern 1: Responsive Container
```html
<div className="px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Content stays centered and responsive */}
  </div>
</div>
```

### Pattern 2: Responsive Hero
```html
<section className="grid md:grid-cols-2 gap-8">
  <div>{/* Text - full width on mobile */}</div>
  <div>{/* Image - below on mobile */}</div>
</section>
```

### Pattern 3: Responsive Grid
```html
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Adapts automatically */}
</div>
```

### Pattern 4: Responsive Typography
```html
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  {/* Smoothly scales */}
</h1>
```

### Pattern 5: Mobile-First Buttons
```html
<div className="flex flex-col sm:flex-row gap-3">
  <Button className="w-full sm:w-auto">Primary</Button>
  <Button className="w-full sm:w-auto">Secondary</Button>
</div>
```

---

## CSS Variables Available

```css
/* Colors */
--primary: #EF4F5F (red)
--accent: #FF6B35 (orange)
--background: #ffffff
--foreground: #0f0f0f
--border: #E8E8E8
--muted: #F0F0F0

/* Spacing */
Tailwind scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24...

/* Typography */
--font-sora: Sora (headings)
--font-dm-sans: DM Sans (body)
```

---

## Performance Tips

### Mobile
- Keep bundle size minimal
- Lazy load images below fold
- Minimize JavaScript
- Use WebP images where possible

### Desktop
- Can load more assets
- Full feature set enabled
- Complex animations okay

### Both
- Use CSS transforms for animations
- Enable hardware acceleration
- Optimize font loading
- Compress images properly

---

## Debugging Responsive Issues

### Check viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### Chrome DevTools
- Toggle device toolbar (Ctrl+Shift+M)
- Test different device sizes
- Check media queries in Inspector

### Common Issues
- Forgetting responsive prefixes (sm:, md:, lg:)
- Mixing mobile-first and desktop-first breakpoints
- Hard-coded pixel widths
- Not testing actual devices

---

## When to Use Each Breakpoint

| Breakpoint | Use Case |
|-----------|----------|
| Default (no prefix) | Mobile-first base styles |
| sm: | Mobile phones 375px+ |
| md: | Tablets 768px+ |
| lg: | Desktops 1024px+ |
| xl: | Large desktops 1280px+ |

---

## Key Takeaway

**Mobile-first**: Start with mobile styles, add `sm:`, `md:`, `lg:` prefixes to enhance for larger screens. Never start with desktop and remove styles for mobile!

