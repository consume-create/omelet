<template>
  <div id="mobile-menu" :class="{'--menu-mode': store.menu_open}">
    <div id="mobile-menu-inner">
      <div id="mobile-menu-mask">
        <div id="mobile-menu-content">
          <ul class="menu-nav gutter">
            <li v-for="item in store.site_nav">
              <NuxtLink class="nav-item nav-a1 --alt" :to="{ hash: `#${item.id}` }" @click.native="store.setMenuOpen()">{{ item.label }}</NuxtLink>
            </li>
          </ul>
          <div class="smiley gutter"></div>
          <div class="menu-footer">
            <ul>
              <li>
                <NuxtLink class="icon --contact" to="https://www.linkedin.com/company/omelet" target="_blank">LinkedIn</NuxtLink>
              </li>
              <li>
                <NuxtLink class="icon --contact" to="https://www.instagram.com/thisisomelet" target="_blank">Instagram</NuxtLink>
              </li>
            </ul>
            <ul>
              <li>
                <NuxtLink class="icon --contact" to="mailto:hello@omelet.com" target="_blank">hello@omelet.com</NuxtLink>
              </li>
              <li>
                <div class="icon --accessibility">Accessibility</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '~/stores/store';

export default {
  data() {
    return {
      store: useStore()
    }
  }
}
</script>

<style lang="scss">

#mobile-menu {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba($black, 0.85);
  overflow: hidden;
  z-index: 50;

  &.menu-enter-active,
  &.menu-leave-active {
    transition: opacity $speed-666 $evil-ease;

    #mobile-menu-inner,
    #mobile-menu-mask {
      transition: transform $speed-666 $evil-ease;
    }
  }

  &.menu-enter-from,
  &.menu-leave-to {
    opacity: 0;

    #mobile-menu-inner {
      transform: translateY(-100%);
    }

    #mobile-menu-mask {
      transform: translateY(100%);
    }
  }

  #mobile-menu-inner {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: $white;
    overflow: hidden;
  }

  #mobile-menu-mask {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #mobile-menu-content {
    position: absolute;
    top: $header-height;
    left: 0px;
    right: 0px;
    bottom: 0px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    ul.menu-nav {
      padding: $space-s 0 span(1.5);

      li {
        .nav-item {
          padding: $space-s 0;
          display: inline-flex;
          cursor: pointer;
        }
      }
    }

    .smiley {
      margin-top: auto;
      margin-bottom: auto;
      @include shape-smiley($green);
      display: flex;
      flex: 1 0 auto;
    }

    .menu-footer {
      padding: span(1.5) span(1) span(1);
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      ul {
        margin: 0 -14px;
        display: inline-flex;
        flex-wrap: nowrap;
        align-items: center;

        li {
          margin: 0 14px;
          display: inline-flex;
          align-items: center;

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
  }
}

</style>
