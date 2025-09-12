import Link from "next/link";

export default function Page() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border bg-white p-10 shadow-sm">
        <p className="badge mb-4">/jeli</p>
        <h1 className="text-4xl font-bold tracking-tight">Jeli.AI</h1>
        <p className="mt-3 max-w-2xl text-neutral-600">
          AI assistant for LinkedIn outreach: drafts, schedules, and triage so you focus on conversations.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["JavaScript", "HTML", "CSS", "Next.js", "Zustand", "Playwright (E2E)"].map(t => (
            <span className="badge" key={t}>{t}</span>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-[var(--brand)] px-4 py-2 text-white"
          >
            Open Dashboard
          </Link>
          <a
            href="/api/health"
            className="rounded-lg border px-4 py-2"
          >
            Check API Health
          </a>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card
          title="Composable campaign flows"
          body="State-machine–friendly components to orchestrate outreach flows."
        />
        <Card
          title="Unbreakable onboarding"
          body="Playwright CI covers sign-in and happy paths so changes stay safe."
        />
      </div>
    </section>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-600">{body}</p>
    </div>
  );
}
