<template>
  <div>
    <GridOverlay />
    <!-- <DevOnly>
      <GridOverlay />
    </DevOnly> -->
    <Header />
    <transition name="menu">
      <MobileMenu v-if="store.menu_open" />
    </transition>
    <NuxtPage />
  </div>
</template>

<script>
import { useStore } from '~/stores/store';

export default {
  data() {
    return {
      store: useStore()
    }
  },
  mounted() {
    // add event listeners
    window.addEventListener('resize', this.onResize);
    this.updateScrollbarWidth();
  },
  methods: {
    onResize() {
      // window resized... do stuff
      this.updateScrollbarWidth();
    },
    updateScrollbarWidth() {
      // store scrollbar width in css custom property to calculate grid spans properly
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    }
  }
};
</script>
