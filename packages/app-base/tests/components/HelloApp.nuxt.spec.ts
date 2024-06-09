import { mountSuspended } from '@nuxt/test-utils/runtime';
import HelloApp from '~/components/HelloApp.vue';
import { describe, expect, it } from 'vitest';

describe('components/HelloApp', async () => {
  it('can mount some component', async () => {
    const component = await mountSuspended(HelloApp);
    expect(component.text()).contains('Hello App!');
  });
});
