<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>

<script>
export default {
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
