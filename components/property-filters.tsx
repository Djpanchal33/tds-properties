"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Grid2X2, List, Search, SlidersHorizontal, X } from "lucide-react";
import type { Property, Settings } from "@/lib/types";
import PropertyCard from "@/components/property-card";
import PropertyHoverMedia from "@/components/property-hover-media";
import { propertyPrice } from "@/lib/format";

type FilterState = { intent: string; category: string; type: string; city: string; beds: string; min: string; max: string; sort: string };

export default function PropertyFilters({ properties, settings }: { properties: Property[]; settings: Settings }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [sheet, setSheet] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState(params.get("q") || "");
  const [filters, setFilters] = useState<FilterState>({
    intent: params.get("intent") || "", category: params.get("category") || "", type: params.get("type") || "",
    city: params.get("city") || "", beds: params.get("beds") || "", min: params.get("min") || "", max: params.get("max") || "", sort: params.get("sort") || "newest",
  });

  const apply = (next: FilterState, nextSearch = search) => {
    setFilters(next);
    const query = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => value && (key !== "sort" || value !== "newest") && query.set(key, value));
    if (nextSearch) query.set("q", nextSearch);
    router.replace(`${pathname}${query.size ? `?${query}` : ""}`, { scroll: false });
  };
  const update = (key: keyof FilterState, value: string) => apply({ ...filters, [key]: value });
  const updateSearch = (value: string) => { setSearch(value); apply(filters, value); };
  const reset = () => { const cleared: FilterState = { intent: "", category: "", type: "", city: "", beds: "", min: "", max: "", sort: "newest" }; setSearch(""); apply(cleared, ""); };

  const result = useMemo(() => properties.filter((property) => {
    const category = property.type === "Commercial" ? "Commercial" : "Residential";
    const intentMatch = !filters.intent || (filters.intent === "buy" ? property.status === "For Sale" : property.status === "For Rent");
    const haystack = `${property.title} ${property.locality} ${property.city} ${property.type}`.toLowerCase();
    return intentMatch && (!filters.category || category === filters.category) && (!filters.type || property.type === filters.type) &&
      (!filters.city || property.city === filters.city) && (!filters.beds || property.bedrooms >= Number(filters.beds)) &&
      (!filters.min || property.price >= Number(filters.min)) && (!filters.max || property.price <= Number(filters.max)) &&
      (!search || haystack.includes(search.toLowerCase()));
  }).sort((a, b) => filters.sort === "price-low" ? a.price - b.price : filters.sort === "price-high" ? b.price - a.price : a.title.localeCompare(b.title)), [properties, filters, search]);

  const controls = <>
    <label className="relative block"><Search className="absolute left-3 top-3.5 text-navy/45" size={16}/><input value={search} onChange={(event) => updateSearch(event.target.value)} className="field pl-10" placeholder="Search by area or property" /></label>
    <Select value={filters.intent} onChange={(value) => update("intent", value)} label="Buy, sell or rent" values={["buy", "rent"]} labels={{ buy: "Buy / sell", rent: "Rent" }} />
    <Select value={filters.category} onChange={(value) => update("category", value)} label="Residential or commercial" values={["Residential", "Commercial"]} />
    <Select value={filters.type} onChange={(value) => update("type", value)} label="All property types" values={settings.propertyTypes} />
    <Select value={filters.city} onChange={(value) => update("city", value)} label="All cities" values={[...new Set(properties.map((property) => property.city))]} />
    <Select value={filters.beds} onChange={(value) => update("beds", value)} label="Any bedrooms" values={["1", "2", "3", "4", "5"]} suffix="+ bedrooms" />
    <PriceField label="Minimum price" value={filters.min} onChange={(value) => update("min", value)} />
    <PriceField label="Maximum price" value={filters.max} onChange={(value) => update("max", value)} />
  </>;

  return <>
    <div className="mt-9 hidden gap-3 lg:grid lg:grid-cols-3 xl:grid-cols-4">{controls}</div>
    <div className="mt-7 flex flex-wrap items-center justify-between gap-4"><p className="text-sm text-navy/60"><b className="text-navy">{result.length}</b> properties found</p><div className="flex items-center gap-2"><button onClick={() => setSheet(true)} className="inline-flex min-h-11 items-center gap-2 border border-navy/20 px-3 text-sm lg:hidden"><SlidersHorizontal size={16}/> Filters</button><button onClick={reset} className="text-sm font-semibold text-gold hover:text-navy">Reset</button><Select value={filters.sort} onChange={(value) => update("sort", value)} label="Sort" values={["newest", "price-low", "price-high"]} labels={{ newest: "Recommended", "price-low": "Price: low to high", "price-high": "Price: high to low" }} /><div className="hidden border border-navy/20 sm:flex"><button aria-label="Grid view" onClick={() => setLayout("grid")} className={`grid h-10 w-10 place-items-center ${layout === "grid" ? "bg-navy text-cream" : ""}`}><Grid2X2 size={16}/></button><button aria-label="List view" onClick={() => setLayout("list")} className={`grid h-10 w-10 place-items-center ${layout === "list" ? "bg-navy text-cream" : ""}`}><List size={16}/></button></div></div></div>
    <div className={layout === "grid" ? "mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3" : "mt-8 grid gap-5"}>{result.map((property, index) => layout === "grid" ? <PropertyCard property={property} priority={index < 3} key={property.id}/> : <ListCard key={property.id} property={property}/>)}</div>
    {!result.length && <div className="mt-12 border border-dashed border-navy/25 px-6 py-16 text-center"><p className="display text-4xl text-navy">No exact matches just yet.</p><button onClick={reset} className="mt-4 text-sm font-bold text-gold">Clear filters</button></div>}
    {sheet && <div className="fixed inset-0 z-[100] bg-ink/45 lg:hidden"><div className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-auto bg-cream p-6"><div className="flex items-center justify-between"><h2 className="display text-3xl text-navy">Refine collection</h2><button aria-label="Close filters" onClick={() => setSheet(false)}><X/></button></div><div className="mt-6 grid gap-3">{controls}</div><button onClick={() => setSheet(false)} className="mt-6 w-full bg-navy py-4 text-sm font-bold text-cream">Show {result.length} properties</button></div></div>}
  </>;
}

function Select({ value, onChange, label, values, suffix = "", labels }: { value: string; onChange: (value: string) => void; label: string; values: string[]; suffix?: string; labels?: Record<string, string> }) {
  return <select aria-label={label} className="field bg-white" value={value} onChange={(event) => onChange(event.target.value)}><option value="">{label}</option>{values.map((item) => <option key={item} value={item}>{labels?.[item] || `${item}${suffix}`}</option>)}</select>;
}
function PriceField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="relative block"><span className="sr-only">{label}</span><span className="absolute left-3 top-3 text-sm text-navy/45">₹</span><input aria-label={label} type="number" min="0" step="100000" value={value} onChange={(event) => onChange(event.target.value)} className="field pl-7" placeholder={label} /></label>;
}
function ListCard({ property }: { property: Property }) {
  return <a href={`/properties/${property.slug}`} className="group grid overflow-hidden bg-white shadow-card md:grid-cols-[18rem_1fr]"><div className="aspect-video md:aspect-auto"><PropertyHoverMedia property={property} /></div><div className="p-6"><p className="eyebrow">{property.type} · {property.locality}</p><h3 className="display mt-2 text-4xl text-navy">{property.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-navy/65">{property.shortDescription}</p><p className="mt-5 font-bold text-navy">{propertyPrice(property)}</p></div></a>;
}
