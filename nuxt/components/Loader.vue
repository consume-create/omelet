<template>
  <div id="loader">
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
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

  &.loader-enter-active,
  &.loader-leave-active {
    transition: opacity $speed-666 $evil-ease;
  }

  &.loader-enter-from,
  &.loader-leave-to {
    opacity: 0;
  }
}
</style>
