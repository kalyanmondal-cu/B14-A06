import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#292d27] bg-[#111310] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/40 hover:bg-[#151813]"
    >
      <div className="relative aspect-[1.45] overflow-hidden bg-[#191c17]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#111310] to-transparent" />
        <div className="absolute left-4 bottom-4 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-lime-300 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-black backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="fit-display text-xl font-bold uppercase tracking-wide text-white">
            {workout.name}
          </h3>
          <p className="mt-1 text-xs font-medium text-zinc-500">
            {workout.equipment}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-[#292d27] pt-4 text-xs font-semibold text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} /> {workout.duration} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Flame size={14} /> {workout.caloriesBurned} kcal
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#ccff00]">
            <Star size={14} fill="currentColor" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
