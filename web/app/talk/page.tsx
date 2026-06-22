import type { Metadata } from "next";
import { Suspense } from "react";
import { TalkExperience } from "@/components/talk-experience";

export const metadata: Metadata = {
  title: "Talk to the graph",
  description:
    "Ask out loud and watch the concepts behind each answer light up across the knowledge graph.",
};

export default function TalkPage() {
  return (
    <Suspense fallback={null}>
      <TalkExperience />
    </Suspense>
  );
}
