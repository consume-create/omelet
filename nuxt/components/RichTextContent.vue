<template>
  <div v-if="content" class="richtext fs-p3" v-html="toHTML(content, {components: richTextComponents})" />
</template>

<script setup>
import { toHTML, uriLooksSafe } from '@portabletext/to-html';

const props = defineProps({
  content: {
    type: Array
  }
});
const richTextComponents = {
  marks: {
    link: ({children, value}) => {
      const href = value.href || '';

      if (uriLooksSafe(href)) {
        const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
        const target = value.blank ? '_blank' : '_self';
        return `<a href="${href}" rel="${rel}" target="${target}">${children}</a>`;
      } else {
        return children;
      }
    }
  }
}
</script>
