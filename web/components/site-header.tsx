import Image from "next/image";
import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { BusinessProfileDialog } from "@/components/business-profile-dialog";
import { BrowseSidebar } from "@/components/browse-sidebar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4">
        <BrowseSidebar />
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/processbay-logo.png"
            alt="ProcessBay"
            width={120}
            height={59}
            className="h-8 w-auto"
            priority
          />
          <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
            JAK Business Concepts Library
          </span>
        </Link>
        <nav className="ms-auto flex items-center gap-1">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Ask
          </Link>
          <Link
            href="/library"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Library
          </Link>
          <Link
            href="/model"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            My Model
          </Link>
          <Link
            href="/playbooks"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Playbooks
          </Link>
          <Link
            href="/graph"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Map
          </Link>
          <CommandMenu />
          <BusinessProfileDialog />
        </nav>
      </div>
    </header>
  );
}
