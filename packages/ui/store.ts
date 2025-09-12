import { create } from "zustand";

export type Channel = "linkedin" | "email";
export type Step = "goal" | "audience" | "channels" | "review";

export interface CampaignState {
  step: Step;
  goal: string;
  audience: string;
  channels: Channel[];
  next: () => void;
  back: () => void;
  reset: () => void;
  setGoal: (v: string) => void;
  setAudience: (v: string) => void;
  toggleChannel: (ch: Channel) => void;
}

const order: Step[] = ["goal", "audience", "channels", "review"];

export const useCampaign = create<CampaignState>((set, get) => ({
  step: "goal",
  goal: "",
  audience: "",
  channels: [],
  next: () => {
    const idx = order.indexOf(get().step);
    set({ step: order[Math.min(idx + 1, order.length - 1)] });
  },
  back: () => {
    const idx = order.indexOf(get().step);
    set({ step: order[Math.max(idx - 1, 0)] });
  },
  reset: () => set({ step: "goal", goal: "", audience: "", channels: [] }),
  setGoal: (v) => set({ goal: v }),
  setAudience: (v) => set({ audience: v }),
  toggleChannel: (ch) =>
    set((s) => {
      const exists = s.channels.includes(ch);
      return { channels: exists ? s.channels.filter((c) => c !== ch) : [...s.channels, ch] };
    })
}));
