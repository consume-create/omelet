import { defineStore } from 'pinia';
import { isProxy, toRaw } from 'vue';
// import { siteQuery } from '~/queries/content';
// import { useSanityQuery } from '@nuxtjs/sanity';

export const useStore = defineStore('state', {
  state: () => ({
    site_name: '',
    footer_title: '',
    social_links: [],
    menu_open: false,
    dark_mode: false,
    site_nav: [
      { id: 'work', label: 'Work' },
      { id: 'capabilities', label: 'Capabilities' },
      { id: 'leadership', label: 'Leadership' }
    ],
    preview_is_active: false
  }),
  actions: {
    setMenuOpen() {
      this.menu_open = !this.menu_open;
    },
    setDarkMode() {
      this.dark_mode = !this.dark_mode;
    },
    async fetchSiteContent() {
      const siteQuery = '*[_type == "site"][0]';
      const { data } = await useSanityQuery(siteQuery);

      this.site_name = data.value.siteName;
      this.footer_title = data.value.footerTitle;

      let vals = [data.value.linkedin, data.value.instagram],
          arr = vals.filter(Boolean);

      if (arr.length > 0) {
        this.social_links = Object.freeze(arr);
      }
    }
    // async getSiteContent(ctx) {
    //   const request = groq` {
    //       'site': *[_type == 'site'] {
    //         siteName,
    //         footerTitle,
    //         instagram,
    //         facebook,
    //         twitter,
    //         linkedin,
    //         vimeo
    //       }
    //     }`;
    //
    //   const result = await (
    //     ctx.query && ctx.query.preview === 'true' ? ctx.$sanity.preview.fetch(request) : ctx.$sanity.fetch(request)
    //   );
    //
    //   if (result && result.site) {
    //     this.site_name = result.site.siteName;
    //     this.footer_title = result.site.footerTitle;
    //     // store.commit('set_site_name', result.site.siteName);
    //     // store.commit('set_site_footer_title', result.site.footerTitle);
    //
    //     // let vals = [result.site.instagram, result.site.facebook, result.site.twitter, result.site.linkedin, result.site.vimeo],
    //     //     arr = vals.filter(Boolean);
    //     //
    //     // if (arr.length > 0) {
    //     //   store.commit('set_site_social_links', arr);
    //     // }
    //   }
    //
    //   // if (result && result.index) {
    //   //   store.commit('set_site_description', result.index.seoSocial.description);
    //   //   store.commit('set_site_image', result.index.seoSocial.image);
    //   // }
    // }
  }
})
