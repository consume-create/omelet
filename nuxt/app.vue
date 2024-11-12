<template>
  <div>
    <transition name="loader" :duration="2100">
      <Loader v-if="store.loader" />
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
  console.log('app mounted');
});

// Before Unmount
onBeforeMount(() => {
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
