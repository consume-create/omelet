<template>
  <div id="home-page" class="page space-t">
    <Hero />
    <!-- <Overview :title="page_data.overviewTitle" /> -->
    <Work />
    <Capabilities />
    <Team />
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const page_data = ref(null);

async function fetchData() {
  const resp = await useSanityData({
    query: groq` {
      'index': ${typeFilter('index')} {
        overviewTitle,
        heroImage ${imageProps},
        heroVideo
      }
    }`
  });
  console.log(resp);

  page_data.value = resp.value.index;
};

fetchData();
</script>

<style lang='scss'>
@import "@/assets/styles/_base.scss";

#home-page {
}

</style>
