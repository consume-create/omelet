
const site_name = "Omelet | Los Angeles Ad Agency";
const site_description = "We’re an independent creative company that makes impact.";
const site_url = "https://omelet.com"

export default {
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: true,
  target: "static",
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
        { name: "msapplication-TileColor", content:"#d7d2ca" },
        { name: "theme-color", content:"#d7d2ca" }
      ]
      // link: [
      //   { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      //   { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      //   { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      //   { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#171716" },
      //   { rel: "manifest", href: "/site.webmanifest" }
      // ]
    }
  }
}
