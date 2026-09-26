"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { IApp } from "@/Type/Type";

interface WorkoutContextType {
  plan: IApp[];
  saved: IApp[];

  addToPlan: (workout: IApp) => void;
  saveWorkout: (workout: IApp) => void;

  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<IApp[]>(() => {
    if (typeof window === "undefined") return [];
    const storedPlan = window.localStorage.getItem("fitlog-plan");
    return storedPlan ? JSON.parse(storedPlan) : [];
  });
  const [saved, setSaved] = useState<IApp[]>(() => {
    if (typeof window === "undefined") return [];
    const storedSaved = window.localStorage.getItem("fitlog-saved");
    return storedSaved ? JSON.parse(storedSaved) : [];
  });

  // Save plan to localStorage
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  // Save saved workouts to localStorage
  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: IApp) => {
    const alreadyAdded = plan.some((item) => item.id === workout.id);

    if (alreadyAdded) {
      return;
    }

    setPlan((previousPlan) => [...previousPlan, workout]);
  };

  const saveWorkout = (workout: IApp) => {
    const alreadySaved = saved.some((item) => item.id === workout.id);

    if (alreadySaved) {
      return;
    }

    setSaved((previousSaved) => [...previousSaved, workout]);
  };

  const removeFromPlan = (id: number) => {
    setPlan((previousPlan) => previousPlan.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((previousSaved) => previousSaved.filter((item) => item.id !== id));
  };

  const markAsDone = (id: number) => {
    setPlan((previousPlan) => previousPlan.filter((item) => item.id !== id));
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useWorkout must be used inside WorkoutProvider");
  }

  return context;
}
