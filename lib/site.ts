export const siteConfig = {
  name: "Repair or Replace My Car",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://carsecondopinion.com",
  contactEmail: "hello@carsecondopinion.com",
  description:
    "Compare the likely cost of repairing your current car versus replacing it with a used or new vehicle.",
  nav: [
    { href: "/calculator", label: "Calculator" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/guides", label: "Guides" },
    { href: "/methodology", label: "Methodology" }
  ]
};
