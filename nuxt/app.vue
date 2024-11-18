<template>
  <div>
    <transition name="loading" :duration="2100">
      <Loader v-if="store.loading" />
    </transition>
    <GridOverlay />
    <!-- <DevOnly>
      <GridOverlay />
    </DevOnly> -->
    <Header />
    <transition name="menu">
      <Menu v-if="store.menu_open" />
    </transition>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

// Composables
useSeoMeta({
  title: store.site_name,
  ogTitle: store.site_name,
  description: store.site_seo_description,
  ogDescription: store.site_seo_description,
  ogImage: store.site_seo_image
})

// Mounted
onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();
});

// Before Unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

// Methods
function onResize() {
  updateScrollbarWidth();
};

function updateScrollbarWidth() {
  // NOTE: Store scrollbar width in css custom property to calculate grid spans properly
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};
</script>

<style lang='scss'>
// Default page transition
.page-enter-active,
.page-leave-active {
  transition: opacity $speed-666 $evil-ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

// Test page transition
.scale-enter-active,
.scale-leave-active {
  transition: opacity 2s $evil-ease, transform 2s $evil-ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
