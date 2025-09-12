"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/api/health", label: "API" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-semibold" style={{ color: "var(--brand)" }}>
          Jeli.ai
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cx(
                "rounded-md px-3 py-1.5 text-sm",
                pathname === l.href ? "bg-neutral-100 font-medium" : "text-neutral-600 hover:bg-neutral-50"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/signin"
            className="rounded-md bg-[var(--brand)] px-3 py-1.5 text-sm text-white"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden rounded-md border px-3 py-1.5 text-sm"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-6 py-3 space-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cx(
                  "block rounded-md px-3 py-2 text-sm",
                  pathname === l.href ? "bg-neutral-100 font-medium" : "text-neutral-700 hover:bg-neutral-50"
                )}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/signin"
              className="block rounded-md bg-[var(--brand)] px-3 py-2 text-sm text-white"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
