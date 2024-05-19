import { addComponent, defineNuxtModule } from '@nuxt/kit';

// Note: Workaround for https://github.com/formkit/formkit/issues/687#issuecomment-1901948938
export default defineNuxtModule({
  setup() {
    addComponent({
      name: 'FormKitProvider',
      export: 'FormKitProvider',
      filePath: '@formkit/vue',
      chunkName: '@formkit/vue',
    });
    addComponent({
      name: 'FormKitMessages',
      export: 'FormKitMessages',
      filePath: '@formkit/vue',
      chunkName: '@formkit/vue',
    });
    addComponent({
      name: 'FormKitSummary',
      export: 'FormKitSummary',
      filePath: '@formkit/vue',
      chunkName: '@formkit/vue',
    });
  },
});
