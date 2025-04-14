import type { Metadata } from "next";
import { seoMeta } from "../seo";
import ProfilePageClient from "@/client/profile/ProfilePageClient";
import ProtectedRoute from "@/components/protected/ProtectedRoute";

export const metadata: Metadata = seoMeta(
  "Profile",
  "Welcome to the ultimate race tracking site. Discover races, results, and rankings across various events."
);

export default function AboutPage() {
  return (
    <ProtectedRoute>
      <ProfilePageClient />
    </ProtectedRoute>
  );
}
