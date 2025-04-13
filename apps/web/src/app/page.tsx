// src/app/home/page.tsx
import HomePageClient from "@/client/home/HomePageClient";
import { seoMeta } from "./seo";
import type { Metadata } from "next";

export const metadata: Metadata = seoMeta(
  "Home | Your Race Tracking Website",
  "Welcome to the ultimate race tracking site. Discover races, results, and rankings across various events."
);

export default function HomePage() {
  return (
    <div>
      <HomePageClient />
    </div>
  );
}
