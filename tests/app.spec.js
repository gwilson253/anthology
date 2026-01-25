import { test, expect } from '@playwright/test';

test('has music library title', async ({ page }) => {
    await page.goto('http://localhost:5173'); // Use service name if running inside docker network
    await expect(page.locator('h1')).toContainText('Music Library');
});

test('can view album details', async ({ page }) => {
    await page.goto('http://localhost:5173');
    // Wait for data to load
    await page.waitForSelector('.album-card', { timeout: 10000 });
    await page.click('.album-card');
    await expect(page.locator('.detail-info h1')).toBeVisible();
});
