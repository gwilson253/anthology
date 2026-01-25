import { test, expect } from '@playwright/test';

test('player appears when track is clicked', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Click first album (wait for fetch)
    await page.waitForSelector('.album-card', { timeout: 10000 });
    await page.click('.album-card');

    // Wait for detail view
    await expect(page.locator('.detail-info h1')).toBeVisible();

    // Click first track
    await page.click('.track-item >> nth=0');

    // Verify player appears
    await expect(page.locator('.player-container')).toBeVisible();

    // Verify song title in player matches
    const trackTitle = await page.locator('.track-item >> nth=0 >> .track-title').innerText();
    await expect(page.locator('.player-content .track-title')).toHaveText(trackTitle);
});
