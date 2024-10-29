<template>
  <div id="home-page" class="page space-t">
    <Placeholder
      title="Hero [Video]"
      :invert="true"
    />
    <Placeholder
      title="Overview [w/ Amoeba]"
    />
    <Placeholder
      id="work"
      title="Work [List]"
    />
    <Placeholder
      id="capabilities"
      title="Capabilities [List w/ Amoeba]"
    />
    <Placeholder
      id="leadership"
      title="Team [Carousel]"
    />
    <Placeholder
      title="Footer"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    const route = useRoute();
    console.log('MOUNTED', route.fullPath);
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_base.scss";

#home-page {
}

</style>
