"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowDown, Search } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import Loading from "@/components/Loading";
import SortSelect, { type SortOption } from "@/components/SortSelect";
import type { Workout } from "@/types";
import { API_BASE } from "@/lib/api";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState<SortOption>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(API_BASE)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setWorkouts)
      .catch(() =>
        setError(
          "Unable to load the workout library. Please refresh and try again.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const filtered = workouts.filter((w) =>
      `${w.name} ${w.muscleGroups.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
    return [...filtered].sort((a, b) =>
      sort === "duration"
        ? a.duration - b.duration
        : sort === "calories"
          ? a.caloriesBurned - b.caloriesBurned
          : b.rating - a.rating,
    );
  }, [workouts, sort, query]);

  return (
    <main className="pt-[52px]">
      {/* Hero Section Start */}
      <section className="mx-auto w-full max-w-[1276px] overflow-hidden rounded-2xl border border-[#222630] bg-[#15171D]">
        {" "}
        <div className="grid min-h-[464px] grid-cols-1 items-center lg:grid-cols-[1fr_380px]">
          {" "}
          {/* ================= LEFT CONTENT ================= */}{" "}
          <div className="relative z-10 px-6 py-12 sm:px-10 lg:px-16">
            {" "}
            {/* Small Label */}{" "}
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-[#C2F800]">
              {" "}
              WORKOUT LIBRARY{" "}
            </p>{" "}
            {/* Main Heading */}{" "}
            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {" "}
              Train Hard. <br />{" "}
              <span className="text-[#C2F800]">Stay Strong.</span>{" "}
            </h1>{" "}
            {/* Description */}{" "}
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
              {" "}
              Discover powerful workouts, track your progress, and build a
              stronger version of yourself with FitLog.{" "}
            </p>{" "}
            {/* Buttons */}{" "}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {" "}
              {/* Explore Workouts */}{" "}
              <a
                href="#library"
                className="inline-flex items-center justify-center rounded-lg bg-[#C2F800] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:bg-[#d4ff33] hover:shadow-[0_0_25px_rgba(194,248,0,0.2)]"
              >
                {" "}
                Explore Workouts{" "}
              </a>{" "}
              {/* My Plan */}{" "}
              <a
                href="/my-plan"
                className="inline-flex items-center justify-center rounded-lg border border-[#353943] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 hover:border-[#C2F800] hover:text-[#C2F800]"
              >
                {" "}
                My Plan{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
          {/* ================= HERO IMAGE ================= */}{" "}
          <div className="relative flex h-[300px] items-center justify-center lg:h-[448px]">
            {" "}
            {/* Glow behind image */}{" "}
            <div className="absolute h-[260px] w-[260px] rounded-full bg-[#C2F800]/5 blur-3xl" />{" "}
            {/* Hero Image */}{" "}
            <div className="relative h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] lg:h-[334px] lg:w-[334px]">
              {" "}
              <Image
                src="/images/fitlog-hero.png"
                alt="FitLog workout illustration"
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 334px"
                className="object-contain"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
      {/* Hero Section End */}

      {/* Library Section */}

      <section
        id="library"
        className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="mb-8 flex flex-col gap-5 border-b border-[#292d27] pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[.25em] text-[#ccff00]">
              THE LIBRARY
            </p>
            <h2 className="fit-display mt-2 text-5xl font-black uppercase">
              The Library
            </h2>
            <p className="mt-2 text-zinc-500">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workouts"
                className="w-full rounded-full border border-[#292d27] bg-[#111310] py-2.5 pl-9 pr-4 text-sm outline-none placeholder:text-zinc-600 focus:border-[#ccff00]/60 sm:w-52"
              />
            </label>
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-8 text-center text-red-300">
            {error}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
