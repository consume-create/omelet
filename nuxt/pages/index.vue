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

<script setup>
const data = await useSanityData({
  query: groq` {
    'index': ${typeFilter('index')} {
      overviewTitle,
      heroImage ${imageProps},
      heroVideo
    }
  }`
});
const page_data = data.value.index;
</script>

<style lang='scss'>
@import "@/assets/styles/_base.scss";

#home-page {
}

</style>
