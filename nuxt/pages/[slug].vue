<template>
  <div class="case-study-page page">
    <Hero
      :title="pageData.title"
      :slug="pageData.slug.current"
      :subtitle="pageData.subtitle"
      :media="pageData.heroMedia[0]"
    />
    <Footer />
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const route = useRoute();
const store = useSiteStore();
const params = { slug: route.params.slug };
const pageQuery = groq`*[_type == 'caseStudy' && slug.current == $slug][0]{
  title,
  slug,
  subtitle,
  heroMedia[] {
    _type == 'singleImage' => {
      'type': _type,
      image ${imageProps}
    },
    _type == 'videoLoop' => {
      'type': _type,
      vimeo
    }
  }
}`;
const pageData = await useSanityData({ query: pageQuery, params: params });

onMounted(() => {
  console.log(pageData);

  if (store.loader) {
    setTimeout(() => {
      store.setLoaderComplete();
    }, 1000);
  }
})
</script>

<style lang='scss'>
.case-study-page {
}
</style>
