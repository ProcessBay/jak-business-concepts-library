"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import graphData from "@/lib/generated/graph.json";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
      Waking up the map…
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
interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
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

function linkEndId(end: string | GraphNode): string {
  return typeof end === "string" ? end : end.id;
}

interface Props {
  /** Slugs of the concepts used to answer — these light up. */
  highlighted: Set<string>;
  /** True while a turn is in flight or the answer is being spoken. */
  active: boolean;
  onNodeClick?: (slug: string) => void;
}

export function TalkGraph({ highlighted, active, onNodeClick }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = React.useRef<any>(null);
  const [size, setSize] = React.useState({ width: 800, height: 600 });

  const data = React.useMemo(
    () => JSON.parse(JSON.stringify(graphData)) as { nodes: GraphNode[]; links: GraphLink[] },
    []
  );

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setSize({ width: el.clientWidth, height: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const hasHighlights = highlighted.size > 0;
  const highlightKey = React.useMemo(
    () => [...highlighted].sort().join(","),
    [highlighted]
  );

  // Keep the render loop alive while nodes pulse; pause when idle to save CPU.
  React.useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    if (hasHighlights || active) {
      fg.resumeAnimation?.();
    } else {
      // Let it settle, then stop repainting.
      const t = setTimeout(() => fg.pauseAnimation?.(), 1200);
      return () => clearTimeout(t);
    }
  }, [hasHighlights, active, highlightKey]);

  // Frame the lit cluster into the left ~55% of the viewport (the panel sits
  // on the right). zoomToFit's node-filter is unreliable across versions, so
  // compute the cluster bounds and drive zoom/center explicitly.
  React.useEffect(() => {
    const fg = fgRef.current;
    if (!fg || !hasHighlights) return;
    let timer: ReturnType<typeof setTimeout>;
    let tries = 0;
    const frame = () => {
      const hot = data.nodes.filter(
        (n) => highlighted.has(n.id) && Number.isFinite(n.x) && Number.isFinite(n.y)
      );
      // Coordinates may not be assigned yet on a cold layout — retry briefly.
      if (!hot.length && tries < 14) {
        tries++;
        timer = setTimeout(frame, 180);
        return;
      }
      if (!hot.length) return;
      const xs = hot.map((n) => n.x as number);
      const ys = hot.map((n) => n.y as number);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const spanX = Math.max(maxX - minX, 1);
      const spanY = Math.max(maxY - minY, 1);
      const availW = Math.max(size.width * 0.55, 320);
      const availH = Math.max(size.height * 0.6, 320);
      // +260 leaves room for the pulsing glow and node labels.
      const k = Math.max(
        1.6,
        Math.min(availW / (spanX + 260), availH / (spanY + 260), 4)
      );
      fg.zoom(k, 800);
      // Bias left so the glow isn't hidden behind the conversation panel.
      const offsetPx = size.width * 0.2;
      fg.centerAt(cx + offsetPx / k, cy, 800);
    };
    timer = setTimeout(frame, 200);
    return () => clearTimeout(timer);
  }, [highlightKey, hasHighlights, highlighted, data, size.width, size.height]);

  const paintNode = React.useCallback(
    (node: object, ctx: CanvasRenderingContext2D, scale: number) => {
      const n = node as GraphNode & { x: number; y: number };
      // On the first frame (before the force layout runs) coords can be
      // undefined/NaN — drawing with them throws on createRadialGradient.
      if (!Number.isFinite(n.x) || !Number.isFinite(n.y)) return;
      const color = CATEGORY_COLORS[n.category] ?? "#94a3b8";
      const baseR = Math.max(Math.sqrt(n.val) * 1.7, 2);
      const isHot = highlighted.has(n.id);

      // Dimmed background nodes when something is highlighted.
      if (hasHighlights && !isHot) {
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = "#94a3b8";
        ctx.beginPath();
        ctx.arc(n.x, n.y, baseR * 0.6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
        return;
      }

      if (isHot) {
        const phase = 0.5 + 0.5 * Math.sin(performance.now() / 480);
        const glowR = baseR + 10 + phase * 10;
        const grad = ctx.createRadialGradient(n.x, n.y, baseR, n.x, n.y, glowR);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.globalAlpha = 0.4 + 0.35 * phase;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, baseR + 2.4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = 1.8 / scale;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        const fontSize = Math.max(11 / scale, 3.5);
        ctx.font = `600 ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const ly = n.y + glowR + 2 / scale;
        // White halo so labels stay legible over edges and other glows.
        ctx.lineWidth = 3 / scale;
        ctx.strokeStyle = "rgba(255,255,255,0.92)";
        ctx.lineJoin = "round";
        ctx.strokeText(n.title, n.x, ly);
        ctx.fillStyle = "#0f172a";
        ctx.fillText(n.title, n.x, ly);
        return;
      }

      // Idle full graph — clean colored dots; labels only when zoomed in.
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(n.x, n.y, baseR, 0, 2 * Math.PI);
      ctx.fill();
      if (scale > 2.4) {
        const fontSize = Math.max(10 / scale, 3);
        ctx.font = `${fontSize}px Inter, sans-serif`;
        ctx.fillStyle = "#475569";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(n.title, n.x, n.y + baseR + 2 / scale);
      }
    },
    [highlighted, hasHighlights]
  );

  return (
    <div ref={containerRef} className="absolute inset-0">
      <ForceGraph2D
        ref={fgRef}
        width={size.width}
        height={size.height}
        graphData={data}
        backgroundColor="#ffffff"
        nodeId="id"
        nodeRelSize={2.6}
        nodeLabel={(n) => (n as GraphNode).title}
        warmupTicks={60}
        cooldownTicks={100}
        nodeCanvasObjectMode={() => "replace"}
        nodeCanvasObject={paintNode}
        linkColor={(l) => {
          if (!hasHighlights) return "#ececed";
          const lit =
            highlighted.has(linkEndId((l as GraphLink).source)) &&
            highlighted.has(linkEndId((l as GraphLink).target));
          return lit ? "#6b3aa0" : "rgba(228,228,231,0.35)";
        }}
        linkWidth={(l) => {
          if (!hasHighlights) return 0.5;
          const lit =
            highlighted.has(linkEndId((l as GraphLink).source)) &&
            highlighted.has(linkEndId((l as GraphLink).target));
          return lit ? 1.6 : 0.4;
        }}
        onNodeClick={(n) => onNodeClick?.((n as GraphNode).id)}
      />
    </div>
  );
}
