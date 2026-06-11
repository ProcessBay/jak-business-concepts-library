/**
 * Build-time atom compiler: wiki markdown → lib/generated/atoms.json
 *
 * Mirrors the Python loader's rules (app.py load_wiki_atoms):
 *   - skip MOC_* files, sources/, empty files
 *   - canonical category folders win title collisions over
 *     concepts/frameworks/tools catch-alls
 *   - sections split on `## Header` lines (corpus was normalized to this)
 *
 * Runs via `predev`/`prebuild` so the index is always fresh.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WIKI_DIR = path.resolve(__dirname, "..", "..", "wiki");
const OUT_DIR = path.resolve(__dirname, "..", "lib", "generated");
const OUT_FILE = path.join(OUT_DIR, "atoms.json");

const CANONICAL = new Set([
  "business-models",
  "growth",
  "metrics",
  "platform-economics",
  "pricing",
  "strategy",
]);

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function parseSections(body) {
  const sections = {};
  let current = null;
  let buf = [];
  const flush = () => {
    if (current && buf.length) {
      const text = buf.join("\n").trim();
      if (text && !(current in sections)) sections[current] = text;
    }
  };
  for (const line of body.split("\n")) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      flush();
      current = h2[1].trim();
      buf = [];
      continue;
    }
    if (/^#\s+/.test(line)) {
      flush();
      current = null;
      buf = [];
      continue;
    }
    buf.push(line);
  }
  flush();
  return sections;
}

function definitionOf(body, sections) {
  for (const key of Object.keys(sections)) {
    if (key.toLowerCase().startsWith("definition")) return sections[key];
  }
  for (const para of body.split("\n\n")) {
    const p = para.trim();
    if (p && !p.startsWith("#") && !p.startsWith("**")) return p;
  }
  return "";
}

function relatedTitles(sections) {
  for (const key of Object.keys(sections)) {
    if (key.toLowerCase().startsWith("related")) {
      return [...sections[key].matchAll(/\[\[([^\]|]+?)(?:\|[^\]]*)?\]\]/g)].map(
        (m) => m[1].trim()
      );
    }
  }
  return [];
}

function normalizeList(v) {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === "string")
    return v
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((x) => x.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  return [];
}

const atoms = new Map(); // title -> atom

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "sources") continue;
      walk(full);
      continue;
    }
    if (!entry.name.endsWith(".md") || entry.name.startsWith("MOC_")) continue;
    const raw = fs.readFileSync(full, "utf-8");
    if (!raw.trim()) continue;

    let fm, body;
    try {
      ({ data: fm, content: body } = matter(raw));
    } catch {
      fm = {};
      body = raw;
    }

    const title = String(fm.title || entry.name.replace(/\.md$/, "").replace(/_/g, " ")).trim();
    const category = path.basename(path.dirname(full));
    const sections = parseSections(body);

    const atom = {
      title,
      slug: slugify(title),
      category,
      tags: normalizeList(fm.tags).map((t) => t.toLowerCase()),
      aliases: normalizeList(fm.aliases),
      definition: definitionOf(body, sections),
      sections,
      related: relatedTitles(sections),
      sources: normalizeList(fm.sources),
    };

    const existing = atoms.get(title);
    if (!existing) {
      atoms.set(title, atom);
    } else if (!CANONICAL.has(existing.category) && CANONICAL.has(category)) {
      atoms.set(title, atom); // canonical wins
    } // else keep existing (canonical or first)
  }
}

if (!fs.existsSync(WIKI_DIR)) {
  // CLI deploys upload only web/ — the wiki lives one level up and won't be
  // present. Fall back to the committed index instead of failing the build.
  if (fs.existsSync(OUT_FILE)) {
    console.log(`wiki dir not found (${WIKI_DIR}); using committed atoms.json`);
    process.exit(0);
  }
  console.error(`wiki dir not found and no committed atoms.json: ${WIKI_DIR}`);
  process.exit(1);
}
walk(WIKI_DIR);

// Resolve related titles to slugs (drop dead links)
const byTitle = new Map([...atoms.values()].map((a) => [a.title.toLowerCase(), a]));
for (const atom of atoms.values()) {
  atom.related = atom.related
    .map((t) => byTitle.get(t.toLowerCase()))
    .filter((a) => a && a.slug !== atom.slug)
    .map((a) => ({ title: a.title, slug: a.slug }));
}

// Second dedup pass: distinct titles can slugify identically
// ("Ecosystem-Based" vs "Ecosystem Based"). Slugs are route params and React
// keys, so they MUST be unique. Canonical-folder atoms win; else first kept.
const bySlug = new Map();
for (const atom of atoms.values()) {
  const existing = bySlug.get(atom.slug);
  if (!existing) {
    bySlug.set(atom.slug, atom);
  } else if (!CANONICAL.has(existing.category) && CANONICAL.has(atom.category)) {
    bySlug.set(atom.slug, atom);
  } else {
    console.log(`  slug collision: dropping "${atom.title}" (keeps "${existing.title}")`);
  }
}

const list = [...bySlug.values()].sort((a, b) => a.title.localeCompare(b.title));
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(list, null, 0));

// Slim index for client bundles (command palette, library browser) —
// no sections, definition trimmed. ~10x smaller than the full index.
const stripMd = (s) =>
  s
    .replace(/\[\[([^\]|]+?)(?:\|[^\]]*)?\]\]/g, "$1") // wiki links
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/\*([^*]+)\*/g, "$1") // italic
    .replace(/`([^`]+)`/g, "$1") // code
    .replace(/\s+/g, " ")
    .trim();
const firstSentence = (s) => {
  const clean = stripMd(s.replace(/\n/g, " "));
  const m = clean.match(/^(.{20,180}?[.!?])(?:\s|$)/);
  return m ? m[1] : clean.slice(0, 160);
};
const slim = list.map((a) => ({
  title: a.title,
  slug: a.slug,
  category: a.category,
  aliases: a.aliases,
  blurb: firstSentence(a.definition || ""),
}));
fs.writeFileSync(path.join(OUT_DIR, "atoms-index.json"), JSON.stringify(slim, null, 0));

// Knowledge-graph edge list for the /graph visualization. Undirected edges
// from `related` links, deduped (a->b == b->a).
const edgeSet = new Set();
const links = [];
for (const a of list) {
  for (const r of a.related) {
    const key = [a.slug, r.slug].sort().join("|");
    if (edgeSet.has(key)) continue;
    edgeSet.add(key);
    links.push({ source: a.slug, target: r.slug });
  }
}
const degree = {};
for (const l of links) {
  degree[l.source] = (degree[l.source] || 0) + 1;
  degree[l.target] = (degree[l.target] || 0) + 1;
}
const nodes = list.map((a) => ({
  id: a.slug,
  title: a.title,
  category: a.category,
  blurb: firstSentence(a.definition || ""),
  val: 1 + (degree[a.slug] || 0), // node size ~ connectedness
}));
fs.writeFileSync(
  path.join(OUT_DIR, "graph.json"),
  JSON.stringify({ nodes, links }, null, 0)
);
console.log(`Graph: ${nodes.length} nodes, ${links.length} edges`);

const byCat = {};
for (const a of list) byCat[a.category] = (byCat[a.category] || 0) + 1;
console.log(`Compiled ${list.length} atoms → ${path.relative(process.cwd(), OUT_FILE)}`);
for (const [c, n] of Object.entries(byCat).sort()) console.log(`  ${c}: ${n}`);
