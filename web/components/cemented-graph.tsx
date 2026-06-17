"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useBusinessModel } from "@/components/cement-dialog";
import { atomBySlug } from "@/lib/atoms";
import graphData from "@/lib/generated/graph.json";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <div className="h-[240px]" />,
});

interface RawNode {
  id: string;
  title: string;
  category: string;
}
interface RawLink {
  source: string;
  target: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "business-models": "#3b1ee0",
  frameworks: "#6b3aa0",
  pricing: "#0ea5e9",
  growth: "#10b981",
  metrics: "#f59e0b",
  "platform-economics": "#ec4899",
  strategy: "#ef4444",
  concepts: "#64748b",
  tools: "#14b8a6",
};

/**
 * A live map of the concepts this business has cemented into its plan — a
 * subgraph of the full knowledge graph showing only adopted concepts and the
 * relationships among them. Grows as the user cements more.
 */
export function CementedGraph() {
  const router = useRouter();
  const model = useBusinessModel();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(640);

  const slugs = React.useMemo(() => {
    const s = new Set<string>();
    for (const d of model.decisions) if (d.conceptSlug) s.add(d.conceptSlug);
    return s;
  }, [model.decisions]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const data = React.useMemo(() => {
    const allNodes = (graphData as { nodes: RawNode[] }).nodes;
    const allLinks = (graphData as { links: RawLink[] }).links;
    const nodes = allNodes
      .filter((n) => slugs.has(n.id))
      .map((n) => ({ ...n }));
    const present = new Set(nodes.map((n) => n.id));
    const links = allLinks
      .filter((l) => present.has(l.source) && present.has(l.target))
      .map((l) => ({ ...l }));
    return { nodes, links };
  }, [slugs]);

  if (slugs.size === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative h-[240px] w-full overflow-hidden rounded-xl border bg-muted/20"
    >
      <ForceGraph2D
        width={width}
        height={240}
        graphData={data}
        backgroundColor="rgba(0,0,0,0)"
        nodeId="id"
        nodeVal={() => 1}
        nodeRelSize={5}
        nodeLabel={() => ""}
        linkColor={() => "#d4d4d8"}
        linkWidth={1.2}
        cooldownTicks={90}
        d3VelocityDecay={0.5}
        nodeCanvasObject={(node, ctx, scale) => {
          const n = node as RawNode & { x: number; y: number };
          const r = 5 / scale;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, 2 * Math.PI);
          ctx.fillStyle = CATEGORY_COLORS[n.category] ?? "#a1a1aa";
          ctx.fill();
          const fontSize = Math.max(11 / scale, 3.4);
          ctx.font = `600 ${fontSize}px Inter, sans-serif`;
          ctx.fillStyle = "#3f3f46";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(n.title, n.x, n.y + r + 2 / scale);
        }}
        nodePointerAreaPaint={(node, color, ctx, scale) => {
          const n = node as RawNode & { x: number; y: number };
          ctx.beginPath();
          ctx.arc(n.x, n.y, 8 / scale, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
        }}
        onNodeClick={(n) => router.push(`/concepts/${(n as RawNode).id}`)}
      />
      <div className="pointer-events-none absolute right-3 top-2 text-[11px] font-medium text-muted-foreground">
        {slugs.size} concept{slugs.size === 1 ? "" : "s"} in your plan
      </div>
    </div>
  );
}
