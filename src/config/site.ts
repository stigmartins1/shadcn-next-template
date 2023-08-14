export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Smart Places Toolkit",
  shortname: "SPT",
  description:
    "Designed to give you statistics, insights and tools to manage your land plots.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  internalLinks: {
    dashboard: "/dashboard",
    profile: "/profile",
    signin: "/signin",
    signup: "/signup",
  },
  externalLinks: {
    smartplaces: "https://smart-places.io",
    smartplacesmap: "https://map.smart-places.io",
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
