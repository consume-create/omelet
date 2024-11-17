<template>
  <div id="loader" ref="loader">
    <div class="gutter pad-t">
      <span id="loader-text">
        <span>O</span><span>M</span><span>E</span><span>L</span><span>E</span><span>T</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore(),
      loader = ref(null);

onMounted(() => {
  setTimeout(() => {
    loader.value.classList.add('appear');
  }, 27);
});
</script>

<style lang='scss'>
#loader {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: $white;
  overflow: hidden;
  z-index: 500;

  #loader-text {
    display: block;
    overflow: hidden;
    font-size: 0px;
    color: transparent;
    aspect-ratio: 720 / 140;

    span {
      position: relative;
      display: inline-block;
      height: 100%;
      overflow: hidden;
      transform: translate(0, -100%);

      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        aspect-ratio: 720 / 140;
        @include omelet-logo($black);
      }

      &:nth-child(1) {
        width: 19.85%;
        background-position: 0% 0%;
        transition: transform 1s cubic-bezier(0.075, 0.820, 0.165, 1.000);
      }

      &:nth-child(2) {
        width: 23.2%;
        transition: transform 1s 111ms cubic-bezier(0.075, 0.820, 0.165, 1.000);

        &:after {
          transform: translate(-19.85%, 0);
        }
      }

      &:nth-child(3) {
        width: 13.8%;
        transition: transform 1s 222ms cubic-bezier(0.075, 0.820, 0.165, 1.000);

        &:after {
          transform: translate(-43.05%, 0);
        }
      }

      &:nth-child(4) {
        width: 12.8%;
        transition: transform 1s 333ms cubic-bezier(0.075, 0.820, 0.165, 1.000);

        &:after {
          transform: translate(-56.85%, 0);
        }
      }

      &:nth-child(5) {
        width: 14%;
        transition: transform 1s 444ms cubic-bezier(0.075, 0.820, 0.165, 1.000);

        &:after {
          transform: translate(-69.65%, 0);
        }
      }

      &:nth-child(6) {
        width: 16.35%;
        transition: transform 1s 555ms cubic-bezier(0.075, 0.820, 0.165, 1.000);

        &:after {
          transform: translate(-83.65%, 0);
        }
      }
    }
  }

  &.appear {
    #loader-text {
      span {
        transform: translate(0, 0);
      }
    }
  }

  &.loading-leave-from {
    transform: scale(1, 1);

    #loader-text {
      span {
        transform: translate(0, 0);
      }
    }
  }

  &.loading-leave-active {
    transition: transform $speed-666 1.333s $evil-ease;
    transform-origin: 0 100%;

    #loader-text {
      span {
        @for $i from 1 through 6 {
          &:nth-child(#{$i}) {
            transition: transform $speed-666 #{666 - ($i * 111)}ms cubic-bezier(0.600, 0.040, 0.980, 0.335);
          }
        }
      }
    }
  }

  &.loading-leave-to {
    transform: scale(1, 0);

    #loader-text {
      span {
        transform: translate(0, 100%);
      }
    }
  }
}
</style>
