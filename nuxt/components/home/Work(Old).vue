<template>
  <section id="work" class="pad-t">
    <div class="title-block gutter">
      <h3 class="pad-b">Work</h3>
    </div>
    <ul class="work-list">
      <li v-for="item in projects" @mouseenter="directionalHover" @mouseleave="directionalHover">
        <div class="inner">
          <div class="backsplash" />
          <div class="gutter">
            <p class="fs-p1">{{ item.title }}</p>
            <p class="fs-p3">Brand Campaign</p>
            <p class="fs-p3">Entertainment</p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { useStore } from '~/stores/store';

export default {
  data() {
    return {
      projects: [
        { title: 'Google Small Business' },
        { title: 'Netflix Extraction' },
        { title: 'Hogwarts Legacy' },
        { title: 'Youtube Premium' },
        { title: 'Asana' },
        { title: 'Hikup' },
        { title: 'Google One' },
        { title: 'Google Play' }
      ]
    }
  },
  methods: {
    directionalHover(e) {
      const el = e.currentTarget;
      const tolerance = 10;
      const top = 0;
      const bottom = el.clientHeight;

      let y = e.pageY - el.offsetTop;

      if (y - tolerance < top) {
        y = top;
      }

      if (y + tolerance > bottom) {
        y = bottom;
      }

      el.style.setProperty('--y', `${y}px`);
    }
  }
}
</script>

<style lang="scss">

section#work {
  width: 100%;
  padding-bottom: span(3);
  overflow: hidden;

  .title-block {
    padding-bottom: $space-s;
  }

  ul.work-list {
    @include can-hover {
      li {
        .inner {
          .gutter {
            p {
              &.fs-p3 {
                opacity: 0;
                transition: opacity calc($speed-333 / 2) $ease-out;
              }
            }
          }
        }

        &:hover {
          .inner {
            .backsplash {
              --scale: 1;
            }

            .gutter {
              p {
                &.fs-p3 {
                  opacity: 1;
                  transition: opacity $speed-333 $ease-out;
                }
              }
            }
          }
        }
      }
    }

    li {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;

      &:first-child {
        .inner {
          border-top: 1px solid rgba($black, 0.1);
        }
      }

      &:nth-child(4n-1) {
        .inner {
          .backsplash {
            background-color: $gold;
          }
        }
      }

      &:nth-child(4n-2) {
        .inner {
          .backsplash {
            background-color: $green;
          }
        }
      }

      &:nth-child(4n-3) {
        .inner {
          .backsplash {
            background-color: $purple;
          }
        }
      }

      &:nth-child(4n-4) {
        .inner {
          .backsplash {
            background-color: $orange;
          }
        }
      }

      .inner {
        position: relative;
        border-bottom: 1px solid rgba($black, 0.1);
        overflow: hidden;

        .backsplash {
          display: none;

          @include can-hover {
            --scale: 0;
            @include abs-fill;
            display: flex;
            transform: scaleY(var(--scale));
            transform-origin: 50% var(--y);
            transition: transform $speed-333 $ease-out;
          }
        }

        .gutter {
          position: relative;
          padding: 16px 0;
          display: flex;
          align-items: center;

          p {
            position: relative;
            display: inline-flex;

            &.fs-p3 {
              display: none;
            }
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    padding-bottom: span(2);

    ul.work-list {
      li {
        .inner {
          .gutter {
            padding: 24px 0;

            p {
              width: 50%;

              &.fs-p3 {
                width: 25%;
                display: inline-flex;
              }
            }
          }
        }
      }
    }
  }
}

</style>
