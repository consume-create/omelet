<template>
  <section id="home-hero-section">
    <div class="gutter">
      <div id="home-hero-media">
        <img src="/images/hero-fpo.jpg" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">

section#home-hero-section {
  margin-bottom: span(1);

  #home-hero-media {
    position: relative;
    width: 100%;
    aspect-ratio: 7/6;
    background-color: $black;
    overflow: hidden;
    display: flex;

    img,
    video {
      opacity: 0.4;
      @include abs-fill;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  @include respond-to($landscape) {
    #home-hero-media {
      aspect-ratio: auto;
      height: calc(100vh - #{$header-height} - #{$space-s});
    }

    @include respond-to($tablet) {
      #home-hero-media {
        height: calc(100vh - #{$header-height} - #{$space-m});
      }
    }

    @include respond-to($large-tablet) {
      #home-hero-media {
        height: calc(100vh - #{$header-height} - #{$space-l});
      }
    }
  }
}

</style>
