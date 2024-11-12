<template>
  <section id="leadership" class="pad-t">
    <div class="title-block">
      <h3 class="pre">{{ title }}</h3>
    </div>
    <div class="carousel-controls pad-b">
      <div class="arrow --prev" @click="teamCarousel.prev" />
      <div class="arrow --next" @click="teamCarousel.next" />
    </div>
    <div class="carousel-wrapper">
      <Carousel
        ref="teamCarousel"
        :wrapAround="true"
        snapAlign="start"
        :modelValue="0"
        :breakpoints="{
          500: { itemsToShow: 1.5 },
          768: { itemsToShow: 2 },
          1024: { itemsToShow: 2.25 },
          1440: { itemsToShow: 3 }
        }"
      >
        <Slide v-for="(member, index) in members" :key="index">
          <div class="inner">
            <div class="image-holder">
              <ResponsiveImage v-bind="member.image" :alt="member.name" />
            </div>
            <p class="fs-p4">{{ member.name }}</p>
            <p class="fs-p4 reg">{{ member.title }}</p>
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

// Props
const props = defineProps({
  title: {
    type: String
  },
  members: {
    type: Array
  }
});

const teamCarousel = ref(null);
</script>

<style lang='scss'>
section#leadership {
  width: 100%;
  padding-bottom: span(3);
  overflow: hidden;

  .title-block {
    margin: 0 span(2);

    h3 {
      max-width: 768px;
    }
  }

  .carousel-controls {
    margin: (-$space-s) span(2) 0;
    display: flex;
    justify-content: flex-end;

    .arrow {
      width: 24px;
      height: 24px;
      @include arrow($black);
      cursor: pointer;

      &.--prev {
        margin-right: $space-l;
        transform: rotate(180deg);
      }
    }
  }

  .carousel-wrapper {
    margin: 0 calc(#{span(2)} - #{$space-xs});
    overflow: visible;

    .carousel {
      &.is-hover {
        cursor: grab;
      }

      &.is-dragging {
        cursor: grabbing;
      }
    }

    .carousel__viewport {
      overflow: visible;
    }

    .carousel__track {
      width: 100%;

      .carousel__slide {
        position: relative;
        width: 100%;
        display: flex;
        align-items: flex-start;

        // Shim to cover pixel-rounding background-position on hover
        &:after {
          content: '';
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 1px;
          background-color: $white;
        }

        .inner {
          width: 100%;
          margin: 0 $space-xs;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-direction: column;

          @include can-hover {
            &:hover {
              .image-holder {
                .responsive-image-wrapper {
                  &.--fill {
                    picture.responsive-image-picture {
                      img {
                        object-position: 50% 100%;
                      }
                    }
                  }
                }
              }
            }
          }

          .image-holder {
            position: relative;
            width: 100%;
            aspect-ratio: 2/3;
            background-color: $ash;
            margin-bottom: $space-s;
            overflow: hidden;
            display: flex;
            flex-shrink: 0;

            .responsive-image-wrapper {
              &.--fill {
                picture.responsive-image-picture {
                  img {
                    object-position: 50% 0%;
                  }
                }
              }
            }
          }

          p:last-child {
            margin-top: 2px;
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    padding-bottom: span(2);

    .carousel-controls {
      margin: -18px $space-m 0;

      .arrow {
        width: 28px;
        height: 28px;
      }
    }

    .carousel-wrapper {
      margin: 0 calc(#{span(2)} - #{$space-s});

      .carousel__track {
        .carousel__slide {
          .inner {
            margin: 0 $space-s;
          }
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .carousel-controls {
      margin: -24px $space-l 0;

      .arrow {
        width: 34px;
        height: 34px;
      }
    }

    .carousel-wrapper {
      margin: 0 calc(#{span(2)} - #{$space-s * 1.5});

      .carousel__track {
        .carousel__slide {
          .inner {
            width: 100%;
            margin: 0 ($space-s * 1.5);
          }
        }
      }
    }
  }

  @include respond-to($average-desktop) {
    .title-block {
      margin: 0 span(3);
    }
  }
}
</style>
