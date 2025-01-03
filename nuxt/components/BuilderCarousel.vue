<template>
  <section class="builder-carousel pad-bl">
    <div class="gutter">
      <div class="carousel-wrapper">
        <Carousel
          ref="carousel"
          :wrapAround="false"
          snapAlign="start"
          :modelValue="0"
          @slide-end="handleSlideEnd"
        >
          <Slide v-for="(slide, index) in slides" :key="index">
            <template v-if="slide.type === 'singleImage'">
              <ResponsiveImage v-bind="slide.image" />
            </template>
            <template v-else>
              <VideoCover v-if="slide.type === 'videoLoop'" :vimeo="slide.vimeo" :cover="true" :key="index" ref="videoSlides" />
              <VideoCover v-if="slide.type === 'videoPlayer'" :vimeo="slide.vimeo" :cover="true" :controls="true" :key="index" ref="videoSlides" />
            </template>
          </Slide>
        </Carousel>
        <div class="carousel-controls pad-t" inert>
          <div class="arrow --prev" :class="{'--disabled': state.current_index === 0}" @click="onClickPrev" />
          <ul>
            <li v-for="(slide, index) in slides" :class="{'--active': state.current_index === index}" :key="index" @click="onClickPagination(index)" />
          </ul>
          <div class="arrow --next" :class="{'--disabled': state.current_index === slides.length - 1}" @click="onClickNext" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

// Props
const props = defineProps({
  slides: {
    type: Array
  }
});
const videoSlides = ref([]);
const carousel = ref(null);
const state = reactive({
  current_index: 0
})

// Methods
function handleSlideEnd(data) {
  state.current_index = data.currentSlideIndex;
  videoSlides.value.forEach((slide, index) => {
    slide.carouselSlideChange();
  });
}

function onClickPrev() {
  if (state.current_index > 0) {
    state.current_index = state.current_index - 1;
    carousel.value.prev();
  }
}

function onClickNext() {
  if (state.current_index < props.slides.length - 1) {
    state.current_index = state.current_index + 1;
    carousel.value.next();
  }
}

function onClickPagination(index) {
  state.current_index = index;
  carousel.value.slideTo(index);
}

</script>

<style lang='scss'>
.builder-carousel {
  position: relative;
  overflow: hidden;

  .carousel-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;

    .carousel__sr-only {
      display: none;
    }

    .carousel {
      &.is-hover {
        .carousel__viewport {
          cursor: grab;
        }
      }

      &.is-dragging {
        .carousel__viewport {
          cursor: grabbing;
        }
      }
    }

    .carousel__track {
      width: 100%;

      .carousel__slide {
        position: relative;
        width: 100%;
        aspect-ratio: 16/9;
        background-color: $ash;
        display: flex;
        overflow: hidden;
      }
    }

    .carousel-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .arrow {
        width: 24px;
        height: 24px;
        margin: 0 $space-s;
        @include arrow($black);
        cursor: pointer;
        transition: opacity $speed-333 $ease-out;

        &.--prev {
          transform: rotate(180deg);
        }

        &.--disabled {
          opacity: 0.3;
          pointer-events: none;
        }
      }

      ul {
        display: inline-flex;
        align-items: center;

        li {
          height: 24px;
          margin: 0 $space-xs;
          display: inline-flex;
          align-items: center;
          cursor: pointer;

          &.--active {
            cursor: default;

            &:after {
              opacity: 1;
            }
          }

          @include can-hover {
            &:hover {
              &:after {
                opacity: 1;
              }
            }
          }

          &:after {
            content: '';
            width: $space-l;
            height: 3px;
            background-color: $black;
            display: inline-flex;
            align-items: center;
            opacity: 0.1;
            transition: opacity $speed-333 $ease-out;
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    .carousel-wrapper {
      .carousel-controls {
        .arrow {
          width: 34px;
          height: 34px;
        }

        ul {
          display: inline-flex;
          align-items: center;

          li {
            height: 34px;
            margin: 0 $space-s;

            &:after {
              content: '';
              width: $space-xl;
              height: 4px;
            }
          }
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .gutter {
      margin: 0 span(1);
    }

    .carousel-wrapper {
      .carousel-controls {
        ul {
          li {
            &:after {
              width: calc($space-l * 2);
            }
          }
        }
      }
    }
  }

  @include respond-to($desktop) {
    .gutter {
      margin: 0 span(2);
    }
  }

  @include respond-to($retina-macbook) {
    .gutter {
      margin: 0 span(2.5);
    }
  }
}
</style>
