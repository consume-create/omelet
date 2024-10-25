<template>
  <header>
    <div class="gutter">
      <NuxtLink class="logo" to="/">Omelet</NuxtLink>
      <h1><strong>A Creative Agency</strong><br>based in Los Angeles</h1>
    </div>
  </header>
</template>

<style lang="scss">

header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: $white;
  overflow: hidden;
  z-index: 100;

  .gutter {
    height: 60px;
    display: flex;
    align-items: center;

    .logo {
      width: 122px;
      height: 24px;
      font-size: 0px;
      color: transparent;
      overflow: hidden;
      @include omelet-logo($black);
      display: inline-flex;
    }

    h1 {
      margin-left: span(1)
    }
  }
}

</style>
