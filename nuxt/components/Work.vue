<template>
  <section id="work" class="pad-t">
    <div class="title-block gutter">
      <h3 class="pad-b">Work</h3>
    </div>
    <div class="work-list" @mouseenter="getEdgeDirection" @mouseleave="getEdgeDirection">
      <div v-for="(item, index) in projects" class="list-item" @mouseenter="onMouseenterListItem(index)" :key="index">
        <div class="inner">
          <div class="gutter">
            <p class="fs-p1">{{ item.title }}</p>
            <p class="fs-p3">Brand Campaign</p>
            <p class="fs-p3">Entertainment</p>
          </div>
        </div>
      </div>
      <div :class="`backsplash bg-${color}`" :style="{'transform': `translateY(${translate_y}%) scaleY(${scale_y})`, 'transformOrigin': `50% ${origin_y}%`}" />
    </div>
  </section>
</template>

<script>
import { useStore } from '~/stores/store';

export default {
  data() {
    const colors_arr = ['gold', 'green', 'orange', 'purple'];

    return {
      translate_y: 0,
      scale_y: 0,
      origin_y: 0,
      colors: colors_arr,
      color: colors_arr[0],
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
    getEdgeDirection(e) {
      const dir = e.type === 'mouseenter' ? 1 : 0;
      const rect = e.currentTarget.getBoundingClientRect();
      const mouse_x = e.clientX;
      const mouse_y = e.clientY;
      const top = Math.abs(rect.top - mouse_y);
      const bottom = Math.abs(rect.bottom - mouse_y);
      const left = Math.abs(rect.left - mouse_x);
      const right = Math.abs(rect.right - mouse_x);
      const min = Math.min(top, bottom, left, right);

      this.scale_y = dir;

      if (min === top) {
        this.origin_y = 0;
      } else if (min == bottom) {
        this.origin_y = 100;
      } else {
        this.origin_y = 50;
      }
    },
    onMouseenterListItem(index) {
      this.translate_y = index * 100;
      this.color = this.colors[index % 4];
    }
  }
}
</script>

<style lang='scss'>
section#work {
  width: 100%;
  padding-bottom: span(3);
  overflow: hidden;

  .title-block {
    padding-bottom: $space-s;
  }

  .work-list {
    position: relative;

    .backsplash {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 12.5%;
      pointer-events: none;
      transform-origin: 50% 0%;
      transform: translateY(0%) scaleY(0);
      transition: background-color $speed-333 $ease-out, transform $speed-333 $ease-out;
      will-change: background-color transform;

      &:before,
      &:after, {
        content: '';
        position: absolute;
        top: 100%;
        left: 0px;
        width: 100%;
        height: 3px;
        margin-top: -1px;
        background-color: inherit;
      }

      &:before {
        top: 0px;
        margin-top: -2px;
      }
    }

    @include can-hover {
      .list-item {
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

    .list-item {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid $ash;
      overflow: hidden;

      &:first-child {
        border-top: 1px solid $ash;
      }

      .inner {
        position: relative;
        padding: 16px 0;
        overflow: hidden;
        z-index: 1;

        .gutter {
          position: relative;
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

    .work-list {
      .list-item {
        .inner {
          padding: 24px 0;

          .gutter {
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
