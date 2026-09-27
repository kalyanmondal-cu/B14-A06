"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Workout } from "@/types";
import Toast from "./Toast";

type ContextValue = {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  addToPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const FitLogContext = createContext<ContextValue | null>(null);
const KEY = "fitlog-state-v1";

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setPlan(parsed.plan ?? []);
        setSaved(parsed.saved ?? []);
        setDone(parsed.done ?? []);
      }
    } catch {
      localStorage.removeItem(KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ plan, saved, done }));
  }, [plan, saved, done, hydrated]);

  const addToPlan = useCallback(
    (workout: Workout) => {
      if (plan.some((item) => item.id === workout.id)) {
        setToast("Already in today's plan");
        return false;
      }
      if (plan.length >= 5) {
        setToast("Today's plan is capped at five lifts");
        return false;
      }
      setPlan((current) => [...current, workout]);
      setToast("Added to today's plan");
      return true;
    },
    [plan],
  );

  const saveForLater = useCallback((workout: Workout) => {
    setSaved((current) =>
      current.some((item) => item.id === workout.id)
        ? current
        : [...current, workout],
    );
    setToast("Saved for later");
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    setPlan((current) => current.filter((item) => item.id !== id));
    setToast("Removed from today's plan");
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setSaved((current) => current.filter((item) => item.id !== id));
    setToast("Removed from saved");
  }, []);

  const markDone = useCallback((id: number) => {
    setDone((current) => (current.includes(id) ? current : [...current, id]));
    setToast("Workout marked as done");
  }, []);

  const value = useMemo(
    () => ({
      plan,
      saved,
      done,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markDone,
    }),
    [
      plan,
      saved,
      done,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markDone,
    ],
  );

  return (
    <FitLogContext.Provider value={value}>
      {children}
      <Toast message={toast} onClose={() => setToast(null)} />
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used inside FitLogProvider");
  return context;
}
