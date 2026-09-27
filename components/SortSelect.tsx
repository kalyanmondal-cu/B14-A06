"use client";

import { ChevronDown } from "lucide-react";

export type SortOption = "duration" | "calories" | "rating";
export default function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <label className="relative flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
      Sort By
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none rounded-full border border-[#292d27] bg-[#111310] 
        py-2.5 pl-4 pr-9 text-xs font-bold uppercase tracking-wider text-zinc-200 outline-none focus:border-[#ccff00]/60"
      >
        <option value="duration">Duration</option>
        <option value="calories">Calories</option>
        <option value="rating">Rating</option>
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
      />
    </label>
  );
}
