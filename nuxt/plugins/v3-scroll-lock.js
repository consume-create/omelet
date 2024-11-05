import V3ScrollLock from 'v3-scroll-lock';

export default defineNuxtPlugin(async nuxtApp => {
  nuxtApp.vueApp.use(V3ScrollLock);
});
