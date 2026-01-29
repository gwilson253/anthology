import { test, expect } from '@playwright/test';

const mockAlbums = [
  {
    id: 1,
    title: 'Album One',
    artist: 'Artist One',
    cover_url: 'http://localhost/cover1.jpg',
    description: 'Description One',
    display_order: 1
  }
];

const mockTracks = [];

test('album images have lazy loading', async ({ page }) => {
    // Mock Supabase requests
    await page.route('**/rest/v1/albums*', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockAlbums)
        });
    });

    await page.route('**/rest/v1/tracks*', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockTracks)
        });
    });

    await page.goto('/');

    // Wait for the album card to appear
    await page.waitForSelector('.album-card');

    // Check the image for the loading attribute
    const image = page.locator('.album-artwork').first();
    await expect(image).toHaveAttribute('loading', 'lazy');
});
