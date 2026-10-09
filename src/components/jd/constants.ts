export const JD = {
  name: "JD Electrical",
  tagline: "Your Trusted Electrical Services Partner in South Africa",
  owner: "Jan Cilliers",
  ownerTitle: "Master Electrician",
  phoneDisplay: "+27 83 602 3171",
  phoneHref: "tel:+27836023171",
  whatsappHref:
    "https://wa.me/27836023171?text=" +
    encodeURIComponent(
      "Hi Jan, I found JD Electrical online and I need help with an electrical job."
    ),
  email: "jan@jdelectrical.co.za",
  emailHref: "mailto:jan@jdelectrical.co.za",
  address: "12 Orange Str., Brackendowns, Alberton 1448",
  facebook: "https://www.facebook.com/jdelectrical.co.za",
  regNumber: "IT9819/07",
  vatNumber: "4110244623",
  dolNumber: "GS01479",
  cfNumber: "990000399543",
  liability: "Momentum MT561823",
  bee: "Level 4 B-BBEE contributor — 100% procurement recognition",
} as const;

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#backup-power", label: "Backup Power" },
  { href: "#estimate", label: "Instant Estimate" },
  { href: "#live-leads", label: "Live Leads" },
  { href: "#ai-ideas", label: "AI Ideas" },
  { href: "#contact", label: "Contact" },
] as const;

export const SERVICE_LISTS: Record<string, string[]> = {
  Domestic: [
    "Electrical fencing",
    "Gate automation",
    "Garage door automation",
    "House wiring",
    "Intercom systems",
    "Pool pumps",
    "Borehole pumps",
    "Generators",
    "Solar",
    "CoCs for safety & compliance",
  ],
  Commercial: [
    "Design",
    "Installations",
    "Maintenance",
    "Repairs",
    "Upgrades",
    "Electrical installations",
    "Factory installations",
    "Generator installations",
    "Reliable power solutions",
    "CoC (Certificate of Compliance)",
  ],
  "Industrial & Mining": [
    "Design",
    "Installations",
    "Maintenance",
    "Repairs",
    "Upgrades",
    "Filling stations",
    "Commercial pumps & tanks",
    "Electrical installations",
    "Factory installations",
    "Generator installations",
    "Reliable power solutions",
    "CoC (Certificate of Compliance)",
  ],
};

export function formatZAR(n: number): string {
  return "R" + Math.round(n).toLocaleString("en-ZA");
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}
