<template>
  <div id="home-page" class="page space-t">
    <Hero />
    <Overview v-if="pageData" :title="pageData.overviewTitle" />
    <Work />
    <Capabilities />
    <Team />
    <Footer />
  </div>
</template>

<script setup>
const homeQuery = groq`*[(_type == "index")][0]{
  overviewTitle,
  heroImage ${imageProps},
  heroVideo
}`;
const pageData = await useSanityData({ query: homeQuery });
</script>
