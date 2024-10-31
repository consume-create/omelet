<template>
  <div>
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

<script>
import { useStore } from '~/stores/store';
import GridOverlay from '~/components/shared/GridOverlay.vue';
import Header from '~/components/shared/Header.vue';
import Menu from '~/components/shared/Menu.vue';

export default {
  components: {
    GridOverlay,
    Header,
    Menu
  },
  created() {
    useSeoMeta({
      title: this.store.site_name,
      ogTitle: this.store.site_name,
      description: this.store.site_seo_description,
      ogDescription: this.store.site_seo_description,
      ogImage: this.store.site_seo_image
    })
  },
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
