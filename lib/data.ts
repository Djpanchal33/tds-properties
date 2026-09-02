import { promises as fs } from "fs";
import path from "path";
import type { Property, Settings, SiteData } from "@/lib/types";

const dataPath = (name: string) => path.join(process.cwd(), "data", name);
async function read<T>(name: string): Promise<T> { return JSON.parse(await fs.readFile(dataPath(name), "utf8")) as T; }
export async function getSiteData(): Promise<SiteData> {
  const [properties, settings] = await Promise.all([read<Property[]>("properties.json"), read<Settings>("settings.json")]);
  return { properties, settings };
}
export async function getPublishedProperties() { return (await getSiteData()).properties.filter((p) => p.published); }
export async function getProperty(slug: string) { return (await getPublishedProperties()).find((p) => p.slug === slug); }
