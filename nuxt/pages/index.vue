<template>
  <div id="home-page" class="page space-t">
    <Hero />
    <Overview />
    <Work />
    <Capabilities />
    <Placeholder
      id="leadership"
      title="Team [Carousel]"
    />
    <Footer />
  </div>
</template>

<script>
import { typeFilter, imageProps } from '~/utils/groq-common';
import Hero from '~/components/home/Hero.vue';
import Overview from '~/components/home/Overview.vue';
import Work from '~/components/home/Work.vue';
import Capabilities from '~/components/home/Capabilities.vue';
import Placeholder from '~/components/shared/Placeholder.vue';
import Footer from '~/components/shared/Footer.vue';

export default {
  components: {
    Hero,
    Overview,
    Work,
    Capabilities,
    Placeholder,
    Footer
  },
  async asyncData() {
    const indexQuery = groq` {
      'index': ${typeFilter('index')} {
        'heroImage': heroImage.asset->url
      }
    }`;
    const { data } = await useSanityQuery(indexQuery);
    const home_data = data.value.index;

    console.log('HD:::', home_data);
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_base.scss";

#home-page {
}

</style>
