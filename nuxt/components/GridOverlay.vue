<template>
  <div id="grid-overlay" v-if="enabled">
    <div
      class="grid-line"
      v-for="i in 15"
      :key="i"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const enabled = ref(null);

// Mounted
onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

// Before Unmount
onBeforeMount(() => {
  window.removeEventListener('keydown', onKeydown);
});

// Methods
function onKeydown(e) {
  if (e.key === 'g') {
    enabled.value = !enabled.value;
  }
};
</script>

<style lang='scss'>
#grid-overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  width: span(14);
  height: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 200;

  .grid-line {
    width: 1px;
    height: 100%;
    background-color: rgba(#FF0000, 13%);

    &:first-child,
    &:last-child {
      background-color: rgba(#3333ff, 13%);
    }

    &:first-child {
      transform: translateX(#{$space-s});
    }

    &:last-child {
      transform: translateX(-#{$space-s});
    }
  }

  @include respond-to($tablet) {
    .grid-line {
      &:first-child {
        transform: translateX(#{$space-m});
      }

      &:last-child {
        transform: translateX(-#{$space-m});
      }
    }
  }

  @include respond-to($large-tablet) {
    .grid-line {
      &:first-child {
        transform: translateX(#{$space-l});
      }

      &:last-child {
        transform: translateX(-#{$space-l});
      }
    }
  }
}
</style>
