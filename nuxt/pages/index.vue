<template>
  <div id="home-page" class="page space-t">
    <Hero />
    <Overview :title="data.overviewTitle" />
    <Work />
    <Capabilities />
    <Team />
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const homeQuery = groq`*[(_type == "index")][0]{
  overviewTitle,
  heroImage ${imageProps},
  heroVideo
}`;
const data = await useSanityData({ query: homeQuery });
</script>

<style lang='scss'>
@import "@/assets/styles/_base.scss";

#home-page {
}

</style>
