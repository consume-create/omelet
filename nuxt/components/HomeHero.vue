<template>
  <section id="home-hero-section">
    <div class="gutter">
      <div ref="wrapper" id="home-hero-media">
        <div class="video-holder" :class="{'--show': state.playing_mode}" :style="{'width': `${state.player_width}px`, 'height': `${state.player_height}px`}">
          <client-only>
            <vueVimeoPlayer ref="player"
              :video-id="vid"
              :options="{
                controls: false,
                autoplay: false,
                loop: true,
                muted: true,
                playsinline: true
              }"
              :player-width="state.player_width"
              :player-height="state.player_height"
              @loaded="onLoaded"
              @playing="isPlaying"
            />
          </client-only>
        </div>
        <div class="video-poster" :class="{'--show': !state.playing_mode}">
          <ResponsiveImage v-bind="poster" :alt="alt" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { vueVimeoPlayer } from 'vue-vimeo-player';

// Props
const props = defineProps({
  video: {
    type: Object
  }
});
const state = reactive({
  playing_mode: false,
  player_width: 0,
  player_height: 0
});

let player = ref();
const wrapper = ref();
const vimeo = props.video.vimeo;
const poster = {
  src: vimeo.pictures.base_link.replace('?r=pad', '') + '?r=rpad',
  width: vimeo.pictures.sizes.pop().width,
  height: vimeo.pictures.sizes.pop().height
}
const alt = vimeo.name;
const vid = vimeo.id;

// Mounted
onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();
});

// Before Unmount
onBeforeMount(() => {
  window.removeEventListener('resize', onResize);
});

// Methods
function onLoaded() {
  player.value.play();
}

function isPlaying() {
  state.playing_mode = true;
}

function onResize() {
  const wrapper_width = wrapper.value.clientWidth;
  const wrapper_height = wrapper.value.clientHeight;
  const video_ratio = vimeo.play.source.width / vimeo.play.source.height;
  let new_width = wrapper_width;
  let new_height = wrapper_height;

  if (wrapper_width / wrapper_height > video_ratio) {
    new_height = wrapper_width / video_ratio;
  } else {
    new_width = wrapper_height * video_ratio;
  }

  state.player_width = new_width;
  state.player_height = new_height;
}
</script>

<style lang='scss'>
section#home-hero-section {
  margin-bottom: span(1);

  #home-hero-media {
    position: relative;
    width: 100%;
    aspect-ratio: 7/6;
    background-color: $black;
    overflow: hidden;
    display: flex;

    .video-holder {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0px;
      height: 0px;
      overflow: hidden;
      opacity: 0;
      transform: translateX(-50%) translateY(-50%);

      &.--show {
        opacity: 1;
      }
    }

    .video-poster {
      @include abs-fill;
      background-color: $black;
      overflow: hidden;
      opacity: 0;
      transition: opacity $speed-666 $ease-out;

      &.--show {
        pointer-events: auto;
        opacity: 1;
      }
    }

    img,
    iframe {
      @include abs-fill;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  @include respond-to($landscape) {
    #home-hero-media {
      aspect-ratio: auto;
      height: calc(100vh - #{$header-height} - #{$space-s});
    }

    @include respond-to($tablet) {
      #home-hero-media {
        height: calc(100vh - #{$header-height} - #{$space-m});
      }
    }

    @include respond-to($large-tablet) {
      #home-hero-media {
        height: calc(100vh - #{$header-height} - #{$space-l});
      }
    }
  }
}
</style>
