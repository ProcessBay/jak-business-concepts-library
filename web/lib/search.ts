/**
 * TypeScript port of the Python search (app.py: tokenize / expand_query /
 * search_atoms / detect_intent). Same synonym maps, same scoring weights,
 * so ranking behavior matches the Streamlit version exactly.
 *
 * Note: the synonym maps are scheduled for retirement in Phase 3 when
 * embeddings land — do not invest in growing them.
 */
import { atoms, type Atom } from "@/lib/atoms";

const PHRASE_SYNONYMS: Record<string, string> = {
  "ice cream": "food retail consumer dtc physical shop subscription scalable",
  "ice cream shop": "food retail consumer dtc physical subscription scalable land expand",
  "ice cream business": "food retail consumer dtc subscription scalable",
  restaurant: "food retail consumer service scalable",
  "coffee shop": "food retail consumer dtc subscription",
  "food business": "retail consumer dtc subscription scalable",
  "retail business": "consumer dtc subscription scalable",
  ecommerce: "dtc retail consumer subscription",
  "small business": "scalable retail consumer",
  "consumer goods": "dtc retail consumer",
  "physical product": "dtc retail consumer scalable",
  "free trial": "freemium trial free conversion",
  "freemium model": "freemium business model",
  "network effect": "network platform two-sided critical mass indirect direct",
  "network effects": "network platform two-sided critical mass indirect direct",
  "saas metric": "cac ltv mrr churn arr retention conversion",
  "saas metrics": "cac ltv mrr churn arr retention conversion lifetime acquisition",
  "saas business": "subscription recurring software cloud",
  "growth strategy": "gtm go-to-market aarrr viral referral product-led sales-led distribution",
  "growth strategies": "gtm go-to-market aarrr viral referral product-led sales-led distribution influencer",
  "growth tactics": "gtm aarrr viral referral product-led",
  "growth hacking": "viral referral aarrr kpi growth",
  "business model": "monetization freemium subscription scalable land expand",
  "business models": "monetization freemium subscription scalable land expand",
  "pricing strategy": "pricing value-based tiered usage-based monetization saas",
  "pricing strategies": "pricing value-based tiered usage-based monetization saas",
  "competitive analysis": "competition porters competitive positioning",
  "go to market": "gtm distribution sales-led product-led",
  "two sided": "two-sided platform marketplace network",
  "product led": "product-led freemium gtm",
  "value proposition": "value usp positioning",
};

const WORD_SYNONYMS: Record<string, string> = {
  saas: "software subscription cloud b2b recurring",
  b2b: "saas enterprise business",
  b2c: "consumer retail",
  app: "software mobile consumer",
  mobile: "app consumer",
  startup: "scalable growth gtm",
  marketplace: "platform two-sided network",
  platform: "marketplace network two-sided",
  enterprise: "b2b saas",
  ai: "software app startup",
  price: "pricing monetization value-based",
  pricing: "monetization value-based freemium",
  monetize: "pricing monetization",
  monetization: "pricing revenue",
  cost: "cac acquisition",
  revenue: "mrr arr monetization",
  subscription: "recurring mrr saas",
  recurring: "subscription mrr arr",
  churn: "retention attrition",
  retention: "churn engagement lifetime",
  growth: "scale acquisition gtm viral referral",
  scale: "growth scalable scalability",
  scaling: "scale scalable",
  metric: "kpi measure analytics",
  metrics: "kpi measure analytics",
  kpi: "metric measure",
  viral: "referral growth loops",
  referral: "viral loops word-of-mouth",
  partnership: "alliance strategic partner",
  partner: "partnership alliance",
  strategy: "strategic positioning competitive",
  competition: "competitive porters strategy",
  competitor: "competitive porters",
  positioning: "perceptual strategy competitive value",
  food: "retail consumer restaurant",
  retail: "consumer dtc shop store",
  consumer: "retail dtc b2c",
  shop: "retail store consumer dtc",
  store: "retail shop consumer",
  physical: "retail consumer dtc",
  restaurant: "food retail consumer",
  dtc: "consumer retail direct",
  acquire: "acquisition cac",
  acquisition: "cac acquire customer",
};

const STOP_WORDS = new Set([
  "a","an","the","and","or","of","for","in","on","at","to","is","are",
  "what","how","why","when","where","who","which","should","can","do","does",
  "i","we","you","me","my","our","your","us","about","tell","explain",
  "describe","define","whats","thats","s","t","d","m","ll","re","ve",
  "them","they","it","be","with","have","has","had","this","that","these",
  "those","will","would","could","use","using","compare","comparing","versus",
  "vs","between","any","some","all","good","best","worst","give","show",
  "list","kinds","types","examples","example",
]);

const GREETINGS = new Set([
  "hi","hello","hey","yo","sup","hola","help","start","menu",
  "hi there","hey there","hello there","good morning","good evening",
]);

