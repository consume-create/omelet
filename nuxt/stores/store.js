import { defineStore } from 'pinia';
import { typeFilter, imageProps } from '~/utils/groq-common';

export const useSiteStore = defineStore('site', {
  state: () => ({
    accessibility: false,
    loader: true,
    site_name: '',
    site_seo_description: '',
    site_seo_image: '',
    header_title: '',
    footer_title: '',
    general_label: '',
    business_label: '',
    footer_handwriting: '',
    general_email: '',
    business_email: '',
    address: '',
    address_link: '',
    phone_number: '',
    social_links: [],
    copyright: '',
    case_studies: [],
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
    setAccessibilityOff() {
      this.accessibility = false;
    },
    setAccessibilityOn() {
      this.accessibility = true;
    },
    setLoaderComplete() {
      this.loader = false;
    },
    setMenuOpen() {
      this.menu_open = true;
    },
    setMenuClose() {
      this.menu_open = false;
    },
    setDarkMode() {
      this.dark_mode = true;
    },
    setLightMode() {
      this.dark_mode = false;
    },
    async fetchSiteContent() {
      const siteQuery = groq` {
        'site': ${typeFilter('site')} {
          siteName,
          seoSocial {
            description,
            'image': image.asset->url
          },
          headerTitle,
          footerTitle,
          generalLabel,
          businessLabel,
          handwriting,
          generalEmail,
          businessEmail,
          address,
          addressLink,
          phoneNumber,
          linkedin,
          instagram,
          copyright
        },
        'index': ${typeFilter('index')} {
          caseStudies[]-> {
            title,
            'slug': slug.current
          }
        }
      }`;
      const { data } = await useSanityQuery(siteQuery);
      const site_data = data.value.site;
      const home_data = data.value.index;

      // Site settings
      this.site_name = site_data.siteName;
      this.site_seo_description = site_data.seoSocial?.description;
      this.site_seo_image = site_data.seoSocial?.image;

      // Header setings...
      this.header_title = site_data.headerTitle;

      // Footer setings...
      this.footer_title = site_data.footerTitle;
      this.general_label = site_data.generalLabel;
      this.business_label = site_data.businessLabel;
      this.footer_handwriting = site_data.handwriting;

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

      // Legal settings...
      this.copyright = site_data.copyright;

      // Case Studies...
      this.case_studies = home_data.caseStudies;
    }
  }
})
