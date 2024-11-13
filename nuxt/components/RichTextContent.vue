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
        return `<a href="${href}" rel="${rel}" target="_blank">${children}</a>`;
      } else {
        return children;
      }
    }
  }
}
</script>

<style lang='scss'>
.richtext {
  a {
    text-decoration: underline;
    text-decoration-color: inherit;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
    cursor: pointer;
  }

  p {
    &:not(:first-child) {
      margin-top: 1.5em;
    }
  }
}
</style>
