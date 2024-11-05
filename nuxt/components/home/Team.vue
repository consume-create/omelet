<template>
  <section id="leadership" class="pad-t">
    <div class="title-block">
      <h3>Meet the eggs in our leadership team</h3>
    </div>
    <div class="carousel-controls pad-b">
      <div class="arrow --prev" @click="onClickPrev" />
      <div class="arrow --next" @click="onClickNext" />
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
              <ResponsiveImage :src="member.image" :width="800" :height="2400" :alt="member.name" />
            </div>
            <p class="fs-p4">{{ member.name }}</p>
            <p class="fs-p4 reg">{{ member.role }}</p>
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import ResponsiveImage from '~/components/shared/ResponsiveImage.vue';
import 'vue3-carousel/dist/carousel.css';

export default {
  components: {
    Carousel,
    Slide,
    ResponsiveImage
  },
  setup() {
    const teamCarousel = ref(null);

    return {
      teamCarousel
    }
  },
  data() {
    return {
      members: [
        { name: 'Thas Naseemuddeen', role: 'Chief Executive Officer', image: '/images/team/Thas.jpg' },
        { name: 'Pete Talaba', role: 'Chief Strategy Officer', image: '/images/team/Pete.jpg' },
        { name: 'Chelsea Kauth', role: 'Executive Creative Director', image: '/images/team/Chels.jpg' },
        { name: 'Josh Smutko', role: 'Executive Creative Director', image: '/images/team/Josh.jpg' },
        { name: 'Sarah D', role: 'N/A', image: '/images/team/Sarah_D.jpg' },
        { name: 'Ricardo Diaz', role: 'Chief Innovation Officer', image: '/images/team/Ricardo.jpg' },
        { name: 'Zeynep Taslica', role: 'Head of Production', image: '/images/team/Zey.jpg' },
        { name: 'Sarah Ceglarski', role: 'Chief Marketing Officer', image: '/images/team/Sarah.jpg' },
        { name: 'Abba Binns', role: 'Director of People & Culture', image: '/images/team/Abba.jpg' },
        { name: 'Naj Allana', role: 'Chief Financial Officer', image: '/images/team/Naj.jpg' },
        { name: 'Raul Montes', role: 'Creative Director', image: '/images/team/Raul.jpg' },
        { name: 'Jimmy Barker', role: 'Creative Director', image: '/images/team/Jimmy.jpg' },
        { name: 'Florian Bodet', role: 'Creative Director', image: '/images/team/Flo.jpg' },
        { name: 'Don Kurz', role: 'Executive Board Chair', image: '/images/team/Don.jpg' }
      ]
    }
  },
  methods: {
    onClickPrev() {
      this.teamCarousel.prev();
    },
    onClickNext() {
      this.teamCarousel.next();
    }
  }
}
</script>

<style lang="scss">

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
