<template>
  <section id="home-hero-section">
    <div class="gutter">
      <div id="home-hero-inner">
        <VideoCover v-if="video" :vimeo="video.vimeo" :cover="true" />
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  video: {
    type: Object
  }
});
</script>

<style lang='scss'>
section#home-hero-section {
  margin-bottom: span(1);

  #home-hero-inner {
    position: relative;
    width: 100%;
    aspect-ratio: 7/6;
    background-color: $black;
    overflow: hidden;
    display: flex;
  }

  @include respond-to($landscape) {
    #home-hero-inner {
      aspect-ratio: auto;
      height: calc(100vh - #{$header-height} - #{$space-s});
    }

    @include respond-to($tablet) {
      #home-hero-inner {
        height: calc(100vh - #{$header-height} - #{$space-m});
      }
    }

    @include respond-to($large-tablet) {
      #home-hero-inner {
        height: calc(100vh - #{$header-height} - #{$space-l});
      }
    }
  }
}
</style>
