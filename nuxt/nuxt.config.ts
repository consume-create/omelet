require("dotenv").config({ path: "../sanity/.env" });
// import { createClient } from "@nuxtjs/sanity";
//
// const client = createClient({
//   projectId: process.env.SANITY_STUDIO_PROJECT_ID,
//   dataset: "production",
//   useCdn: false,
//   minimal: true
// })

const site_name = "Omelet | Los Angeles Ad Agency";
const site_description = "We’re an independent creative company that makes impact.";
const site_url = "https://omelet.com"

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  //
  // SSR + Target
  //
  ssr: true,
  target: "static",
  //
  // Sourcemap https://nuxtseo.com/sitemap/getting-started/installation
  //
  sourcemap: {
    server: true,
    client: false
  },
  //
  // Site https://nuxtseo.com/sitemap/getting-started/installation
  //
  site: {
    url: site_url,
    name: site_name
  },
  //
  // App
  //
  app: {
    head: {
      title: site_name,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: site_name },
        { hid: "description", name: "description", content: site_description },
        { hid: "og:title", property: "og:title", content: site_name },
        { hid: "og:description", property: "og:description", content: site_description },
        { hid: "og:url", property: "og:url", content: site_url },
        // { hid: "og:image", property: "og:image", content: `${site_url}/images/...` },
        { name: "twitter:card", content: "summary" },
        { name: "msapplication-TileColor", content:"#ffffff" },
        { name: "theme-color", content:"#ffffff" }
      ],
      link: [
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#000000" },
        { rel: "manifest", href: "/site.webmanifest" }
      ]
    }
  },
  //
  // CSS
  //
  css: [
    "~/assets/styles/reset.scss",
    "~/assets/styles/app.scss"
  ],
  //
  // Plugins to load before mounting the App
  //
  plugins: [
    // "~/plugins/preview.client.js",
    "~/plugins/vue-body-scroll-lock.client.js"
  ],
  //
  // Build modules
  //
  buildModules: [
    "@nuxtjs/dotenv"
  ],
  //
  // Modules
  //
  modules: [
    "@nuxtjs/sanity",
    "@nuxtjs/sitemap"
  ],
  //
  // Sanity
  //
  sanity: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    apiVersion: '2024-10-01',
    useCdn: false,
    minimal: true,
    additionalClients: {
      preview: {
        projectId: process.env.SANITY_STUDIO_PROJECT_ID,
        token: process.env.SANITY_STUDIO_PREVIEW_TOKEN,
        apiVersion: '2024-10-01'
      }
    }
  }
});
