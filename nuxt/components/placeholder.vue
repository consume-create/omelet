<template>
  <section class="placeholder pad-b" :class="{'--invert': invert}">
    <div class="gutter">
      <p class="fs-p1">{{ title }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Placeholder'
    },
    invert: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="scss">

.placeholder {
  &.--invert {
    .gutter {
      border: none;
      background-color: $black;
      color: $white;
    }
  }

  .gutter {
    height: 50vh;
    min-height: 300px;
    max-height: 600px;
    border: 1px dashed $black;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>
