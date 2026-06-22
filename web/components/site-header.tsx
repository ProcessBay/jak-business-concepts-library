import Image from "next/image";
import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { BusinessProfileDialog } from "@/components/business-profile-dialog";
import { BrowseSidebar } from "@/components/browse-sidebar";
import { SaveRestoreDialog } from "@/components/save-restore-dialog";
import { HomeNavLink } from "@/components/home-nav-link";

const NAV_LINKS = [
  { href: "/library", label: "Library" },
  { href: "/model", label: "My Plan" },
  { href: "/playbooks", label: "Playbooks" },
  { href: "/graph", label: "Map" },
  { href: "/talk", label: "Talk" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
        {/* Hamburger doubles as the mobile nav hub (page links live inside it). */}
        <BrowseSidebar navLinks={NAV_LINKS} />
        <Link href="/" className="mr-1 flex shrink-0 items-center">
          <Image
            src="/processbay-logo.png"
            alt="ProcessBay"
            width={120}
            height={59}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Page nav — desktop only, sits next to the logo. */}
        <nav className="hidden items-center gap-0.5 md:flex">
          <HomeNavLink />
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions — pushed right, grouped. */}
        <div className="ms-auto flex items-center gap-1">
          <CommandMenu />
          <SaveRestoreDialog />
          <BusinessProfileDialog />
        </div>
      </div>
    </header>
  );
}
