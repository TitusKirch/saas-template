import CountryFlag from 'vue-country-flag-next';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('CountryFlag', CountryFlag);
});
