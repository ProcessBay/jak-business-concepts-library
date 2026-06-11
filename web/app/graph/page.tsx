import type { Metadata } from "next";
import { KnowledgeGraph } from "@/components/knowledge-graph";

export const metadata: Metadata = {
  title: "Knowledge Map",
  description:
    "An interactive map of 244 connected business concepts. Click any node to apply it to your business.",
};

export default function GraphPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl px-4 pb-2 pt-6">
        <h1 className="text-xl font-semibold tracking-tight">Knowledge Map</h1>
        <p className="text-sm text-muted-foreground">
          244 concepts, 1,374 connections. Click a node to apply it to your
          business; drag to explore.
        </p>
      </div>
      <KnowledgeGraph />
    </div>
  );
}
