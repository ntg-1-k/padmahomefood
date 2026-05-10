# Design Brief

## Direction

Padma Home Food — Premium 3D cloud kitchen showcase with warm spice-inspired OKLCH palette, floating particle effects, and restaurant-grade polish.

## Tone

Luxury dark restaurant aesthetic: refined, warm, immersive — every interaction whispers premium quality (Michelin-grade digital experience).

## Differentiation

Three.js floating food particles (spice, rice grains, herbs) in hero section with warm saffron-to-brown gradient, creating a living, breathing digital storefront that celebrates South Indian culinary craft.

## Color Palette

| Token      | OKLCH        | Role                              |
|------------|--------------|-----------------------------------|
| background | 0.09 30 30   | Deep charcoal, premium dark base  |
| foreground | 0.92 0.01 0  | Near-white, high contrast text    |
| card       | 0.14 32 30   | Elevated surface, subtle warmth   |
| primary    | 0.68 0.18 25 | Saffron-orange, warm spice       |
| secondary  | 0.65 0.15 35 | Deep saffron, accent highlight   |
| accent     | 0.70 0.16 20 | Gold spice, CTAs and highlights   |
| muted      | 0.25 0.02 30 | Subdued warm grey, secondary text |

## Typography

- Display: Lora serif — restaurant name, section headings, premium branding
- Body: General Sans — menu descriptions, prices, UI labels, clean hierarchy
- Scale: hero `text-6xl font-bold tracking-tight`, h2 `text-4xl font-semibold`, label `text-sm font-semibold uppercase tracking-wider`, body `text-base`

## Elevation & Depth

Glassmorphic card surfaces with subtle `backdrop-blur-md` and inset highlights; shadow hierarchy uses warm-tinted shadows (`0 8px 16px oklch(0/0/0/0.25)` for cards, `0 20px 40px oklch(0/0/0/0.4)` for elevated overlays) to preserve warm palette integrity.

## Structural Zones

| Zone    | Background              | Border          | Notes                           |
|---------|-------------------------|-----------------|--------------------------------|
| Header  | `bg-background/95` + border-b | `border-white/5` | Fixed top, sticky order buttons |
| Hero    | 3D canvas + warm gradient overlay | —            | Full viewport, floating particles |
| Menu    | `bg-background` sections | —               | Alternating subtle warm tints   |
| Cards   | `glass-card` (transparent + blur) | `border-white/5` | Hover lifts with shadow-elevated |
| Footer  | `bg-card` with border-t  | `border-white/5` | Contact, address, social links  |

## Spacing & Rhythm

Section gaps `gap-12 md:gap-16`; card grids `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`; micro-spacing `px-4 py-3` on UI elements; generous breathing room reinforces premium feel.

## Component Patterns

- Buttons: `bg-primary text-foreground font-semibold rounded-lg py-3 px-6 shadow-card transition-smooth hover:bg-secondary hover:shadow-elevated`
- Cards: `glass-card rounded-xl overflow-hidden` with image overlay, hover scale + shadow lift
- Menu items: Image + title (serif, `text-lg font-semibold`) + description (sans, `text-sm`) + price (serif accent, `text-primary`)
- Badges: Inline `bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold`

## Motion

- Entrance: Fade + subtle up slide `duration-500 ease-out`
- Hover: Cards scale `scale-102` + shadow lift, buttons shift color with glow effect
- Decorative: Floating particles animation loop, gentle pulsing accent glow on CTAs, slow rotation on decorative elements
- Particle float: `animation-float 3s ease-in-out infinite`

## Constraints

- All colors expressed as OKLCH `L C H` values — no hex, no rgb
- No purple, cool tones, or cyan — palette locked to warm spice spectrum
- Glassmorphism only on cards (minimal, tasteful) — avoid excessive transparency
- Mobile-first responsive; WhatsApp/Zomato FAB floats bottom-right on mobile
- No animations on every interaction — restraint is premium

## Signature Detail

Floating food particle system in hero section: Three.js canvas renders animated spice particles, rice grains, and herb leaves rising and rotating against warm OKLCH gradient — transforms static hero into a living culinary experience that celebrates the restaurant's craft and premium positioning.
