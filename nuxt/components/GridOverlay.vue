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
  onBeforeUnmount() {
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
      width: 0px;
    }
  }
}
</style>
