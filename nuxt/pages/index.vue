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
      title="Work [List]"
    />
    <Placeholder
      title="Capabilities [List w/ Amoeba]"
    />
    <Placeholder
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
    console.log('MOUNTED');
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/_base.scss";

#home-page {
}

</style>
