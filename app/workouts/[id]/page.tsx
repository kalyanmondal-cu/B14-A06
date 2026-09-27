import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, Flame, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/api";
import DetailActions from "@/components/DetailActions";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) notFound();

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", String(workout.rating)],
  ];
  return (
    <main className="mx-auto max-w-350 px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <Link
        href="/#library"
        className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-zinc-500 hover:text-[#ccff00]"
      >
        <ArrowLeft size={15} /> Back to library
      </Link>
      <div className="grid overflow-hidden rounded-[28px] border border-[#292d27] bg-[#111310] lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-[440px] bg-[#171914] lg:min-h-[720px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#090a09] via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-[#111310]" />
        </div>
        <div className="flex flex-col p-7 sm:p-10 lg:p-14">
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#090a09]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="fit-display mt-5 text-5xl font-black uppercase leading-none sm:text-6xl">
            {workout.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            {workout.description}
          </p>

          <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-[#292d27] sm:grid-cols-4">
            <Stat
              icon={<Clock3 size={15} />}
              label="Duration"
              value={`${workout.duration} min`}
            />
            <Stat
              icon={<Flame size={15} />}
              label="Calories"
              value={`${workout.caloriesBurned} kcal`}
            />
            <Stat
              icon={<Star size={15} />}
              label="Rating"
              value={String(workout.rating)}
            />
            <Stat
              label="Sets × Reps"
              value={`${workout.sets} × ${workout.reps}`}
            />
          </div>

          <div className="mt-8">
            <h2 className="fit-display text-2xl font-bold uppercase tracking-wide">
              Key Specs
            </h2>
            <div className="mt-3 divide-y divide-[#292d27] rounded-2xl border border-[#292d27] bg-[#0d0f0c]">
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-5 px-4 py-3.5 text-sm"
                >
                  <span className="text-xs font-bold uppercase tracking-[.14em] text-zinc-600">
                    {label}
                  </span>
                  <span className="text-right font-semibold text-zinc-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="fit-display text-2xl font-bold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-xl border border-[#292d27] bg-[#0d0f0c] p-4"
                >
                  <span className="fit-display text-2xl font-bold text-[#ccff00]">
                    0{index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-6 text-zinc-400">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8">
            <DetailActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-r border-[#292d27] p-4 last:border-r-0 sm:border-b-0">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-zinc-600">
        {icon}
        {label}
      </div>
      <p className="mt-1 font-bold text-zinc-100">{value}</p>
    </div>
  );
}
