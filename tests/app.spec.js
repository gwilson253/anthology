import { test, expect } from '@playwright/test';

const mockAlbums = [
  {
    id: 1,
    title: 'Album One',
    artist: 'Artist One',
    cover_url: 'http://localhost/cover1.jpg',
    description: 'Description One',
    display_order: 1
  },
  {
    id: 2,
    title: 'Album Two',
    artist: 'Artist Two',
    cover_url: 'http://localhost/cover2.jpg',
    description: 'Description Two',
    display_order: 2
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

test('has music library title', async ({ page }) => {
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

    await page.goto('/'); // Use service name if running inside docker network
    await expect(page.locator('h1')).toContainText('Greg Wilson | Albums');
});

test('can view album details', async ({ page }) => {
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
    // Wait for data to load
    await page.waitForSelector('.album-card', { timeout: 10000 });
    await page.click('.album-card');
    await expect(page.locator('.detail-info h1')).toBeVisible();
});
