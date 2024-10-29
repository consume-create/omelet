import V3ScrollLock from 'v3-scroll-lock';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(V3ScrollLock);
});
