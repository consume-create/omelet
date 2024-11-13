<template>
  <section class="builder-mulit-column pad-bl">
    <div class="gutter">
      <div class="cols" :class="[ `cols-${items.length}` ]">
        <div v-for="(item, index) in items" class="col" :class="[ item.type ]" :key="index">
          <ResponsiveImage v-if="item.type === 'singleImage'" v-bind="item.image" :alt="item.image.filename" />
          <VideoCover v-if="item.type === 'videoLoop'" :vimeo="item.vimeo" :cover="true" />
          <RichTextContent v-if="item.type === 'textColumn'" :content="item.richtext" />
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
.builder-mulit-column {
  position: relative;
  overflow: hidden;

  .cols {
    .col {
      width: 100%;

      &:not(:last-child) {
        margin-bottom: $space-s;
      }

      &:not(.textColumn) {
        position: relative;
        aspect-ratio: 1/1;
        background-color: $black;
        overflow: hidden;
      }
    }
  }

  @include respond-to($tablet) {
    .cols {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      &.cols-1 {
        .col {
          width: 50%;
          margin: 0 auto;
        }
      }

      &.cols-2 {
        justify-content: space-between;

        .col {
          width: calc(50% - 10px);
        }

        .col.singleImage,
        .col.videoLoop {
          width: calc(50%);
        }

        .col.textColumn:nth-child(1) {
          width: calc(50% - #{span(1)});
          margin-right: auto;
        }

        .col.textColumn:nth-child(2) {
          width: calc(50% - #{span(1)});
          margin-left: auto;
        }
      }

      &.cols-3 {
        justify-content: space-between;

        .col {
          width: calc(33.333% - 10px);
        }
      }

      .col {
        &:not(:last-child) {
          margin-bottom: 0px;
        }
      }
    }
  }

  @include respond-to($average-desktop) {
    .gutter {
      margin: 0 span(1);
    }
  }

  @include respond-to($macbook) {
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
