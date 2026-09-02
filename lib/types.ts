export type PropertyStatus = "For Sale" | "For Rent" | "Sold" | "Under Construction";
export type Property = {
  id: string; title: string; slug: string; price: number; currency: string; priceLabel?: string;
  type: string; status: PropertyStatus; bedrooms: number; bathrooms: number; area: number; areaUnit: string;
  city: string; locality: string; address: string; mapUrl?: string; latitude?: number; longitude?: number;
  shortDescription: string; description: string; amenities: string[]; images: string[]; reraNumber?: string;
  possessionDate?: string; details: { label: string; value: string }[]; published: boolean; featured: boolean;
};
export type Settings = {
  logoText: string; logoUrl?: string; colors: { navy: string; gold: string }; hero: { headline: string; subheadline: string; image: string; video?: string };
  about: { eyebrow: string; heading: string; text: string; image: string }; stats: { label: string; value: number }[];
  testimonials: { quote: string; name: string; role: string }[]; team: { name: string; role: string; image: string }[];
  contact: { phone: string; whatsapp: string; email: string; address: string; mapUrl: string };
  social: { instagram?: string; linkedin?: string; facebook?: string }; footerText: string;
  seo: { title: string; description: string; ogImage: string }; propertyTypes: string[]; amenities: string[]; localities: string[];
};
export type SiteData = { properties: Property[]; settings: Settings };
