<template>
  <section id="capabilities-section" class="pad-t">
    <div class="title-block gutter">
      <h3 class="pre pad-b">{{ title }}</h3>
    </div>
    <div class="blocks">
      <div class="shape">
        <div class="inner">
          <div class="content">
            <img inert src="/images/capabilities-shape.png" :alt="handwriting" />
            <p class="fs-t2 pre" v-html="formatLines" />
          </div>
        </div>
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
          <NuxtLink class="nav-a1" :to="cta.url" target="_blank">{{ cta.label }}</NuxtLink>
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

// Computed
const formatLines = computed(() => {
  const lines = props.handwriting.split('\n');
  let html = '';
  lines.forEach((line, index) => {
    html += `<span>${line}</span>`;
  });

  return html;
});
</script>

<style lang='scss'>
section#capabilities-section {
  width: 100%;
  padding-bottom: span(2.5);
  overflow: hidden;

  .title-block {
    padding-bottom: $space-s;
  }

  .blocks {
    display: flex;
    flex-direction: column;

    .shape {
      position: relative;
      order: 2;
      margin: span(1) span(3) 0 span(1);

      .inner {
        position: relative;
        width: 100%;
        max-width: 480px;

        .content {
          position: relative;
          width: 100%;

          img {
            width: 100%;
            display: flex;
          }

          p {
            position: absolute;
            top: 50%;
            left: 50%;
            color: $green;
            text-align: center;
            display: flex;
            flex-direction: column;
            transform: rotate(-4deg) translateX(-60%) translateY(-60%);

            span {
              white-space: nowrap;
              display: flex;
            }

            @include respond-to($small-tablet) {
              transform: rotate(-4deg) translateX(-64%) translateY(-60%);
            }

            @include respond-to($tablet) {
              transform: rotate(-4deg) translateX(-66%) translateY(-66%);
            }
          }
        }
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

        a {
          display: inline-flex;
          align-items: center;

          &:before {
            content: '+\00a0';
            display: inline-flex;
          }
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
    padding-bottom: span(1.5);

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

        .inner {
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
