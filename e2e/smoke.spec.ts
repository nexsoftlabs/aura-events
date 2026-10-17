import { test, expect } from '@playwright/test';

test.describe('Aura Events smoke', () => {
  test('home loads and navigation works', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Unforgettable events');
    const openMenu = page.getByRole('button', { name: /open menu/i });
    if (await openMenu.isVisible()) {
      await openMenu.click();
      await page.getByRole('dialog').getByRole('link', { name: 'View all' }).click();
    } else {
      await page.getByRole('link', { name: 'All 12 services' }).click();
    }
    await expect(page).toHaveURL(/\/services/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Twelve services');
  });

  test('desktop services mega menu opens', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop navigation only');
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Services' }).click();
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Corporate Events' }).click();
    await expect(page).toHaveURL(/\/services\/corporate-events/);
  });

  test('service detail route', async ({ page }) => {
    await page.goto('/services/corporate-events');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Corporate Events');
  });

  test('contact page', async ({ page }) => {
    await page.goto('/contact');
    const submit = page.getByRole('button', { name: /submit enquiry/i });
    if (await submit.count()) {
      await submit.click();
      await expect(page.getByRole('alert').first()).toBeVisible();
    } else {
      await expect(page.getByText(/online enquiries are coming soon/i)).toBeVisible();
    }
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const path of ['/', '/services', '/services/corporate-events', '/contact', '/portfolio']) {
      await page.goto(path);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth, path).toBeLessThanOrEqual(clientWidth + 1);
    }
  });

  test('404 page', async ({ page }) => {
    await page.goto('/does-not-exist');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('left the venue');
  });
});
