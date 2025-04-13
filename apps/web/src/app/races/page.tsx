import RacesPageClient from "@/client/races/RacesPageClient";
import { seoMeta } from "../seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const year: number = new Date().getFullYear();

  return seoMeta(
    `Races | Your Race Tracking Website`,
    `Explore all available races for ${year}. View upcoming and past races across various distances.`
  );
}

export default function RacesPage() {
  const year: number = new Date().getFullYear();

  return (
    <div>
      <RacesPageClient yearId={year} />
    </div>
  );
}
