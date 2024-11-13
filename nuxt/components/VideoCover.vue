<template>
  <div ref="wrapper" class="video-cover-wrapper" :class="{'--no-controls': !controls}">
    <div class="video-holder" :class="{'--show': state.playing_mode, '--cover': cover}" :style="[cover && {'width': `${state.player_width}px`, 'height': `${state.player_height}px`}]">
      <client-only>
        <vueVimeoPlayer ref="player"
          :video-id="vid"
          :options="{
            controls: controls ? true : false,
            autoplay: controls ? false : true,
            loop: controls ? false : true,
            muted: controls ? false : true,
            playsinline: true,
            autopause: 0
          }"
          :player-width="state.player_width"
          :player-height="state.player_height"
          @loaded="onLoaded"
          @playing="isPlaying"
          @ended="onEnded"
        />
      </client-only>
    </div>
    <div class="video-poster" :class="{'--show': !state.playing_mode}">
      <ResponsiveImage v-bind="poster" :alt="alt" />
      <div v-if="controls" class="play-btn" @click="clickToPlay">
        <span class="fs-p2">Play</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vueVimeoPlayer } from 'vue-vimeo-player';

// Props
const props = defineProps({
  vimeo: {
    type: Object
  },
  controls: {
    type: Boolean,
    default: false,
    required: false
  },
  cover: {
    type: Boolean,
    default: false,
    required: false
  }
});
const state = reactive({
  playing_mode: false,
  player_width: 0,
  player_height: 0
});

let player = ref();
const wrapper = ref();
const vimeo = props.vimeo;
const controls = props.controls;
const cover = props.cover;
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
  if (!controls) {
    player.value.play();
  }
}

function isPlaying() {
  state.playing_mode = true;
}

function clickToPlay() {
  player.value.play();
  state.playing_mode = true;
}

function onEnded() {
  if (controls) {
    state.playing_mode = false;
  }
}

function onResize() {
  if (!cover) return false;

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

  state.player_width = new_width + 2;
  state.player_height = new_height + 2;
}
</script>

<style lang='scss'>
.video-cover-wrapper {
  @include abs-fill;
  overflow: hidden;

  &.--no-controls {
    pointer-events: none;
  }

  .video-holder {
    position: absolute;
    opacity: 0;

    &:not(.--cover) {
      @include abs-fill;
    }

    &.--cover {
      top: 50%;
      left: 50%;
      width: 0px;
      height: 0px;
      transform: translateX(-50%) translateY(-50%);
    }

    &.--show {
      opacity: 1;
    }
  }

  .video-poster {
    @include abs-fill;
    background-color: $black;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    transition: opacity $speed-666 $ease-out;

    &.--show {
      pointer-events: auto;
      opacity: 1;
    }

    .play-btn {
      @include abs-fill;
      color: $white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      @include can-hover {
        &:hover {
          &:before {
            opacity: 1;
          }

          span {
            &:after {
              transform: scaleX(1) translateX(-50%);
            }
          }
        }
      }

      &:before {
        content: '';
        @include abs-fill;
        background-color: rgba($black, 0.4);
        opacity: 0;
        transition: $speed-333 $ease-out;
      }

      span {
        position: relative;
        height: 34px;
        display: inline-flex;
        align-items: center;

        &:after {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 50%;
          width: 100%;
          height: 2px;
          background-color: $white;
          transform-origin: 0% 50%;
          transform: scaleX(1.4) translateX(-50%);
          transition: transform $speed-333 $ease-out;
        }
      }
    }
  }

  img,
  iframe {
    @include abs-fill;
    object-fit: cover;
    object-position: 50% 50%;
  }
}
</style>
