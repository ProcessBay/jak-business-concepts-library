import type { Metadata } from "next";
import { LibraryBrowser } from "@/components/library-browser";

export const metadata: Metadata = {
  title: "Library",
  description:
    "Browse the full library of business concepts — business models, pricing, growth, metrics, platform economics, strategy, frameworks, and tools.",
};

export default function LibraryPage() {
  return <LibraryBrowser />;
}
