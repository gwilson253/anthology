## 2024-05-23 - Playwright Strict Mode & Button Labels
**Learning:** `getByRole('button', { name: 'Play' })` matches both "Play" and "Play Album" because of partial matching. This causes strict mode violations in tests when multiple similar buttons exist.
**Action:** Use `{ exact: true }` or scope locators to specific containers when testing common actions like "Play".
