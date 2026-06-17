"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCategory } from "@/lib/atoms";
import { useBusinessProfile } from "@/components/business-profile-dialog";
import graphData from "@/lib/generated/graph.json";

// force-graph touches window — client-only.
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
      Laying out the concept map…
    </div>
  ),
});

interface GraphNode {
  id: string;
  title: string;
  category: string;
  blurb: string;
  val: number;
  x?: number;
  y?: number;
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

export function KnowledgeGraph() {
  const router = useRouter();
  const profile = useBusinessProfile();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 800, height: 600 });
  const [selected, setSelected] = React.useState<GraphNode | null>(null);
  // Filtering one category at a time turns a 672-node hairball into a
  // readable map — and dramatically lightens the force simulation.
  const [activeCat, setActiveCat] = React.useState<string | null>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const data = React.useMemo(() => {
    const full = graphData as { nodes: GraphNode[]; links: { source: string; target: string }[] };
    if (!activeCat) {
      return JSON.parse(JSON.stringify(full));
    }
    const nodes = full.nodes.filter((n) => n.category === activeCat);
    const ids = new Set(nodes.map((n) => n.id));
    const links = full.links.filter((l) => ids.has(l.source) && ids.has(l.target));
    return JSON.parse(JSON.stringify({ nodes, links }));
  }, [activeCat]);

  // Labels are legible only when the field is thinned out — draw them when a
  // category is focused; otherwise rely on hover tooltips.
  const showLabels = activeCat !== null;

  return (
    <div
      className="relative h-[calc(100dvh-11rem)] min-h-[420px] overflow-hidden"
      ref={containerRef}
    >
      <ForceGraph2D
        key={activeCat ?? "all"}
        width={size.width}
        height={size.height}
        graphData={data}
        backgroundColor="#ffffff"
        nodeId="id"
        nodeVal={(n) => (n as GraphNode).val}
        nodeLabel={(n) => (n as GraphNode).title}
        nodeColor={(n) =>
          CATEGORY_COLORS[(n as GraphNode).category] ?? "#a1a1aa"
        }
        nodeRelSize={2.6}
        linkColor={() => "#e4e4e7"}
        linkWidth={0.6}
        warmupTicks={showLabels ? 40 : 80}
        cooldownTicks={showLabels ? 60 : 120}
        nodeCanvasObjectMode={() => (showLabels ? "after" : undefined)}
        nodeCanvasObject={
          showLabels
            ? (node, ctx, scale) => {
                const n = node as GraphNode & { x: number; y: number };
                if (scale < 1.2) return; // only when zoomed in enough to read
                const fontSize = Math.max(11 / scale, 3);
                ctx.font = `${fontSize}px Inter, sans-serif`;
                ctx.fillStyle = "#3f3f46";
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillText(n.title, n.x, n.y + 5 / scale);
              }
            : undefined
        }
        onNodeClick={(node) => setSelected(node as GraphNode)}
        onBackgroundClick={() => setSelected(null)}
      />

      {/* Filter chips — click a theme to focus it; click again / All to reset. */}
      <div className="absolute left-4 top-4 flex max-w-[240px] flex-wrap gap-1.5">
        <button
          onClick={() => setActiveCat(null)}
          className={
            "rounded-full border px-2.5 py-0.5 text-[10px] font-medium backdrop-blur transition-colors " +
            (activeCat === null
              ? "border-foreground bg-foreground text-background"
              : "bg-background/90 text-muted-foreground hover:border-foreground")
          }
        >
          All {(graphData as { nodes: unknown[] }).nodes.length}
        </button>
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <button
            key={cat}
            onClick={() => setActiveCat(activeCat === cat ? null : cat)}
            className={
              "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur transition-colors " +
              (activeCat === cat
                ? "border-foreground bg-foreground text-background"
                : "bg-background/90 text-muted-foreground hover:border-foreground")
            }
          >
            <span
              className="inline-block size-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            {formatCategory(cat)}
          </button>
        ))}
      </div>
      {!activeCat && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-foreground/80 px-3 py-1 text-[11px] text-background backdrop-blur">
          Pick a theme above to focus · scroll to zoom · click a node
        </div>
      )}

      {/* Selected-node panel */}
      {selected && (
        <Card className="absolute bottom-6 right-4 top-auto w-80 shadow-lg sm:top-4 sm:bottom-auto">
          <CardContent className="space-y-3 p-4">
            <div>
              <Badge variant="secondary" className="mb-1.5 text-[10px]">
                {formatCategory(selected.category)}
              </Badge>
              <h2 className="text-base font-semibold leading-snug">
                {selected.title}
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {selected.blurb}
            </p>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                onClick={() =>
                  router.push(
                    `/?q=${encodeURIComponent(
                      `Apply "${selected.title}" to my business — what does it mean for us concretely, and what should we do about it?`
                    )}`
                  )
                }
              >
                {profile
                  ? `Apply to ${profile.name}`
                  : "Apply to my business"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/concepts/${selected.id}`)}
              >
                Open concept page
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
