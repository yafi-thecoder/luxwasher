import { NAV_LINKS } from "@/lib/constants";
import { WashingMachine } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <WashingMachine className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">WashCycle</span>
          </div>
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} WashCycle. All rights reserved.
          </p>
          <nav className="flex gap-4">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
