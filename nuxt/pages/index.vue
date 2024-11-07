<template>
  <div id="home-page" class="page space-t">
    <Hero />
    <Overview :title="data ? data.overviewTitle : null" />
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
  data() {
    return {
      data: null,
      error: null,
      loading: true
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.data = null;
      this.loading = true;

      useSanity().fetch(pageQuery).then(
        (data) => {
          this.loading = false;
          this.data = data.index;
          console.log(this.data.heroVideo);
        },
        (error) => {
          this.error = error;
        }
      );
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_base.scss";

#home-page {
}

</style>
