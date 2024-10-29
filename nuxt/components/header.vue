<template>
  <header :class="{'--hidden': hidden, '--shield': shield_mode, '--dark-mode': store.dark_mode, '--menu-mode': store.menu_open}" v-scroll-lock="store.menu_open">
    <div class="inner">
      <NuxtLink class="logo marg-l" to="/">Omelet</NuxtLink>
      <h1><strong>A Creative Agency</strong><br>based in Los Angeles</h1>
      <div id="menu-btn" class="marg-r" @click="store.setMenuOpen()">
        <span />
        <span />
      </div>
      <nav id="primary-nav">
        <NuxtLink v-for="item in store.site_nav" class="nav-item nav-a1" :to="{ hash: `#section-${item.id}` }">{{ item.label }}</NuxtLink>
        <NuxtLink class="icon --contact" to="mailto:hello@omelet.com" target="_blank"></NuxtLink>
        <div class="icon --accessibility marg-r"></div>
      </nav>
    </div>
  </header>
</template>

<script>
import { useStore } from '~/stores/store';

export default {
  data() {
    return {
      store: useStore(),
      menu_mode: false,
      event_horizon: 0,
      diff_scroll: 0,
      last_scroll: 0,
      hidden: false,
      shield_mode: false,
      scrolling_cb: false
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);

    this.onResize();
    this.onScroll();
  },
  onBeforeUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onResize() {
      if (window.innerWidth >= 768 && this.store.menu_open) {
        this.store.setMenuOpen();
      }
    },
    onScroll() {
      this.event_horizon = window.pageYOffset;
      clearTimeout(this.scrolling_cb);

      if (this.event_horizon <= 1) {
        this.shield_mode = false;
        this.hidden = false;
      } else {
        this.shield_mode = true;

        if (this.event_horizon - this.last_scroll >= 0) {
          this.diff_scroll = 0;
          this.hidden = true;
        } else {
          this.diff_scroll = this.diff_scroll + 1;
          if (this.diff_scroll >= 1) {
            this.hidden = false;
          }

          this.scrolling_cb = setTimeout(() => {
            this.diff_scroll = 0;
          }, 50);
        }
      }

      this.last_scroll = this.event_horizon;
    }
  }
}
</script>

<style lang="scss">

header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  overflow: hidden;
  z-index: 100;
  transform: translateY(0%);
  transition: transform $speed-666 $evil-ease, color $speed-666 $evil-ease;

  &.--dark-mode {
    color: $white;

    &:before {
      background-color: $black;
    }

    .inner {
      .logo {
        @include omelet-logo($white);
      }

      nav#primary-nav {
        .icon {
          &.--contact {
            @include icon-mail($white);
          }

          &.--accessibility {
            @include icon-accessibility($white);
          }
        }
      }
    }
  }

  &.--hidden {
    transform: translateY(-100%);
  }

  &.--shield {
    &:before {
      transform: translateY(0%);
    }
  }

  &.--menu-mode {
    transform: translateY(0%);
  }

  &:before {
    content: '';
    @include abs-fill;
    background-color: $white;
    overflow: hidden;
    transform: translateY(-100%);
    transition: transform $speed-666 $evil-ease, background-color $speed-666 $evil-ease;
  }

  .inner {
    position: relative;
    height: $header-height;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      position: relative;
      width: 122px;
      height: 24px;
      font-size: 0px;
      color: transparent;
      overflow: hidden;
      @include omelet-logo($black);
      display: inline-flex;
      transition: background-image $speed-666 $evil-ease;
    }

    h1 {
      position: absolute;
      top: 50%;
      left: span(7);
      transform: translateY(-50%);
    }

    #menu-btn {
      position: relative;
      width: 24px;
      height: 24px;
      cursor: pointer;

      span {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 2px;
        background-color: $black;
        transform: translateX(-50%) translateY(-50%);

        &:nth-child(1) {
          margin-top: -2px;
        }

        &:nth-child(2) {
          margin-top: 2px;
        }
      }
    }

    nav#primary-nav {
      display: none;
    }
  }

  @include respond-to($mobile) {
    .inner {
      h1 {
        left: span(6);
      }
    }
  }

  @include respond-to($small-tablet) {
    .inner {
      h1 {
        left: span(5);
      }
    }
  }

  @include respond-to($tablet) {
    .inner {
      h1 {
        left: span(4);
      }

      #menu-btn {
        display: none;
      }

      nav#primary-nav {
        width: span(7);
        display: inline-flex;
        align-items: center;
        justify-content: space-between;

        .nav-item {
          height: 24px;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
        }

        .icon {
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-image $speed-666 $evil-ease;

          &.--contact {
            @include icon-mail($black);
          }

          &.--accessibility {
            @include icon-accessibility($black);
          }
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .inner {
      h1 {
        left: span(3);
      }

      nav#primary-nav {
        width: span(6);
      }
    }
  }

  @include respond-to($desktop) {
    .inner {
      h1 {
        left: span(3);
      }

      nav#primary-nav {
        width: span(5);
      }
    }
  }
}

</style>
