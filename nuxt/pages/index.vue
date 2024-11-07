<template>
  <div id="home-page" class="page space-t">
    <Hero />
    <Overview :title="page_data.overviewTitle" />
    <Work />
    <Capabilities />
    <Team />
    <Footer />
  </div>
</template>

<script>
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
  async setup() {
    const pageQuery = groq` {
      'index': ${typeFilter('index')} {
        overviewTitle,
        heroImage ${imageProps},
        heroVideo
      }
    }`;
    let page_data = null;
    const response = await useSanityQuery(pageQuery);
    page_data = response.data.value.index;

    return {
      page_data
    }
  },
  mounted() {
    console.log('MOUNTED:', this.page_data.heroVideo.vimeo);
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_base.scss";

#home-page {
}

</style>
