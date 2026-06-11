/**
 * Guided playbooks — hand-curated journeys through the knowledge graph.
 *
 * Each playbook takes a real business question and sequences 5-6 concepts
 * into a path from question to decision. The curation IS the product:
 * step framings explain why this concept now; applyQuery is the exact
 * personalized question the step fires into chat.
 *
 * Every conceptSlug must exist in atoms.json — the [slug] page resolves
 * them at build time, so a bad slug fails `next build` (by design).
 */

export interface PlaybookStep {
  conceptSlug: string;
  /** Why this step, at this point in the journey. 1-2 sentences, JAK voice. */
  framing: string;
  /** The personalized question this step fires into chat. */
  applyQuery: string;
}

export interface Playbook {
  slug: string;
  title: string;
  question: string;
  tagline: string;
  minutes: number;
  steps: PlaybookStep[];
  /** Final synthesis prompt — fired after the steps, pulls it together. */
  synthesisQuery: string;
}

export const playbooks: Playbook[] = [
  {
    slug: "price-your-product",
    title: "Price your product",
    question: "What should we charge — and how should the pricing be structured?",
    tagline:
      "From 'what do competitors charge?' to a defensible price architecture you can test.",
    minutes: 15,
    steps: [
      {
        conceptSlug: "three-pricing-strategy-approaches",
        framing:
          "Start with the fork in the road: cost-plus, competitor-based, or value-based. Most teams pick one by accident. Pick yours on purpose.",
        applyQuery:
          "We're working through pricing strategy. Of the three pricing approaches (cost-plus, competitor-based, value-based), which fits our business best and why? Be honest about which we're probably using by default today.",
      },
      {
        conceptSlug: "value-based-pricing",
        framing:
          "Whatever you chose, you need to know what your product is actually worth to the customer — even cost-plus shops underprice because they never asked.",
        applyQuery:
          "Apply value-based pricing to our business: what measurable value do we create for customers, can we quantify it, and what share of that value could our price realistically capture?",
      },
      {
        conceptSlug: "three-tier-pricing",
        framing:
          "One price is a guess; three prices is a strategy. Good-better-best lets customers segment themselves.",
        applyQuery:
          "Design a three-tier (good-better-best) pricing structure for our business. What goes in each tier, which tier should anchor, and what should the price gaps look like?",
      },
      {
        conceptSlug: "penny-gap",
        framing:
          "The hardest price increase is from free to anything. If any part of your funnel is free, this is where it leaks.",
        applyQuery:
          "Where does the penny gap show up in our business, and how should we design the free-to-paid transition so the first payment feels obvious instead of painful?",
      },
      {
        conceptSlug: "saas-pricing-experimentation",
        framing:
          "Pricing isn't a decision, it's a process. The teams that win re-price every 6-12 months with actual tests.",
        applyQuery:
          "Design a pricing experimentation plan for our business: what should we test first, how do we test it without alienating existing customers, and what metrics tell us it worked?",
      },
    ],
    synthesisQuery:
      "We just worked through a pricing playbook: pricing approach, value-based pricing, three-tier structure, the penny gap, and pricing experimentation. Pull it together into ONE concrete pricing recommendation for our business: the approach, the structure with example price points, and the first experiment to run. Be decisive.",
  },
  {
    slug: "add-recurring-revenue",
    title: "Add recurring revenue",
    question: "How do we get off the project/one-off treadmill?",
    tagline:
      "Lumpy revenue to predictable revenue — find the recurring mechanism that fits how you already create value.",
    minutes: 15,
    steps: [
      {
        conceptSlug: "subscription-business-model",
        framing:
          "The default answer — but subscriptions only work when value recurs naturally. First test: does your customer get value every month, or only when something breaks?",
        applyQuery:
          "Could a subscription model work for our business? What would customers pay for monthly, does our value actually recur, and what's the honest risk this becomes shelf-ware churn?",
      },
      {
        conceptSlug: "consumption-based-revenue-model",
        framing:
          "If value doesn't recur on a calendar, maybe it recurs with usage. Consumption pricing tracks value delivery more honestly than subscriptions.",
        applyQuery:
          "Would consumption-based (pay-per-use) revenue fit our business better than flat subscriptions? What's our natural usage unit, and how predictable would revenue actually be?",
      },
      {
        conceptSlug: "land-and-expand-model",
        framing:
          "Recurring revenue often hides inside existing customers. Land small, expand deliberately — especially powerful for services firms.",
        applyQuery:
          "Apply land-and-expand to our business: what's the smallest land we could offer, what's the expansion path inside one account, and what would 'expand' concretely look like for our top 3 customers?",
      },
      {
        conceptSlug: "switching-costs",
        framing:
          "Recurring revenue without switching costs is just a monthly invitation to leave. Build the moat alongside the model.",
        applyQuery:
          "What switching costs could we ethically build into our business so recurring customers stay because leaving is genuinely costly — not because of a contract trap?",
      },
      {
        conceptSlug: "churn-rate",
        framing:
          "The recurring model lives or dies on one number. Know your churn math before you bet the company on subscriptions.",
        applyQuery:
          "What churn rate would make a recurring model viable for our business? Walk through the math: at our likely price point and acquisition cost, what monthly churn can we survive?",
      },
    ],
    synthesisQuery:
      "We just worked through a recurring-revenue playbook: subscription, consumption-based, land-and-expand, switching costs, and churn math. Recommend ONE recurring-revenue mechanism for our business, the first offer to launch it with, and the two numbers to watch in the first 90 days. Be decisive.",
  },
  {
    slug: "find-your-growth-engine",
    title: "Find your growth engine",
    question: "Which growth lever should we actually bet on?",
    tagline:
      "Stop sprinkling marketing budget. Find the one engine that compounds for your kind of business.",
    minutes: 18,
    steps: [
      {
        conceptSlug: "go-to-market-strategy",
        framing:
          "Growth tactics without a GTM strategy is throwing darts blindfolded. Frame who you're for and how you reach them first.",
        applyQuery:
          "Sketch our go-to-market strategy: who exactly is our ideal customer, what channel reaches them most directly, and what's the message that makes them stop scrolling?",
      },
      {
        conceptSlug: "sales-led-vs-product-led-gtm",
        framing:
          "The biggest fork in growth: humans sell it, or the product sells itself. Your price point and complexity already made this choice — find out what it chose.",
        applyQuery:
          "Should our business be sales-led or product-led? Given our price point, sales cycle, and product complexity, which motion fits — and what would switching cost us?",
      },
      {
        conceptSlug: "aarrr-framework",
        framing:
          "Now instrument the funnel. AARRR tells you where growth is leaking before you pour more in the top.",
        applyQuery:
          "Map our business onto the AARRR funnel: what does acquisition, activation, retention, referral, and revenue concretely look like for us, and which stage is our weakest link right now?",
      },
      {
        conceptSlug: "viral-growth-loops",
        framing:
          "The cheapest growth is customers who bring customers. Most businesses have a latent loop they never engineered.",
        applyQuery:
          "Is there a viral growth loop hiding in our business? Design one: what would make our existing customers naturally expose us to new ones, and what's the loop's cycle time?",
      },
      {
        conceptSlug: "referral-programs",
        framing:
          "If the loop won't run on its own, pay it to run. Referral programs formalize word-of-mouth — when the incentives are right.",
        applyQuery:
          "Design a referral program for our business: what's the double-sided incentive, what would it cost per referred customer versus our current acquisition cost, and where would we surface it?",
      },
      {
        conceptSlug: "growth-hacking-kpi-baselines",
        framing:
          "Finally: know what good looks like. Baselines stop you from celebrating numbers that are actually mediocre.",
        applyQuery:
          "What KPI baselines should we benchmark our growth against, given our business model and stage? Which of our current numbers is probably furthest below baseline?",
      },
    ],
    synthesisQuery:
      "We just worked through a growth playbook: GTM strategy, sales-led vs product-led, AARRR funnel, viral loops, referral programs, and KPI baselines. Pick the ONE growth engine we should bet on for the next two quarters, why it beats the alternatives for our specific business, and the first three moves to build it. Be decisive.",
  },
  {
    slug: "build-a-moat",
    title: "Build a moat",
    question: "Why won't someone copy us — and what do we do about it?",
    tagline:
      "Differentiation fades. Engineer the structural reasons customers stay and competitors stall.",
    minutes: 12,
    steps: [
      {
        conceptSlug: "value-proposition-and-usp",
        framing:
          "Before defending the castle, be sure there's a castle. What do you do that customers would genuinely miss?",
        applyQuery:
          "Stress-test our value proposition and USP: what do we offer that customers would genuinely miss if we vanished, and how much of it could a competent competitor replicate in six months?",
      },
      {
        conceptSlug: "differentiation-strategy",
        framing:
          "Differentiation is a choice about where to be different, not just better. Better fades; different compounds.",
        applyQuery:
          "Apply differentiation strategy to our business: on which dimension should we be deliberately different (not just better), and what would we have to stop doing to make that difference sharp?",
      },
      {
        conceptSlug: "switching-costs",
        framing:
          "The quietest moat: make leaving expensive in time, data, or habit — ethically, by being load-bearing.",
        applyQuery:
          "What ethical switching costs could we build so customers stay because we're load-bearing in their operations — accumulated data, integrations, workflows, or expertise?",
      },
      {
        conceptSlug: "direct-vs-indirect-network-effects",
        framing:
          "The strongest moat in the book: every customer makes the product better for the next one. Most businesses have a weak version they never strengthen.",
        applyQuery:
          "Do we have any latent network effects — direct or indirect? If a weak one exists, how could we strengthen it; if none exists, could we design one into how customers use us?",
      },
      {
        conceptSlug: "critical-mass",
        framing:
          "Network effects only kick in past a threshold. Know your critical mass number — and whether you can afford to reach it.",
        applyQuery:
          "If we pursued the network effect we just identified, what's our critical mass — how many users/customers before it becomes self-sustaining, and what does reaching that number cost?",
      },
    ],
    synthesisQuery:
      "We just worked through a moat-building playbook: value proposition, differentiation, switching costs, network effects, and critical mass. Which ONE moat should our business invest in for the next year, why it's the most defensible option for us specifically, and the first concrete brick to lay. Be decisive.",
  },
  {
    slug: "fix-your-unit-economics",
    title: "Fix your unit economics",
    question: "Are we actually making money per customer — and which number do we fix first?",
    tagline:
      "Five numbers decide whether growth is building a business or digging a hole.",
    minutes: 12,
    steps: [
      {
        conceptSlug: "customer-acquisition-cost",
        framing:
          "Start with the honest version of CAC — including salaries and the channel you pretend is free.",
        applyQuery:
          "Calculate our real customer acquisition cost: what should we include that we're probably ignoring (founder selling time, content, tools), and how does our CAC compare to what our business model can support?",
      },
      {
        conceptSlug: "customer-lifetime-value",
        framing:
          "CAC means nothing alone. LTV tells you what a customer is worth across the whole relationship — the ratio is the verdict.",
        applyQuery:
          "Estimate our customer lifetime value and the LTV:CAC ratio. Is the ratio healthy for our model, and which input (margin, retention, frequency) is dragging it down most?",
      },
      {
        conceptSlug: "churn-rate",
        framing:
          "Churn is the silent killer of LTV. A small monthly leak compounds into a structural ceiling on growth.",
        applyQuery:
          "Analyze churn in our business: what's our churn rate (or its equivalent for our model), what's it costing us in LTV, and what are the top two churn drivers we could attack this quarter?",
      },
      {
        conceptSlug: "customer-conversion-rate",
        framing:
          "Sometimes the cheapest fix isn't acquisition or retention — it's converting more of the demand you already have.",
        applyQuery:
          "Where are our conversion rate leaks? Map our funnel from first touch to paid, estimate the conversion at each step, and identify the single step where improvement is cheapest.",
      },
      {
        conceptSlug: "customer-health-score",
        framing:
          "Finally, get ahead of the numbers: a health score predicts churn and expansion before they show up in revenue.",
        applyQuery:
          "Design a customer health score for our business: which 3-5 behavioral signals would predict churn or expansion for us, and what would we do differently next month if we tracked them?",
      },
    ],
    synthesisQuery:
      "We just worked through a unit-economics playbook: CAC, LTV, churn, conversion, and customer health. Give the verdict on our unit economics, name the ONE number to fix first, and lay out a 30-day plan to move it. Be decisive.",
  },
  {
    slug: "become-a-platform",
    title: "Should you become a platform?",
    question: "Everyone says 'platform' — does it actually make sense for us?",
    tagline:
      "The honest test, before you spend two years building a marketplace nobody comes to.",
    minutes: 15,
    steps: [
      {
        conceptSlug: "marketplace-business-model",
        framing:
          "First, what a platform actually is: you stop selling the thing and start matching the people who do. That shift changes everything.",
        applyQuery:
          "Could our business become a marketplace? Who would the two sides be, what's the matching problem we'd solve, and what do we currently do that a marketplace would cannibalize?",
      },
      {
        conceptSlug: "two-sided-network-effects",
        framing:
          "Platforms live on cross-side effects: more supply attracts demand attracts supply. If the loop doesn't spin for you, the platform is a mall with no anchor store.",
        applyQuery:
          "Map the two-sided network effects for our potential platform: which side do we subsidize first, what's the cross-side value, and where would the chicken-and-egg problem bite hardest?",
      },
      {
        conceptSlug: "critical-mass",
        framing:
          "The platform graveyard is full of products that needed 10,000 users to be useful and died at 800. Know the number.",
        applyQuery:
          "Estimate critical mass for our potential platform: how much supply and demand do we need before it's self-sustaining, and can we realistically fund the journey there?",
      },
      {
        conceptSlug: "take-rate-economics",
        framing:
          "Platforms monetize by taking a cut. Too high and the sides go around you; too low and you starve. The take rate IS the business model.",
        applyQuery:
          "What take rate could our platform sustain? What's the value we'd add to each transaction, and at what rate would participants start dealing around us?",
      },
      {
        conceptSlug: "negative-network-effects-and-curation",
        framing:
          "Success creates the next problem: scale degrades quality unless you curate. The platforms that endure are the ones that police themselves.",
        applyQuery:
          "If our platform worked, where would negative network effects appear first — spam, quality dilution, congestion — and what curation mechanism would we need from day one?",
      },
    ],
    synthesisQuery:
      "We just worked through a platform-readiness playbook: marketplace model, two-sided network effects, critical mass, take-rate economics, and curation. Give the honest verdict: should our business pursue a platform play — yes, no, or not yet? Justify it with our specifics, and if 'not yet', name the precondition that would flip the answer. Be decisive.",
  },
];

export const playbookBySlug = new Map(playbooks.map((p) => [p.slug, p]));
