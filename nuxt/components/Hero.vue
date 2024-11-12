<template>
  <section class="hero-section pad-bl">
    <div class="hero-section-inner bg-green">
      <div class="hero-media">
        <ResponsiveImage v-if="media.type === 'singleImage'" v-bind="media.image" :alt="title" />
        <div v-if="media.type !== 'singleImage' && vimeo_poster" class="video-wrapper">
          <div class="video-poster">
            <ResponsiveImage v-bind="vimeo_poster" :alt="title" />
          </div>
        </div>
      </div>
      <div class="hero-title pad-b">
        <div class="gutter">
          <h2>{{ title }}</h2>
          <p v-if="subtitle" class="fs-p2">{{ subtitle }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
// Props
const props = defineProps({
  title: {
    type: String
  },
  slug: {
    type: String
  },
  subtitle: {
    type: String
  },
  media: {
    type: Object
  }
});

let vimeo_poster = false;

if (props.media.type !== 'singleImage') {
  const vimeoData = props.media.vimeo;
  vimeo_poster = {
    src: vimeoData.pictures.base_link.replace('?r=pad', '') + '?r=rpad',
    width: vimeoData.pictures.sizes.pop().width,
    height: vimeoData.pictures.sizes.pop().height
  }
}
</script>

<style lang='scss'>
section.hero-section {
  position: relative;
  overflow: hidden;

  .hero-section-inner {
    position: relative;
  }

  .hero-media {
    position: relative;
    width: 100%;
    aspect-ratio: 375/320;
    max-height: 500px;
    overflow: hidden;
    display: flex;

    img,
    video,
    iframe {
      @include abs-fill;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  .hero-title {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    color: $white;

    p.fs-p2 {
      margin-top: $space-s;
    }
  }

  @include respond-to($tablet) {
    .hero-title {
      p.fs-p2 {
        margin-top: $space-m;
      }
    }
  }
}
</style>
