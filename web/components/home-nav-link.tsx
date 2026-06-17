"use client";

import { usePathname, useRouter } from "next/navigation";

/**
 * "Home" nav item. Clicking it always lands on a FRESH home dashboard:
 * if you're already on "/" (e.g. mid-conversation), it fires a reset event
 * the Chat listens for, so you don't just see your last answer again.
 */
export function HomeNavLink() {
  const router = useRouter();
  const pathname = usePathname();

  function go(e: React.MouseEvent) {
    e.preventDefault();
    if (pathname === "/") {
      window.dispatchEvent(new Event("jak:new-chat"));
    } else {
      router.push("/");
    }
  }

  return (
    <a
      href="/"
      onClick={go}
      className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      Home
    </a>
  );
}
