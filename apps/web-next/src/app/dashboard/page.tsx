"use client";

import { useState } from "react";
import type { JSX } from "react";
import { CampaignWizard } from "@jeli/ui";

type Person = {
  id: number;
  name: string;
  title: string;
  status: "reach" | "pending" | "connected";
};

const seed: Person[] = [
  { id: 1, name: "Zhansar Zhaparov", title: "Software Engineer at Google", status: "reach" },
  { id: 2, name: "Arystan Ospanbekov", title: "Product Manager at Apple", status: "reach" },
  { id: 3, name: "Karaganda Karaganda", title: "Data Scientist at Amazon", status: "pending" }
];

export default function DashboardPage() {
  const [people, setPeople] = useState<Person[]>(seed);

  const move = (id: number, status: Person["status"]) =>
    setPeople((ps) => ps.map((p) => (p.id === id ? { ...p, status } : p)));

  const Column = ({
    title,
    filter,
    cta
  }: {
    title: string;
    filter: Person["status"];
    cta?: (p: Person) => JSX.Element;
  }) => (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">{title}</h3>
      <ul className="space-y-3">
        {people.filter((p) => p.status === filter).map((p) => (
          <li key={p.id} className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-neutral-600">{p.title}</div>
            </div>
            <div className="flex gap-2">
              {filter !== "reach" && (
                <button className="rounded-md border px-3 py-1.5 text-sm" onClick={() => move(p.id, "reach")}>
                  Return
                </button>
              )}
              {filter === "reach" && (
                <button
                  className="rounded-md bg-[var(--brand)] px-3 py-1.5 text-sm text-white"
                  onClick={() => move(p.id, "pending")}
                >
                  Reachout
                </button>
              )}
              {filter === "pending" && (
                <button
                  className="rounded-md border px-3 py-1.5 text-sm"
                  onClick={() => move(p.id, "connected")}
                >
                  Mark Connected
                </button>
              )}
              {cta ? cta(p) : null}
            </div>
          </li>
        ))}
        {people.filter((p) => p.status === filter).length === 0 && (
          <div className="text-sm text-neutral-500">No items.</div>
        )}
      </ul>
    </div>
  );

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Network Pipeline</h1>
        <p className="text-sm text-neutral-500">Quickly triage and launch campaigns.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Column title="Yet to Reach Out" filter="reach" />
        <Column title="Pending" filter="pending" />
        <Column title="Connected" filter="connected" />
      </div>

      {/* --- Campaign builder from @jeli/ui --- */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Start a Campaign</h2>
        <CampaignWizard
          onComplete={(payload) => {
            // optional: do something after wizard completes
            console.log("Campaign created:", payload);
          }}
        />
      </div>
    </section>
  );
}
