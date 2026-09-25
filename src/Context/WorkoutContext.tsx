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

const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

export function WorkoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<IApp[]>(() => {
    if (typeof window === "undefined") return [];
    const savedPlan = localStorage.getItem("fitlog-plan");
    return savedPlan ? JSON.parse(savedPlan) : [];
  });
  const [saved, setSaved] = useState<IApp[]>(() => {
    if (typeof window === "undefined") return [];
    const savedWorkouts = localStorage.getItem("fitlog-saved");
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  // Persist changes without setting state from an effect.
  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  // Add to today's plan
  const addToPlan = (workout: IApp) => {
    if (plan.length >= 5) {
      return;
    }

    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      return;
    }

    const newPlan = [...plan, workout];

    setPlan(newPlan);

  };

  // Save for later
  const saveWorkout = (workout: IApp) => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      return;
    }

    const newSaved = [...saved, workout];

    setSaved(newSaved);

  };

  // Remove from today's plan
  const removeFromPlan = (id: number) => {
    const newPlan = plan.filter(
      (item) => item.id !== id
    );

    setPlan(newPlan);

  };

  // Remove from saved
  const removeFromSaved = (id: number) => {
    const newSaved = saved.filter(
      (item) => item.id !== id
    );

    setSaved(newSaved);

  };

  // Mark workout as completed
  const markAsDone = (id: number) => {
    const newPlan = plan.filter(
      (item) => item.id !== id
    );

    setPlan(newPlan);

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
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
}