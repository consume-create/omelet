import { defineStore } from 'pinia';
import { typeFilter, imageProps } from '~/utils/groq-common';

export const useSiteStore = defineStore('site', {
  state: () => ({
    site_name: '',
    site_seo_description: '',
    site_seo_image: '',
    footer_title: '',
    general_label: '',
    business_label: '',
    general_email: '',
    business_email: '',
    address: '',
    address_link: '',
    phone_number: '',
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
      this.menu_open = true;
    },
    setMenuClose() {
      this.menu_open = false;
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
          generalLabel,
          businessLabel,
          generalEmail,
          businessEmail,
          address,
          addressLink,
          phoneNumber,
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
      this.general_label = site_data.generalLabel;
      this.business_label = site_data.businessLabel;

      // Contact settings...
      this.general_email = site_data.generalEmail;
      this.business_email = site_data.businessEmail;
      this.address = site_data.address;
      this.address_link = site_data.addressLink;
      this.phone_number = site_data.phoneNumber;

      // Build social links based on fields with values...
      let vals = [site_data.linkedin, site_data.instagram],
          arr = vals.filter(Boolean);

      if (arr.length > 0) {
        this.social_links = Object.freeze(arr);
      }
    }
  }
})
