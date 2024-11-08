<template>
  <div id="home-page" class="page space-t">
    <Hero />
    <Overview :title="page_data ? page_data.overviewTitle : ''" />
    <Work />
    <Capabilities />
    <Team />
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue';
import Hero from '~/components/home/Hero.vue';
import Overview from '~/components/home/Overview.vue';
import Work from '~/components/home/Work.vue';
import Capabilities from '~/components/home/Capabilities.vue';
import Team from '~/components/home/Team.vue';
import Footer from '~/components/shared/Footer.vue';

const pageQuery = groq` {
  'index': ${typeFilter('index')} {
    overviewTitle,
    heroVideo
  }
}`;

export default {
  components: {
    Hero,
    Overview,
    Work,
    Capabilities,
    Team,
    Footer
  },
  setup() {
    const page_data = ref([]);
    (async () => {
      const pageQuery = groq` {
        'index': ${typeFilter('index')} {
          overviewTitle,
          heroImage ${imageProps},
          heroVideo
        }
      }`;
      const response = await useSanityQuery(pageQuery);
      page_data.value = response.data.value.index;
    })();

    return {
      page_data
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_base.scss";

#home-page {
}

</style>
