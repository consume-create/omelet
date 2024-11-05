<template>
  <div id="home-page" class="page space-t">
    <Hero />
    <Overview />
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

export default {
  components: {
    Hero,
    Overview,
    Work,
    Capabilities,
    Team,
    Footer
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_base.scss";

#home-page {
}

</style>
