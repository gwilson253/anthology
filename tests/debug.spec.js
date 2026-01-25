import { test } from '@playwright/test';

test('capture console logs', async ({ page }) => {
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER PAGE ERROR:', err.message));

    await page.goto('http://localhost:5173');
    await page.waitForTimeout(2000); // Wait for potential async errors
});
