import { test } from '@playwright/test';

test('list visible albums', async ({ page }) => {
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER PAGE ERROR:', err.message));

    await page.goto('http://localhost:5173');
    await page.waitForTimeout(3000); // Wait for fetch

    const albums = await page.$$eval('.album-card h3', els => els.map(e => e.innerText));
    console.log('------------------------------------------------');
    console.log('FOUND ALBUMS:', JSON.stringify(albums, null, 2));
    console.log('------------------------------------------------');

    if (albums.length > 0) {
        console.log('SUCCESS: Data is flowing from Supabase!');
    } else {
        console.log('WARNING: No albums found on the page.');
    }
});
