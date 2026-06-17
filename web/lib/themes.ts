/**
 * Engaging, action-oriented framing for the raw atom categories. Used by the
 * library and the browse sidebar so the 380-concept library reads like a set
 * of things you can DO, not a taxonomy. Order tells a narrative: strategize →
 * model → price → grow → defend → measure → reference.
 */
export interface Theme {
  category: string;
  title: string;
  blurb: string;
}

export const THEMES: Theme[] = [
  {
    category: "strategy",
    title: "Sharpen your strategy",
    blurb: "Positioning, differentiation, and where you win",
  },
  {
    category: "business-models",
    title: "Shape your business model",
    blurb: "How you create, deliver, and capture value",
  },
  {
    category: "pricing",
    title: "Set your price",
    blurb: "What to charge and how to package it",
  },
  {
    category: "growth",
    title: "Grow faster",
    blurb: "Acquisition, retention, and referral engines",
  },
  {
    category: "platform-economics",
    title: "Build a moat",
    blurb: "Network effects, platforms, and defensibility",
  },
  {
    category: "metrics",
    title: "Know your numbers",
    blurb: "The metrics and unit economics that matter",
  },
  {
    category: "frameworks",
    title: "Proven frameworks",
    blurb: "Battle-tested models to structure your thinking",
  },
  {
    category: "tools",
    title: "Practical tools",
    blurb: "Tactics and instruments you can apply now",
  },
  {
    category: "concepts",
    title: "Core concepts",
    blurb: "The foundational ideas behind great businesses",
  },
];

export const THEME_BY_CATEGORY: Record<string, Theme> = Object.fromEntries(
  THEMES.map((t) => [t.category, t])
);

export function themeTitle(category: string): string {
  return THEME_BY_CATEGORY[category]?.title ?? category;
}
