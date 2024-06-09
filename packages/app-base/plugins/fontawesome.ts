import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
// NOTE: FA PRO
// import { fal } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

// Add all icons to the library so you can use it in your page
library.add(
  fab
  // NOTE: FA PRO
  //  fal
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
