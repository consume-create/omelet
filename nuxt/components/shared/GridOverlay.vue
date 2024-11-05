<template>
  <div id="grid-overlay" v-if="isActive">
    <div
      class="grid-line"
      v-for="i in 15"
      :key="i"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    onKeydown(e) {
      if (e.key === 'g') {
        this.isActive = !this.isActive;
      }
    }
  }
};
</script>

<style lang="scss">

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
    background-color: rgba(#FF0000, 35%);

    &:first-child,
    &:last-child {
      background-color: rgba(#3333ff, 35%);
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
