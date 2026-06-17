import type { Metadata } from "next";
import { BusinessModelView } from "@/components/business-model-view";

export const metadata: Metadata = {
  title: "Your Business Model",
  description:
    "Your consolidated business model — the concepts you've decided to act on, organized and ready to share.",
};

export default function ModelPage() {
  return <BusinessModelView />;
}
