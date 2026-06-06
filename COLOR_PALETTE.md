# HomeBuddy Color Palette Reference

## Primary Colors

### Primary Red
- **Hex**: `#EF4F5F`
- **RGB**: `239, 79, 95`
- **HSL**: `355°, 85%, 62%`
- **Usage**: Primary CTAs, brand emphasis, action buttons
- **CSS**: `bg-primary`, `text-primary`, `border-primary`

### Accent Orange
- **Hex**: `#FF6B35`
- **RGB**: `255, 107, 53`
- **HSL**: `18°, 100%, 60%`
- **Usage**: Secondary CTAs, gradients, highlights
- **CSS**: `bg-accent`, `text-accent`, `border-accent`

## Neutral Colors

### Background White
- **Hex**: `#FFFFFF`
- **RGB**: `255, 255, 255`
- **CSS**: `bg-background`

### Foreground Text
- **Hex**: `#0F0F0F`
- **RGB**: `15, 15, 15`
- **CSS**: `text-foreground`

### Card White
- **Hex**: `#FFFFFF`
- **RGB**: `255, 255, 255`
- **CSS**: `bg-card`

### Secondary Light Rose
- **Hex**: `#FFF5F3`
- **RGB**: `255, 245, 243`
- **CSS**: `bg-secondary`

### Muted Light Gray
- **Hex**: `#F0F0F0`
- **RGB**: `240, 240, 240`
- **CSS**: `bg-muted`

### Muted Text
- **Hex**: `#666666`
- **RGB**: `102, 102, 102`
- **CSS**: `text-muted-foreground`

### Border Light Gray
- **Hex**: `#E8E8E8`
- **RGB**: `232, 232, 232`
- **CSS**: `border-border`

### Input Background
- **Hex**: `#F8F8F8`
- **RGB**: `248, 248, 248`
- **CSS**: `bg-input`

## Dark Mode Colors

### Dark Background
- **Hex**: `#0A0A0A`
- **RGB**: `10, 10, 10`
- **CSS Dark**: `bg-background`

### Dark Card
- **Hex**: `#1A1A1A`
- **RGB**: `26, 26, 26`
- **CSS Dark**: `bg-card`

### Dark Foreground
- **Hex**: `#FFFFFF`
- **RGB**: `255, 255, 255`
- **CSS Dark**: `text-foreground`

### Dark Muted
- **Hex**: `#333333`
- **RGB**: `51, 51, 51`
- **CSS Dark**: `bg-muted`

### Dark Border
- **Hex**: `#2A2A2A`
- **RGB**: `42, 42, 42`
- **CSS Dark**: `border-border`

## Gradient Combinations

### Primary to Accent (Most Common)
```css
background: linear-gradient(to right, #EF4F5F, #FF6B35);
/* or */
className="bg-gradient-to-r from-primary to-accent"
```

### Primary to Accent (Vertical)
```css
background: linear-gradient(to bottom, #EF4F5F, #FF6B35);
/* or */
className="bg-gradient-to-b from-primary to-accent"
```

### Triple Gradient (for CTAs)
```css
background: linear-gradient(to right, #EF4F5F, #FF6B35, #EF4F5F);
/* or */
className="bg-gradient-to-r from-primary via-accent to-primary"
```

## Color Usage by Component

### Buttons
| Type | Background | Text | Hover |
|------|-----------|------|-------|
| Primary | #EF4F5F | White | #EF4F5F/90 |
| Secondary | White | #0F0F0F | Gray-100 |
| Ghost | Transparent | #EF4F5F | Light bg |

### Cards
| Element | Color | Use |
|---------|-------|-----|
| Background | #FFFFFF | Card body |
| Border | #E8E8E8 | Card edge |
| Hover Shadow | Shadow-lg | Interactive state |

### Icons
| Style | Colors | Use |
|-------|--------|-----|
| Colored | #EF4F5F | Primary emphasis |
| In Container | Container: #FFF5F3, Icon: #EF4F5F | Feature cards |
| Text Icon | #666666 | Secondary actions |

### Text
| Type | Color | Use |
|------|-------|-----|
| Heading | #0F0F0F | Main text |
| Body | #0F0F0F | Standard text |
| Secondary | #666666 | Descriptions |
| Muted | #999999 | Helper text |

## Accessibility Contrast Ratios

| Combination | Contrast | WCAG |
|-----------|----------|------|
| #EF4F5F on #FFFFFF | 3.9:1 | AA ✓ |
| #EF4F5F on #0F0F0F | 6.2:1 | AAA ✓ |
| #FF6B35 on #FFFFFF | 3.8:1 | AA ✓ |
| #0F0F0F on #FFFFFF | 19.5:1 | AAA ✓ |
| #666666 on #FFFFFF | 5.5:1 | AAA ✓ |

## Quick Copy-Paste Values

### For Tailwind CSS
```css
/* Define in tailwind.config.ts if customizing */
colors: {
  primary: '#EF4F5F',
  accent: '#FF6B35',
  background: '#FFFFFF',
  foreground: '#0F0F0F',
  secondary: '#FFF5F3',
  muted: '#F0F0F0',
  border: '#E8E8E8',
  input: '#F8F8F8',
}
```

### For CSS Variables
```css
:root {
  --primary: #EF4F5F;
  --accent: #FF6B35;
  --background: #FFFFFF;
  --foreground: #0F0F0F;
  --secondary: #FFF5F3;
  --muted: #F0F0F0;
  --border: #E8E8E8;
  --input: #F8F8F8;
}
```

### For JavaScript/React
```javascript
const colors = {
  primary: '#EF4F5F',
  accent: '#FF6B35',
  background: '#FFFFFF',
  foreground: '#0F0F0F',
  secondary: '#FFF5F3',
  muted: '#F0F0F0',
  border: '#E8E8E8',
  input: '#F8F8F8',
}
```

## Color Psychology

### Red (#EF4F5F)
- Conveys urgency and action
- Associated with energy and passion
- Draws attention and encourages CTAs
- Perfect for "Book Now" buttons

### Orange (#FF6B35)
- Represents warmth and enthusiasm
- Associated with friendliness
- Complements red in gradients
- Great for secondary actions

### Whites/Grays
- Create clean, minimal aesthetic
- Provide breathing room
- Support primary colors

---

**Note**: All colors are defined in `app/globals.css` and can be used via Tailwind CSS classes throughout the app.

Last Updated: 2024
