import { test, expect } from '@playwright/test';
test('starter routes, responsive navigation, and pxv output work', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Shared roots.',
  );
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(250, 249, 246)',
  );
  expect(
    await page
      .locator('header')
      .first()
      .evaluate((el) => getComputedStyle(el).paddingTop),
  ).not.toBe('0px');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole('link', { name: 'Explore the showcase' }).click();
  await expect(page).toHaveURL(/showcase/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'See the foundation.',
  );
  await page.goto('/missing-page');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'A little off the path.',
  );
  expect(errors).toEqual([]);
});
test('mobile menu and keyboard skip link work', async ({ page, isMobile }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  if (isMobile) {
    await page.getByText('Menu', { exact: true }).click();
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Showcase' })
      .click();
    await expect(page).toHaveURL(/showcase/);
  }
});
test('metadata routes are available and starter is noindex by default', async ({
  request,
}) => {
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain('Disallow: /');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain('/showcase');
});
