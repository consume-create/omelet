<template>
  <section id="capabilities" class="pad-t">
    <div class="title-block gutter">
      <h3 class="pre pad-b">We kind of<br>do it all</h3>
    </div>
    <ul class="capabilities-list">
      <li v-for="item in items">
        <p class="fs-p2">{{ item }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
import { useStore } from '~/stores/store';

export default {
  data() {
    return {
      items: [
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
    }
  }
}
</script>

<style lang="scss">

section#capabilities {
  width: 100%;
  padding-bottom: span(3);
  overflow: hidden;

  .title-block {
    padding-bottom: $space-s;
  }

  ul.capabilities-list {
    margin: 0 span(1) 0 span(3);

    li {
      margin-top: $space-s;
    }
  }

  @include respond-to($small-tablet) {
    ul.capabilities-list {
      margin: 0 span(1) 0 span(2);
    }
  }

  @include respond-to($tablet) {
    padding-bottom: span(2);

    ul.capabilities-list {
      margin: 0 span(1) 0 span(3);
      column-count: 2;

      li {
        margin-top: 0px;
        margin-bottom: $space-s;
      }
    }
  }

  @include respond-to($large-tablet) {
    ul.capabilities-list {
      margin: 0 span(1) 0 span(5);
    }
  }

  @include respond-to($desktop) {
    ul.capabilities-list {
      margin: 0 span(1) 0 span(6);
    }
  }
}

</style>
