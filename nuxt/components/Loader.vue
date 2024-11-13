<template>
  <div id="loader" ref="loader">
    <span id="loader-text">
      <span>O</span><span>M</span><span>E</span><span>L</span><span>E</span><span>T</span>
    </span>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore(),
      loader = ref(null);

onMounted(() => {
  loader.value.classList.add('appear');
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
    font: normal normal normal 26.83vw/1em $poppins-extra-bold;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: -0.04em;

    span {
      display: inline-block;
      transform: translate(0, -100%);

      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          transition: transform 1s #{$i * 111}ms cubic-bezier(0.075, 0.820, 0.165, 1.000);
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

  &.loader-leave-from {
    transform: scale(1, 1);

    #loader-text {
      span {
        transform: translate(0, 0);
      }
    }
  }

  &.loader-leave-active {
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

  &.loader-leave-to {
    transform: scale(1, 0);

    #loader-text {
      span {
        transform: translate(0, 100%);
      }
    }
  }
}
</style>
