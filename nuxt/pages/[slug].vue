<template>
  <div class="case-study-page page">
    <Hero
      :title="pageData.title"
      :slug="pageData.slug.current"
      :subtitle="pageData.subtitle"
      :media="pageData.heroMedia[0]"
    />
    <BuilderTextBlock
      :headline="pageData.overview.headline"
      :richtext="pageData.overview.richtext"
      :tags="pageData.tags"
    />
    <template v-for="(block, index) in pageData.blocks">
      <BuilderTextBlock
        v-if="block.type === 'textBlock'"
        :headline="block.headline"
        :richtext="block.richtext"
      />
      <BuilderPullQuote
        v-if="block.type === 'pullQuote'"
        :quote="block.title"
        :citee="block.citee"
      />
      <BuilderImage
        v-if="block.type === 'singleImage'"
        :image="block.image"
      />
      <BuilderVideo
        v-if="block.type === 'videoLoop'"
        :vimeo="block.vimeo"
        :controls="false"
      />
      <BuilderVideo
        v-if="block.type === 'videoPlayer'"
        :vimeo="block.vimeo"
        :controls="true"
      />
      <BuilderCarousel
        v-if="block.type === 'carousel'"
        :slides="block.slides"
      />
      <BuilderMediaGrid
        v-if="block.type === 'mediaGrid'"
        :items="block.items"
      />
      <BuilderMultiColumn
        v-if="block.type === 'multiColumn'"
        :items="block.items"
      />
      <BuilderStats
        v-if="block.type === 'stats'"
        :stats="block.items"
      />
    </template>
    <UpNext
      :cta="getNextCta"
    />
    <Footer />
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import { findIndex as _findIndex } from 'lodash';

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
  },
  overview {
    headline,
    richtext
  },
  tags[]-> {
    tag
  },
  blocks[] {
    _type == 'textBlock' => {
      'type': _type,
      headline,
      richtext
    },
    _type == 'pullQuote' => {
      'type': _type,
      title,
      citee
    },
    _type == 'singleImage' => {
      'type': _type,
      image ${imageProps}
    },
    _type == 'videoLoop' => {
      'type': _type,
      vimeo
    },
    _type == 'videoPlayer' => {
      'type': _type,
      vimeo
    },
    _type == 'carousel' => {
      'type': _type,
      slides[] {
        _type == 'singleImage' => {
          'type': _type,
          image ${imageProps}
        },
        _type == 'videoLoop' => {
          'type': _type,
          vimeo
        },
        _type == 'videoPlayer' => {
          'type': _type,
          vimeo
        }
      }
    },
    _type == 'mediaGrid' => {
      'type': _type,
      items[] {
        _type == 'singleImage' => {
          'type': _type,
          image ${imageProps}
        },
        _type == 'videoLoop' => {
          'type': _type,
          vimeo
        }
      }
    },
    _type == 'multiColumn' => {
      'type': _type,
      items[] {
        _type == 'singleImage' => {
          'type': _type,
          image ${imageProps}
        },
        _type == 'videoLoop' => {
          'type': _type,
          vimeo
        },
        _type == 'textColumn' => {
          'type': _type,
          richtext
        },
      }
    },
    _type == 'stats' => {
      'type': _type,
      items[] {
        title,
        copy
      }
    },
  }
}`;
const pageData = await useSanityData({ query: pageQuery, params: params });

// Computed
const getNextCta = computed(() => {
  const current_index = _findIndex(store.case_studies, {'slug': route.params.slug});
  const next_case_study = current_index < store.case_studies.length - 1 ? store.case_studies[current_index + 1] : store.case_studies[0];

  return next_case_study;
});

onMounted(() => {
  if (store.loader) {
    setTimeout(() => {
      store.setLoaderComplete();
    }, 1800);
  }
})
</script>

<style lang='scss'>
.case-study-page {
}
</style>
