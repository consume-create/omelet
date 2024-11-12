<template>
  <section id="capabilities" class="pad-t">
    <div class="title-block gutter">
      <h3 class="pre pad-b">{{ title }}</h3>
    </div>
    <div class="blocks">
      <div class="shape">
        <img src="/images/capabilities-shape.png" alt="Advertising, not breakfast" />
      </div>
      <ul class="capabilities-list">
        <li v-for="item in tags">
          <p class="fs-p2">{{ item.tag }}</p>
        </li>
      </ul>
      <div class="cta-blocks">
        <div v-for="cta in ctas" class="cta-block">
          <p class="fs-p2">{{ cta.title }}</p>
          <p class="fs-p4 reg">{{ cta.copy }}</p>
          <NuxtLink class="nav-a1" :to="cta.url" target="_blank">+ {{ cta.label }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String
  },
  handwriting: {
    type: String
  },
  tags: {
    type: Array
  },
  ctas: {
    type: Array
  }
});
</script>

<style lang='scss'>
section#capabilities {
  width: 100%;
  padding-bottom: span(3);
  overflow: hidden;

  .title-block {
    padding-bottom: $space-s;
  }

  .blocks {
    display: flex;
    flex-direction: column;

    .shape {
      order: 2;
      margin: span(1) span(3) 0 span(1);

      img {
        width: 100%;
        max-width: 480px;
        display: flex;
      }
    }

    ul.capabilities-list {
      order: 1;
      margin: 0 span(1) 0 span(3);

      li {
        margin-top: $space-s;
      }
    }

    .cta-blocks {
      order: 3;
      margin: $space-l span(1) 0 span(3);
      border-top: 2px solid $ash;

      .cta-block {
        margin-top: $space-l;

        .fs-p4 {
          margin: $space-s 0;
        }
      }
    }
  }

  @include respond-to($small-tablet) {
    .blocks {
      ul.capabilities-list {
        margin: 0 span(1) 0 span(2);
      }

      .cta-blocks {
        margin: $space-l span(3) 0 span(3);
      }
    }
  }

  @include respond-to($tablet) {
    padding-bottom: span(2);

    .blocks {
      .shape {
        margin: $space-l span(3) 0 span(1);
      }

      ul.capabilities-list {
        margin: 0 span(1) 0 span(3);
        column-count: 2;
        column-gap: 0px;

        li {
          margin-top: 0px;
          margin-bottom: $space-s;
        }
      }

      .cta-blocks {
        margin: $space-l span(1) 0 span(3);
        display: flex;
        flex-wrap: nowrap;

        .cta-block {
          width: 50%;
          flex-shrink: 0;

          .fs-p4 {
            margin: $space-m 0 $space-s;
          }
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .blocks {
      ul.capabilities-list {
        margin: 0 span(1) 0 span(5);
      }

      .cta-blocks {
        margin: $space-l span(1) 0 span(5);
      }
    }
  }

  @include respond-to($desktop) {
    .blocks {
      display: grid;
      grid-template-areas: "A B" "A C";

      .shape {
        order: 0;
        width: span(5.5);
        margin: 0 auto 0 $space-l;
        grid-area: A;

        img {
          max-width: 600px;
        }
      }

      ul.capabilities-list {
        order: 0;
        width: span(7);
        margin: 0 span(1) 0 auto;
        grid-area: B;
      }

      .cta-blocks {
        order: 0;
        width: span(7);
        margin: 0 span(1) 0 auto;
        grid-area: C;

        .cta-block {
          margin-top: $space-xxl;
        }
      }
    }
  }
}
</style>
