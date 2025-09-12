import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jeli.ai — Effortless Networking with AI",
  description:
    "AI assistant for LinkedIn outreach: drafts, schedules, and triage so you focus on conversations."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <Link href="/" className="text-xl font-semibold" style={{ color: "var(--brand)" }}>
              Jeli.ai
            </Link>
            <div className="flex gap-4">
              <Link href="/dashboard" className="badge">Dashboard</Link>
              <a className="badge" href="/api/health">API Health</a>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

        <footer className="mt-20 border-t py-8 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Jeli.ai — LinkedIn networking made faster
        </footer>
      </body>
    </html>
  );
}
