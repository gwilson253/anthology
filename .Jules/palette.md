## 2026-01-30 - Player Accessibility
**Learning:** Custom slider controls (like progress bars) are often implemented as clickable divs, missing keyboard support entirely. Adding `role="slider"` is not enough; `tabIndex="0"` and `onKeyDown` handlers are essential for true accessibility.
**Action:** When auditing custom interactive elements, always check for keyboard operability (Tab + Arrows) alongside screen reader attributes.
