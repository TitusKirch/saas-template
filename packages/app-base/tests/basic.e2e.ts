import { expect, test } from '@nuxt/test-utils/playwright';

test('Renders Hello World!', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' });
  await expect(page.getByRole('heading', { name: 'Hello World!' })).toBeVisible();
});
