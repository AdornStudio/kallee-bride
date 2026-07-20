# 001 — Motion pass

Audit findings 1–8 plus page transitions and a hero Ken Burns zoom.
Scope: `src/styles/global.css`, `src/layouts/Layout.astro`,
`src/components/{Header,StickyBookBar,Figure}.astro`,
`src/pages/{index,zakazivanje}.astro`.

## Target values (do not approximate)

```css
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);   /* entrances, exits, press */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement */
--ease-soft:   cubic-bezier(0.22, 1, 0.36, 1);   /* existing editorial curve */
--dur-press: 160ms;
--dur-hover: 220ms;
--dur-ui:    260ms;
--dur-reveal: 800ms;
```

## Steps

1. **Tokens** — add the block above to `:root`; replace hand-typed
   `cubic-bezier(0.22, 1, 0.36, 1)` in Figure, StickyBookBar, Header,
   global.css with `var(--ease-soft)`.
2. **Press feedback** — `.btn:active { transform: scale(0.97) }` with
   `transform var(--dur-press) var(--ease-out)`. Same for `.header__cta`,
   `.bookbar__book`, `.bookbar__call`.
3. **Reduced motion** — replace the blanket `transition-duration: 0.01ms`
   with `transition-property: opacity, color, background-color,
   border-color, outline-color` so colour/focus feedback survives while
   movement is removed.
4. **Stagger** — in Layout's IntersectionObserver, give each `[data-reveal]`
   a delay of `index * 60ms` among its revealing siblings, capped at 300ms.
5. **Hero entrance** — `@keyframes hero-in` (opacity 0 → 1,
   `translateY(18px)` → 0), 900ms `var(--ease-out)` `backwards`, delays
   100/200/320/440/560ms down the stack.
6. **Ken Burns** — `.hero__media img` scale 1.06 → 1 over 24s, wrapped in
   `@media (prefers-reduced-motion: no-preference)`.
7. **Menu bug** — `Header.astro:286`: store the `setTimeout` id and
   `clearTimeout` it at the top of `setMenu`. Without this, open → close →
   open within 450ms hides an open menu.
8. **Menu motion** — `.menu__link` enters with `translateY(12px)` + opacity,
   staggered 60ms via `:nth-child`.
9. **Booking confirmation** — fade the form out (260ms) before revealing
   the thank-you block with a 500ms rise.
10. **Page transitions** — `<ClientRouter />` from `astro:transitions` in
    Layout's head. **All inline scripts must be re-initialised on
    `astro:page-load`**, and element listeners guarded with a
    `dataset.bound` flag so navigation cannot double-bind them.

## Verification

- Tap a button on a real phone — it must depress.
- Open/close/open the mobile menu faster than 0.45s — menu must stay open.
- Toggle "Reduce motion" in System Settings — links must still highlight
  on hover, nothing may stay invisible.
- Navigate between pages — no white flash; header state must still be
  correct (transparent on home, solid elsewhere).
- Submit the booking form — the swap must not teleport.
