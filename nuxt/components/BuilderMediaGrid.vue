<template>
  <section class="builder-media-grid pad-bl">
    <div class="gutter">
      <div class="grid">
        <div v-for="(item, index) in items" class="grid-item" :key="index">
          <ResponsiveImage v-if="item.type === 'singleImage'" v-bind="item.image" :alt="item.image.filename" />
          <VideoCover v-if="item.type === 'videoLoop'" :vimeo="item.vimeo" :cover="true" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
// Props
const props = defineProps({
  items: {
    type: Array
  }
});
</script>

<style lang='scss'>
.builder-media-grid {
  position: relative;
  overflow: hidden;

  .grid {
    .grid-item {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      background-color: $black;
      overflow: hidden;

      &:first-child {
        aspect-ratio: 4/5;
      }

      &:not(:last-child) {
        margin-bottom: $space-s;
      }
    }
  }

  @include respond-to($small-tablet) {
    .grid {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .grid-item {
        width: calc(50% - 5px);
        margin-left: calc(50% + 5px);
        display: flex;
        flex-shrink: 0;

        &:nth-child(1) {
          position: absolute;
          top: 0px;
          left: 0px;
          height: 100%;
          margin-left: 0px;
          aspect-ratio: auto;
        }
      }
    }
  }

  @include respond-to($tablet) {
    .grid {
      .grid-item {
        width: calc(50% - 10px);
        margin-left: calc(50% + 10px);

        &:not(:last-child) {
          margin-bottom: $space-m;
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .gutter {
      margin: 0 span(1);
    }
  }

  @include respond-to($desktop) {
    .gutter {
      margin: 0 span(2);
    }
  }

  @include respond-to($retina-macbook) {
    .gutter {
      margin: 0 span(2.5);
    }
  }
}
</style>