export function tokenize(text: string): string[] {
  const out: string[] = [];
  for (const raw of text.toLowerCase().match(/[a-z][a-z0-9'-]*/g) ?? []) {
    const tok = raw.replace(/^[-']+|[-']+$/g, "");
    if (tok.length <= 1 || STOP_WORDS.has(tok)) continue;
    out.push(tok);
  }
  return out;
}

function expandQuery(query: string): { direct: Set<string>; syn: Set<string> } {
  const q = query.toLowerCase();
  const direct = new Set(tokenize(q));
  const syn = new Set<string>();

  for (const [phrase, expansion] of Object.entries(PHRASE_SYNONYMS)) {
    if (q.includes(phrase)) {
      for (const t of tokenize(expansion)) if (!direct.has(t)) syn.add(t);
    }
  }
  for (const t of direct) {
    const exp = WORD_SYNONYMS[t];
    if (exp) for (const s of tokenize(exp)) if (!direct.has(s)) syn.add(s);
  }
  return { direct, syn };
}

// Precompute lowercase searchable text per atom once at module init.
const contentTextBySlug = new Map<string, string>(
  atoms.map((a) => [
    a.slug,
    [a.definition, ...Object.values(a.sections)].join("\n").toLowerCase(),
  ])
);
const titleTokensBySlug = new Map<string, Set<string>>(
  atoms.map((a) => [a.slug, new Set(tokenize(a.title))])
);

const CANONICAL_NOUNS = new Set(["model", "strategy", "framework", "pricing"]);

export interface SearchHit {
  score: number;
  atom: Atom;
}

const intersectCount = (a: Set<string>, b: Set<string>) => {
  let n = 0;
  for (const x of a) if (b.has(x)) n++;
  return n;
};

const countOccurrences = (haystack: string, needle: string) => {
  let n = 0,
    i = 0;
  while ((i = haystack.indexOf(needle, i)) !== -1) {
    n++;
    i += needle.length;
  }
  return n;
};

export function searchAtoms(query: string, topK = 8): SearchHit[] {
  if (!query.trim()) return [];

  const qLower = query.toLowerCase();
  const qPhrase = qLower.replace(/[^a-z0-9 -]+/g, " ").replace(/\s+/g, " ").trim();
  const { direct, syn } = expandQuery(query);
  if (direct.size === 0 && syn.size === 0) return [];

  const results: SearchHit[] = [];

  for (const atom of atoms) {
    let score = 0;
    const titleL = atom.title.toLowerCase();
    const contentL = contentTextBySlug.get(atom.slug)!;
    const titleTokens = titleTokensBySlug.get(atom.slug)!;

    if (qLower.includes(titleL)) score += 130;
    else if (qPhrase.length >= 4 && titleL.includes(qPhrase)) score += 70;

    if (qPhrase.includes(" ") && qPhrase.length >= 6 && contentL.includes(qPhrase))
      score += 45;

    score += intersectCount(titleTokens, direct) * 28;
    score += intersectCount(titleTokens, syn) * 9;

    if (
      intersectCount(titleTokens, direct) > 0 &&
      intersectCount(titleTokens, CANONICAL_NOUNS) > 0
    )
      score += 18;

    for (const alias of atom.aliases) {
      const aliasL = alias.toLowerCase();
      if (!aliasL) continue;
      if (qLower.includes(aliasL)) {
        score += 50;
        continue;
      }
      if (intersectCount(new Set(tokenize(aliasL)), direct) > 0) score += 18;
    }

    for (const tag of atom.tags) {
      if (direct.has(tag)) score += 14;
      else if (syn.has(tag)) score += 5;
      else {
        for (const t of direct) {
          if (t.length > 3 && (tag.includes(t) || t.includes(tag))) {
            score += 6;
            break;
          }
        }
      }
    }

    const catTokens = new Set(tokenize(atom.category.replace(/-/g, " ")));
    if (intersectCount(catTokens, direct) > 0) score += 18;
    else if (intersectCount(catTokens, syn) > 0) score += 7;

    for (const t of direct) {
      if (t.length <= 2) continue;
      const count = countOccurrences(contentL, t);
      if (count) score += Math.min(count, 12) * 1.5;
    }
    for (const t of syn) {
      if (t.length <= 2) continue;
      const count = countOccurrences(contentL, t);
      if (count) score += Math.min(count, 6) * 0.6;
    }

    if (score > 0) results.push({ score, atom });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topK);
}

export type Intent = "GREETING" | "COMPARISON" | "ADVICE" | "LIST" | "DEFINITION" | "GENERAL";

export function detectIntent(query: string): Intent {
  const q = query.toLowerCase().trim().replace(/[?.!]+$/g, "").trim();

  if (!q) return "GREETING";
  if (GREETINGS.has(q)) return "GREETING";
  if (q.length <= 6 && ["hi", "hey", "yo", "sup"].some((g) => q === g || q.startsWith(g + " ")))
    return "GREETING";

  if (/\bvs\.?\b|\bversus\b/.test(q)) return "COMPARISON";
  if (q.startsWith("compare ") || q.includes("difference between")) return "COMPARISON";

  if (/\b(should i|should we|recommend|advice|how (do|should|would) (i|we|you))\b/.test(q))
    return "ADVICE";
  if (/\bwhat\b[^?]{0,40}\b(model|strategy|approach|pricing|tactic)\b[^?]{0,40}\bfor\b/.test(q))
    return "ADVICE";
  if (/\bfor (?:a|an|my|our)\s+\w+/.test(q)) return "ADVICE";

  if (/^(list|all|types of|kinds of|examples of|show me|give me)\b/.test(q)) return "LIST";
  if (q.includes("frameworks") || q.includes("concepts")) return "LIST";

  if (/^(what (is|are|does)|define|explain|describe|tell me about|whats|what's)\b/.test(q))
    return "DEFINITION";

  if (q.split(/\s+/).length <= 4) return "LIST";

  return "GENERAL";
}
