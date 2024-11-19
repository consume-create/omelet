<template>
  <div id="page-mask" />
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
</script>

<style lang='scss'>
#page-mask {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: $white;
  overflow: hidden;
  z-index: 75;

  // Directional transition
  &.slide-left-enter-active,
  &.slide-left-leave-active,
  &.slide-right-enter-active,
  &.slide-right-leave-active {
    transition: transform $speed-666 $evil-ease;
  }

  &.slide-left-enter-from,
  &.slide-right-leave-to {
    transform: translateX(100%);
  }

  &.slide-right-enter-from,
  &.slide-left-leave-to {
    transform: translateX(-100%);
  }

  // Fade transition (from mobile menu)
  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity $speed-666 $evil-ease;
  }

  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;
  }
}
</style>
