import { defineStore } from 'pinia';
import { isProxy, toRaw } from 'vue';
import { typeFilter, imageProps } from '~/utils/groq-common';

export const useStore = defineStore('state', {
  state: () => ({
    site_name: '',
    site_seo_description: '',
    site_seo_image: '',
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
      const siteQuery = groq` {
        'site': ${typeFilter('site')} {
          siteName,
          seoSocial {
            description,
            'image': image.asset->url
          },
          footerTitle,
          linkedin,
          instagram
        }
      }`;
      const { data } = await useSanityQuery(siteQuery);
      const site_data = data.value.site;

      // Site settings
      this.site_name = site_data.siteName;
      this.site_seo_description = site_data.seoSocial?.description;
      this.site_seo_image = site_data.seoSocial?.image;

      // Footer setings...
      this.footer_title = site_data.footerTitle;

      // Build social links based on fields with values...
      let vals = [site_data.linkedin, site_data.instagram],
          arr = vals.filter(Boolean);

      if (arr.length > 0) {
        this.social_links = Object.freeze(arr);
      }
    }
  }
})
