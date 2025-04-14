import AboutPageClient from "@/client/about/AboutPageClient";
import type { Metadata } from "next";
import { seoMeta } from "../seo";

export const metadata: Metadata = seoMeta(
  "About",
  "Welcome to the ultimate race tracking site. Discover races, results, and rankings across various events."
);

export default function AboutPage() {
  return (
    <div>
      <AboutPageClient />
    </div>
  );
}
