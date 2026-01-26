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
  },
  {
    id: 102,
    title: 'Track Two',
    file_url: 'http://localhost/track2.mp3',
    duration: '3:30',
    album_id: 1,
    track_number: 2,
    description: 'Track 2 desc'
  },
  {
    id: 201,
    title: 'Track Three',
    file_url: 'http://localhost/track3.mp3',
    duration: '4:00',
    album_id: 2,
    track_number: 1,
    description: 'Track 3 desc'
  }
];

test('Player navigation (next/prev) works correctly', async ({ page }) => {
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

  // Navigate to the app
  await page.goto('/');

  // Wait for albums to load
  await expect(page.locator('.album-card').first()).toBeVisible();

  // Click the first album
  await page.click('.album-card >> nth=0');

  // Wait for detail view
  await expect(page.locator('.detail-info h1')).toHaveText('Album One');

  // Click the first track to play it
  await page.click('.track-item >> nth=0');

  // Verify player appears and shows "Track One"
  await expect(page.locator('.player-container')).toBeVisible();
  await expect(page.locator('.player-content .track-title')).toHaveText('Track One');

  // Click Next button (SkipForward icon)
  // The button has class 'control-btn secondary' and contains the SVG.
  // We can find it by the child SVG or order.
  // In Player.jsx: Prev is first, Play is second (primary), Next is third.
  const nextButton = page.locator('.playback-buttons button').nth(2);
  await nextButton.click();

  // Verify player now shows "Track Two"
  await expect(page.locator('.player-content .track-title')).toHaveText('Track Two');

  // Click Next again -> Should go to next album? Or stop?
  // My plan is to go to next album (Track Three).
  await nextButton.click();
  await expect(page.locator('.player-content .track-title')).toHaveText('Track Three');

  // Click Prev button (SkipBack icon) -> Should go back to Track Two
  const prevButton = page.locator('.playback-buttons button').nth(0);
  await prevButton.click();
  await expect(page.locator('.player-content .track-title')).toHaveText('Track Two');

  // Click Prev again -> Track One
  await prevButton.click();
  await expect(page.locator('.player-content .track-title')).toHaveText('Track One');
});
