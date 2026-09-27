import type { Workout } from "@/types";

export const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function getWorkout(id: string | number): Promise<Workout | null> {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
  if (res.ok) return res.json();

  // Fallback keeps the dynamic route resilient if the single-item endpoint is unavailable.
  const all = await getWorkouts();
  return all.find((workout) => String(workout.id) === String(id)) ?? null;
}
