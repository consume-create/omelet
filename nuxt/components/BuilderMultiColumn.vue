<template>
  <section class="builder-multi-column pad-bl">
    <div class="gutter">
      <div class="cols" :class="[ `cols-${items.length}` ]">
        <div v-for="(item, index) in items" class="col" :class="[ item.type !== 'textColumn' ? orientation : '', item.type ]" :key="index">
          <div class="inner">
            <ResponsiveImage v-if="item.type === 'singleImage'" v-bind="item.image" />
            <VideoCover v-if="item.type === 'videoLoop'" :vimeo="item.vimeo" :cover="true" />
            <VideoCover v-if="item.type === 'videoPlayer'" :vimeo="item.vimeo" :cover="true" :controls="true" />
            <RichTextContent v-if="item.type === 'textColumn'" :content="item.richtext" />
          </div>
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
  },
  orientation: {
    type: String,
    required: true
  }
});
</script>

<style lang='scss'>
.builder-multi-column {
  position: relative;
  overflow: hidden;

  .cols {
    .col {
      .inner {
        position: relative;
      }

      &:not(:last-child) {
        margin-bottom: $space-s;
      }

      &:not(.textColumn) {
        .inner {
          background-color: $black;
          overflow: hidden;
        }

        &.square {
          .inner {
            aspect-ratio: 1/1;
          }
        }

        &.landscape {
          .inner {
            aspect-ratio: 16/9;
          }
        }

        &.portrait {
          .inner {
            aspect-ratio: 9/16;
          }
        }
      }

      &.textColumn {
        margin-left: calc(#{span(1)} - #{$space-s});
        margin-right: calc(#{span(1)} - #{$space-s});
      }
    }

    // &.cols-2 {
    //   .col.textColumn:nth-child(1) {
    //     margin-bottom: span(2);
    //   }
    //
    //   .col.textColumn:nth-child(2) {
    //     margin-top: span(2);
    //   }
    // }
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
        margin: 0 -10px;
        justify-content: space-between;

        .col {
          width: 50%;

          .inner {
            margin: 0 10px;
          }
        }

        .col.textColumn:nth-child(1) {
          width: calc(50% - #{span(1)});
          margin-left: 0px;
          margin-right: auto;
          margin-bottom: 0px;

          .inner {
            margin: 0 0 0 10px;
          }
        }

        .col.textColumn:nth-child(2) {
          width: calc(50% - #{span(1)});
          margin-left: auto;
          margin-right: 0px;
          margin-top: 0px;

          .inner {
            margin: 0 10px 0 0;
          }
        }
      }

      &.cols-3 {
        margin: 0 -10px;
        justify-content: space-between;

        .col {
          width: 33.333%;

          .inner {
            margin: 0 10px;
          }
        }
      }

      .col {
        &:not(:last-child) {
          margin-bottom: 0px;
        }

        &.textColumn {
          margin-left: 0;
          margin-right: 0;
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
