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

const mockTracks = [
  {
    id: 101,
    title: 'Track One',
    file_url: 'http://localhost/track1.mp3',
    duration: '3:00',
    album_id: 1,
    track_number: 1,
    description: 'Track 1 desc'
  }
];

test('player appears when track is clicked', async ({ page }) => {
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
