import { expect, test } from '@nuxt/test-utils/playwright'

test('Renders Welcome to Nuxt!', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await expect(page.getByRole('heading', { name: 'Welcome to Nuxt!' })).toBeVisible()
})
