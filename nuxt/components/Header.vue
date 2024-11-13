<template>
  <header :class="{'--hidden': state.hidden, '--shield': state.shield_mode, '--dark-mode': store.dark_mode, '--menu-mode': store.menu_open}" v-scroll-lock="store.menu_open">
    <div class="inner">
      <NuxtLink :class="{'logo': true, 'marg-l': true, 'appear': !store.loader}" to="/" @click.native="store.setMenuClose()">
        <span>O</span><span>M</span><span>E</span><span>L</span><span>E</span><span>T</span>
      </NuxtLink>
      <h1 class="pre" v-html="getTitleLines" />
      <nav id="mobile-nav" class="marg-r">
        <div class="icon --accessibility">Accessibility</div>
        <div id="menu-btn" @click="toggleMenu">
          <div class="lines"><span /><span /></div>
          <div class="lines"><span /><span /></div>
        </div>
      </nav>
      <nav id="primary-nav">
        <NuxtLink v-for="item in store.site_nav" class="nav-item nav-a1" :to="{ path: '/', hash: `#${item.id}` }">{{ item.label }}</NuxtLink>
        <NuxtLink class="icon --contact" :to="`mailto:${store.general_email}`" target="_blank">{{ store.general_email }}</NuxtLink>
        <div class="icon --accessibility marg-r">Accessibility</div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useSiteStore } from '~/stores/store';

const route = useRoute();
const store = useSiteStore();
const state = reactive({
  event_horizon: 0,
  diff_scroll: 0,
  last_scroll: 0,
  hidden: false,
  shield_mode: false,
  scrolling_cb: false
});
const header_title = ref(store.header_title);

// Computed
const getTitleLines = computed(() => {
  const lines = header_title.value.split('\n');
  let html = '';
  lines.forEach((line, index) => {
    let br = index < lines.length - 1 ? '\n' : '';
    if (index === 0) {
      html += `<strong>${line}</strong>${br}`;
    } else {
      html += `${line}${br}`;
    }
  });

  return html;
});

// Mounted
onMounted(() => {
  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll);

  onResize();
  onScroll();
  checkRoute();
});

// Before Unmount
onBeforeMount(() => {
  window.removeEventListener('resize', onResize);
  window.removeEventListener('scroll', onScroll);
});

// Methods
function onResize() {
  if (window.innerWidth >= 768 && store.menu_open) {
    store.setMenuClose();
  }
};

function onScroll() {
  state.event_horizon = window.pageYOffset;
  clearTimeout(state.scrolling_cb);

  if (state.event_horizon <= 1) {
    state.shield_mode = false;
    state.hidden = false;
  } else {
    state.shield_mode = true;

    if (state.event_horizon - state.last_scroll >= 0) {
      state.diff_scroll = 0;
      state.hidden = true;
    } else {
      state.diff_scroll = state.diff_scroll + 1;
      if (state.diff_scroll >= 1) {
        state.hidden = false;
      }

      state.scrolling_cb = setTimeout(() => {
        state.diff_scroll = 0;
      }, 50);
    }
  }

  state.last_scroll = state.event_horizon;
};

function toggleMenu() {
  if (store.menu_open) {
    store.setMenuClose();
  } else {
    store.setMenuOpen();
  }
}

function checkRoute() {
  if (route.name === 'index') {
    store.setLightMode();
  } else {
    store.setDarkMode();
  }
}

// Watchers
watch(route, () => {
  store.setMenuClose();
  checkRoute();
});
</script>

