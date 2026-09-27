"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import { useFitLog } from "@/components/FitLogProvider";
import type { Workout } from "@/types";

export default function MyPlanPage() {
  const { plan, saved, done, removeFromPlan, removeFromSaved, markDone } =
    useFitLog();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [query, setQuery] = useState("");
  const list = tab === "plan" ? plan : saved;
  const filtered = useMemo(
    () =>
      list.filter((w) =>
        `${w.name} ${w.muscleGroups.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [list, query],
  );
  const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tab");
    if (t === "saved") setTab("saved");
  }, []);

  return (
    <main className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <div className="flex flex-col gap-5 border-b border-[#292d27] pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[.25em] text-[#ccff00]">
            02 / YOUR LOG
          </p>
          <h1 className="fit-display mt-2 text-5xl font-black uppercase">
            My Plan
          </h1>
          <p className="mt-2 text-zinc-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your log"
          className="w-full rounded-full border border-[#292d27] bg-[#111310] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-[#ccff00]/60 md:w-60"
        />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Metric label="Exercises" value={plan.length} />
        <Metric label="Minutes" value={minutes} />
        <Metric label="Calories" value={calories} />
      </div>
      <div className="mt-10 flex gap-1 rounded-xl border border-[#292d27] bg-[#111310] p-1">
        <button
          onClick={() => setTab("plan")}
          className={`flex-1 rounded-lg px-4 py-3 text-xs font-black uppercase tracking-wider ${tab === "plan" ? "bg-[#ccff00] text-[#090a09]" : "text-zinc-500"}`}
        >
          Today&apos;s Plan{" "}
          <span className="ml-1 opacity-60">{plan.length}</span>
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`flex-1 rounded-lg px-4 py-3 text-xs font-black uppercase tracking-wider ${tab === "saved" ? "bg-[#ccff00] text-[#090a09]" : "text-zinc-500"}`}
        >
          Saved <span className="ml-1 opacity-60">{saved.length}</span>
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length ? (
          filtered.map((workout) => (
            <PlanCard
              key={workout.id}
              workout={workout}
              tab={tab}
              isDone={done.includes(workout.id)}
              onRemove={() =>
                tab === "plan"
                  ? removeFromPlan(workout.id)
                  : removeFromSaved(workout.id)
              }
              onDone={() => markDone(workout.id)}
            />
          ))
        ) : (
          <EmptyState tab={tab} />
        )}
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#292d27] bg-[#111310] p-5">
      <p className="text-[10px] font-black uppercase tracking-[.18em] text-zinc-600">
        {label}
      </p>
      <p className="fit-display mt-1 text-4xl font-bold">{value}</p>
    </div>
  );
}

function PlanCard({
  workout,
  tab,
  isDone,
  onRemove,
  onDone,
}: {
  workout: Workout;
  tab: "plan" | "saved";
  isDone: boolean;
  onRemove: () => void;
  onDone: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-5 rounded-2xl border border-[#292d27] bg-[#111310] p-4 sm:flex-row sm:items-center ${isDone ? "opacity-60" : ""}`}
    >
      <img
        src={workout.image}
        alt=""
        className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-36"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#292d27] px-2 py-1 text-[9px] font-black uppercase tracking-wider text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="fit-display mt-2 truncate text-2xl font-bold uppercase">
          {workout.name}
        </h2>
        <p className="text-xs text-zinc-600">{workout.equipment}</p>
        <div className="mt-3 flex gap-4 text-xs font-semibold text-zinc-500">
          <span className="inline-flex items-center gap-1">
            <Clock3 size={13} />
            {workout.duration}m
          </span>
          <span className="inline-flex items-center gap-1">
            <Flame size={13} />
            {workout.caloriesBurned}
          </span>
          <span className="inline-flex items-center gap-1 text-[#ccff00]">
            <Star size={13} fill="currentColor" />
            {workout.rating}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:w-[260px] sm:justify-end">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-lg border border-[#292d27] px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:border-[#ccff00]/50"
        >
          View Details
        </Link>
        {tab === "plan" && (
          <button
            onClick={onDone}
            disabled={isDone}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-200 disabled:opacity-40"
          >
            <Check size={14} />
            {isDone ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={onRemove}
          className="grid h-9 w-9 place-items-center rounded-lg border border-[#292d27] text-zinc-500 hover:border-red-900 hover:text-red-300"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}

function EmptyState({ tab }: { tab: "plan" | "saved" }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#34382f] bg-[#0d0f0c] px-6 py-16 text-center">
      <p className="fit-display text-3xl font-bold uppercase">
        Nothing here yet
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600">
        {tab === "plan"
          ? "Browse the library and add a lift to get today moving."
          : "Save a lift from the library and it will show up here."}
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-[#ccff00] px-5 py-3 text-xs font-black uppercase tracking-wider text-[#090a09]"
      >
        Go to workouts
      </Link>
    </div>
  );
}
