<template>
  <section id="overview">
    <div class="title-block gutter">
      <h2 class="pad-t pre">{{ title }}</h2>
    </div>
    <div class="shape">
      <img src="/images/overview-shape.png" />
    </div>
    <div class="text-block">
      <h3>We’re an impact-driven creative agency.</h3>
      <div class="copy fs-p3">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium purus et ex dapibus tempor. Sed a sagittis ipsum, at tempus enim. Sed maximus cursus rutrum.</p>
        <p>Sed imperdiet felis at magna efficitur aliquam. Nulla fermentum eleifend augue. Curabitur dapibus nisi ut commodo vestibulum.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss">

section#overview {
  width: 100%;
  padding-bottom: span(3);
  overflow: hidden;

  .title-block {
    margin-bottom: $space-l;
    display: flex;
  }

  .shape {
    margin: 0 span(1);
    display: flex;

    img {
      width: 100%;
      max-width: 750px;
      margin: 0 auto;
      height: auto;
      display: flex;
    }
  }

  .text-block {
    margin: $space-l span(1) 0px span(3);
    display: flex;
    flex-direction: column;

    .copy {
      p {
        margin-top: $space-m;
      }
    }
  }

  @include respond-to($tablet) {
    padding-bottom: span(2);

    .shape {
      margin-top: -$space-xxl;

      img {
        width: 75%;
      }
    }

    .text-block {
      margin: $space-l span(1) 0px span(6);
    }
  }

  @include respond-to($large-tablet) {
    .text-block {
      margin: $space-l span(1) 0px span(7);
    }
  }

  @include respond-to($average-desktop) {
    .text-block {
      margin: 0px span(1) 0px span(8);
    }
  }
}

</style>