<style lang='scss'>
header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  overflow: hidden;
  z-index: 100;
  transform: translateY(0%);
  transition: transform $speed-666 $evil-ease, color $speed-666 $evil-ease;

  &.--dark-mode:not(.--menu-mode) {
    color: $white;

    &:before {
      background-color: $black;
    }

    .inner {
      .logo {
        span {
          @include omelet-logo($white);
        }
      }

      nav#mobile-nav {
        .icon {
          &.--accessibility {
            @include icon-accessibility($white);
            background-size: 16px 16px;
          }
        }

        #menu-btn {
          .lines {
            &:first-child {
              span {
                &:before {
                  background-color: $white;
                }
              }
            }

            &:last-child {
              span {
                &:before {
                  background-color: $white;
                }
              }
            }
          }
        }
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

    .inner {
      nav#mobile-nav {
        #menu-btn {
          .lines {
            &:first-child {
              span {
                &:before {
                  transform: translateX(-100%);
                  transition: background-color $speed-333 $ease-out, transform $speed-333 $ease-out;
                }
              }

              span:last-child {
                &:before {
                  transition: background-color $speed-333 $ease-out, transform $speed-333 $ease-out calc($speed-333 / 2);
                }
              }
            }

            &:last-child {
              span {
                &:before {
                  transform: translateX(0%);
                  transition: background-color $speed-333 $ease-out, transform $speed-333 $ease-out $speed-333;
                }
              }

              span:last-child {
                &:before {
                  transform: translateY(0%);
                  transition: background-color $speed-333 $ease-out, transform $speed-333 $ease-out calc($speed-333 * 1.5);
                }
              }
            }
          }
        }
      }
    }
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
      width: 104px;
      height: 20px;
      font-size: 0px;
      color: transparent;
      overflow: hidden;
      display: inline-flex;
      flex-shrink: 0;

      &.appear {
        span {
          transform: translate(0, 0);
        }
      }

      span {
        @include omelet-logo($black);
        background-size: 104px 20px !important;
        transform: translate(0, -100%);

        &:nth-child(1) {
          width: 21px;
          background-position: 0px 0px !important;
          transition: transform $speed-666 1800ms cubic-bezier(0.075, 0.820, 0.165, 1.000), background-image $speed-666 $evil-ease;
        }

        &:nth-child(2) {
          width: 24px;
          background-position: -21px 0px !important;
          transition: transform $speed-666 1911ms cubic-bezier(0.075, 0.820, 0.165, 1.000), background-image $speed-666 $evil-ease;
        }

        &:nth-child(3) {
          width: 14px;
          background-position: -45px 0px !important;
          transition: transform $speed-666 2022ms cubic-bezier(0.075, 0.820, 0.165, 1.000), background-image $speed-666 $evil-ease;
        }

        &:nth-child(4) {
          width: 13px;
          background-position: -59px 0px !important;
          transition: transform $speed-666 2133ms cubic-bezier(0.075, 0.820, 0.165, 1.000), background-image $speed-666 $evil-ease;
        }

        &:nth-child(5) {
          width: 14px;
          background-position: -72px 0px !important;
          transition: transform $speed-666 2244ms cubic-bezier(0.075, 0.820, 0.165, 1.000), background-image $speed-666 $evil-ease;
        }

        &:nth-child(6) {
          width: 18px;
          background-position: -86px 0px !important;
          transition: transform $speed-666 2355ms cubic-bezier(0.075, 0.820, 0.165, 1.000), background-image $speed-666 $evil-ease;
        }
      }
    }

    h1 {
      position: absolute;
      top: 50%;
      left: span(5.5);
      transform: translateY(-50%);
    }

    nav#mobile-nav {
      display: inline-flex;
      align-items: center;
      flex-wrap: nowrap;
      flex-shrink: 0;

      .icon {
        width: 24px;
        height: 24px;
        margin-right: $space-xs;
        font-size: 0px;
        color: transparent;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        cursor: pointer;
        transition: background-image $speed-666 $evil-ease;

        &.--accessibility {
          @include icon-accessibility($black);
          background-size: 16px 16px;
        }
      }

      #menu-btn {
        position: relative;
        width: 24px;
        height: 24px;
        margin-right: -4px;
        cursor: pointer;

        .lines {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 16px;
          height: 16px;
          overflow: hidden;
          backface-visibility: hidden;
          transform: translateX(-50%) translateY(-50%);

          &:first-child {
            span {
              position: absolute;
              top: 9px;
              left: 0px;
              width: 100%;
              height: 2px;
              overflow: hidden;
              transform: translateX(0%);

              &:before {
                content: '';
                @include abs-fill;
                background-color: $black;
                transform: translateX(0%);
                transition: background-color $speed-333 $ease-out, transform $speed-333 $ease-out calc($speed-333 * 1.5);
              }
            }

            span:last-child {
              top: auto;
              bottom: 9px;

              &:before {
                transition: background-color $speed-333 $ease-out, transform $speed-333 $ease-out $speed-333;
              }
            }
          }

          &:last-child {
            transform: translateX(-50%) translateY(-50%) rotate(45deg);

            span {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 100%;
              height: 2px;
              overflow: hidden;
              transform: translateX(-50%) translateY(-50%);

              &:before {
                content: '';
                @include abs-fill;
                background-color: $black;
                transform: translateX(-100%);
                transition: background-color $speed-333 $ease-out, transform $speed-333 $ease-out calc($speed-333 / 2);
              }
            }

            span:last-child {
              width: 2px;
              height: 100%;

              &:before {
                transform: translateY(-100%);
                transition: background-color $speed-333 $ease-out, transform $speed-333 $ease-out;
              }
            }
          }
        }
      }
    }

    nav#primary-nav {
      display: none;
    }
  }

  @include respond-to($mobile) {
    .inner {
      .logo {
        width: 122px;
        height: 24px;

        span {
          background-size: 122px 24px !important;

          &:nth-child(1) {
            width: 24px;
            background-position: 0px 0px !important;
          }

          &:nth-child(2) {
            width: 29px;
            background-position: -24px 0px !important;
          }

          &:nth-child(3) {
            width: 16px;
            background-position: -53px 0px !important;
          }

          &:nth-child(4) {
            width: 16px;
            background-position: -69px 0px !important;
          }

          &:nth-child(5) {
            width: 17px;
            background-position: -85px 0px !important;
          }

          &:nth-child(6) {
            width: 20px;
            background-position: -102px 0px !important;
          }
        }
      }

      h1 {
        left: span(6);
      }

      nav#mobile-nav {
        .icon {
          margin-right: $space-s;
        }
      }
    }
  }

  @include respond-to($small-tablet) {
    .inner {
      h1 {
        left: span(4.5);
      }
    }
  }

  @include respond-to($tablet) {
    .inner {
      h1 {
        left: span(3);
      }

      nav#mobile-nav {
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
          font-size: 0px;
          color: transparent;
          overflow: hidden;
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
        left: span(2.5);
      }

      nav#primary-nav {
        width: span(6);
      }
    }
  }

  @include respond-to($desktop) {
    .inner {
      h1 {
        left: span(2);
      }

      nav#primary-nav {
        width: span(5);
      }
    }
  }

  @include respond-to($retina-macbook) {
    .inner {
      h1 {
        left: span(1.5);
      }
    }
  }
}
</style>
