import VBodyScrollLock from "v-body-scroll-lock";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VBodyScrollLock)
})
