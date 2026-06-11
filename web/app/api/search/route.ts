import { searchAtoms } from "@/lib/search";

/** Lightweight local search — powers the related-concept chips under each
 *  answer. No LLM involved; returns in single-digit milliseconds. */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  const hits = searchAtoms(q, 5);
  return Response.json(
    hits.map(({ atom }) => ({
      title: atom.title,
      slug: atom.slug,
      category: atom.category,
    }))
  );
}
