<template>
  <div id="home-page" class="page space-t">
    <HomeHero
      v-if="pageData"
      :video="pageData.heroVideo"
    />
    <HomeOverview
      v-if="pageData"
      :title="pageData.overviewTitle"
      :subtitle="pageData.overviewSubtitle"
      :copy="pageData.overviewSubcopy"
    />
    <HomeWork
      v-if="pageData"
      :title="pageData.workTitle"
      :caseStudies="pageData.caseStudies"
    />
    <HomeCapabilities
      v-if="pageData"
      :title="pageData.capabilitiesTitle"
      :handwriting="pageData.capabilitiesHandwriting"
      :tags="pageData.capabilitiesTags"
      :ctas="[pageData.servicesCTA1, pageData.servicesCTA2]"
    />
    <HomeTeam
      v-if="pageData"
      :title="pageData.teamTitle"
      :members="pageData.members"
    />
    <Footer />
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
const homeQuery = groq`*[(_type == "index")][0]{
  heroVideo,
  overviewTitle,
  overviewSubtitle,
  overviewSubcopy,
  workTitle,
  caseStudies[]-> {
    title,
    slug,
    ctaTags {
      categoryTag->{ tag },
      industryTag->{ tag }
    }
  },
  capabilitiesTitle,
  capabilitiesHandwriting,
  capabilitiesTags[]-> {
    tag
  },
  servicesCTA1 {
    title,
    copy,
    label,
    url
  },
  servicesCTA2 {
    title,
    copy,
    label,
    url
  },
  teamTitle,
  members[] {
    name,
    title,
    image ${imageProps}
  }
}`;
const pageData = await useSanityData({ query: homeQuery });

onMounted(() => {
  if (store.loader) {
    setTimeout(() => {
      store.setLoaderComplete();
    }, 2000);
  }
});
</script>
