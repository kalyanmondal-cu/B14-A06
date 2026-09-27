"use client";

import { Bookmark, Plus } from "lucide-react";
import type { Workout } from "@/types";
import { useFitLog } from "./FitLogProvider";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { plan, addToPlan, saveForLater } = useFitLog();
  const atCap =
    plan.length >= 5 && !plan.some((item) => item.id === workout.id);
  const inPlan = plan.some((item) => item.id === workout.id);
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        disabled={atCap || inPlan}
        onClick={() => addToPlan(workout)}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-3.5 text-sm font-black uppercase tracking-wide text-[#090a09] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus size={18} />{" "}
        {inPlan ? "Already in today's plan" : "Add to today's plan"}
      </button>
      <button
        onClick={() => saveForLater(workout)}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#3a3e36] bg-[#111310] px-5 py-3.5 text-sm font-black uppercase tracking-wide text-white hover:border-[#ccff00]/50"
      >
        <Bookmark size={17} /> Save for later
      </button>
    </div>
  );
}
