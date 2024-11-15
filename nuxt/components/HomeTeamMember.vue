<template>
  <div class="inner" :class="{'--hover': state.active}" @click="onMobileClick(index)">
    <div class="image-holder">
      <ResponsiveImage v-bind="member.image" :alt="member.name" />
    </div>
    <p class="fs-p4">{{ member.name }}</p>
    <p class="fs-p4 reg">{{ member.title }}</p>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

// Props
const props = defineProps({
  member: {
    type: Object
  }
});

const state = reactive({
  active: 0
});

// Methods
function onMobileClick(index) {
  if ('ontouchstart' in window) {
    state.active = !state.active;
  }
}
</script>
