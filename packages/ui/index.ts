export { useCampaign, type CampaignState, type Channel, type Step } from "./store";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className, ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition";
  const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-[var(--brand)] text-white hover:opacity-90",
    secondary: "border border-neutral-200 bg-white hover:bg-neutral-50",
    ghost: "hover:bg-neutral-50"
  };
  return <button className={[base, styles[variant], className].filter(Boolean).join(" ")} {...props} />;
};

export const Card: React.FC<React.PropsWithChildren<{ className?: string; title?: string }>> = ({
  className,
  title,
  children
}) => (
  <section className={["rounded-xl border bg-white p-4 shadow-sm", className].filter(Boolean).join(" ")}>
    {title && <h3 className="mb-2 text-base font-medium">{title}</h3>}
    {children}
  </section>
);

export const CampaignWizard: React.FC = () => {
  const { step, goal, audience, channels, setGoal, setAudience, toggleChannel, next, back, reset } =
    useCampaign();

  return (
    <Card className="max-w-xl">
      <div className="mb-3 text-sm text-neutral-500">Step: {step}</div>

      {step === "goal" && (
        <div className="space-y-2">
          <label className="text-sm">Goal</label>
          <input
            className="w-full rounded-md border px-3 py-2"
            placeholder="e.g., Book 5 intro calls"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
      )}

      {step === "audience" && (
        <div className="space-y-2">
          <label className="text-sm">Audience</label>
          <input
            className="w-full rounded-md border px-3 py-2"
            placeholder="e.g., PMs at Series A startups"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>
      )}

      {step === "channels" && (
        <div className="space-y-3">
          <div className="text-sm">Channels</div>
          <div className="flex gap-2">
            {(["linkedin", "email"] as const).map((c) => (
              <Button
                key={c}
                variant={channels.includes(c) ? "primary" : "secondary"}
                onClick={() => toggleChannel(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      )}

      {step === "review" && (
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Goal:</span> {goal || "—"}</div>
          <div><span className="font-medium">Audience:</span> {audience || "—"}</div>
          <div><span className="font-medium">Channels:</span> {channels.join(", ") || "—"}</div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button variant="secondary" onClick={back}>Back</Button>
        {step !== "review" ? (
          <Button onClick={next}>Next</Button>
        ) : (
          <Button onClick={reset}>Start over</Button>
        )}
      </div>
    </Card>
  );
};
