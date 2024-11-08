<template>
  <section id="capabilities" class="pad-t">
    <div class="title-block gutter">
      <h3 class="pre pad-b">We kind of<br>do it all</h3>
    </div>
    <div class="blocks">
      <div class="shape">
        <img src="/images/capabilities-shape.png" alt="Advertising, not breakfast" />
      </div>
      <ul class="capabilities-list">
        <li v-for="item in items">
          <p class="fs-p2">{{ item }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const items = [
  'Brand Strategy',
  'Communications Strategy',
  'Social & Influencer Strategy',
  'Research/Analysis',
  'Integrated Campaigns',
  'Digital Platforms',
  'Shared Value Storytelling',
  'Original Content',
  'Film',
  'Social Content',
  'Digital',
  'Experimental'
]
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
  }


  @include respond-to($small-tablet) {
    .blocks {
      ul.capabilities-list {
        margin: 0 span(1) 0 span(2);
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

        li {
          margin-top: 0px;
          margin-bottom: $space-s;
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .blocks {
      ul.capabilities-list {
        margin: 0 span(1) 0 span(5);
      }
    }
  }

  @include respond-to($desktop) {
    .blocks {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: space-between;

      .shape {
        order: 1;
        width: span(5.5);
        margin: 0 0 0 $space-l;

        img {
          max-width: 600px;
        }
      }

      ul.capabilities-list {
        order: 2;
        width: span(7);
        margin: 0 span(1) 0 0;
      }
    }
  }
}
</style>
