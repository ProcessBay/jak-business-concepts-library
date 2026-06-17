import Image from "next/image";
import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { BusinessProfileDialog } from "@/components/business-profile-dialog";
import { BrowseSidebar } from "@/components/browse-sidebar";
import { SaveRestoreDialog } from "@/components/save-restore-dialog";
import { HomeNavLink } from "@/components/home-nav-link";

const NAV_LINKS = [
  { href: "/library", label: "Library" },
  { href: "/model", label: "My Model" },
  { href: "/playbooks", label: "Playbooks" },
  { href: "/graph", label: "Map" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
        {/* Hamburger doubles as the mobile nav hub (page links live inside it). */}
        <BrowseSidebar navLinks={NAV_LINKS} />
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/processbay-logo.png"
            alt="ProcessBay"
            width={120}
            height={59}
            className="h-8 w-auto"
            priority
          />
          <span className="hidden text-sm font-medium text-muted-foreground lg:inline">
            JAK Business Concepts Library
          </span>
        </Link>

        {/* Full text nav — desktop only. */}
        <nav className="ms-auto hidden items-center gap-1 md:flex">
          <HomeNavLink />
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <CommandMenu />
          <SaveRestoreDialog />
          <BusinessProfileDialog />
        </nav>

        {/* Mobile: just the essentials — save + profile; nav is in the sheet. */}
        <div className="ms-auto flex items-center gap-1 md:hidden">
          <SaveRestoreDialog />
          <BusinessProfileDialog />
        </div>
      </div>
    </header>
  );
}
