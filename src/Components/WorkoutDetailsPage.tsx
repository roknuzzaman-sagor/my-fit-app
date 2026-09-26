"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { IApp } from "@/Type/Type";
import { useWorkout } from "@/Context/WorkoutContext";

import { toast } from "react-toastify";

interface WorkoutDetailsProps {
  workout: IApp;
}

function SpecRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="grid grid-cols-2 border-b border-base-content/10 last:border-b-0">
      <div className="p-3 text-xs font-bold uppercase text-base-content/50">
        {label}
      </div>

      <div className="border-l border-base-content/10 p-3 text-sm font-semibold">
        {value}
      </div>
    </div>
  );
}

export default function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  const { addToPlan, saveWorkout, plan, saved } = useWorkout();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const alreadyInPlan = mounted && plan.some((item) => item.id === workout.id);

  const alreadySaved = mounted && saved.some((item) => item.id === workout.id);

  const handleAddToPlan = () => {
    if (!mounted) {
      return;
    }

    if (alreadyInPlan) {
      toast.info("Already in today's plan");
      return;
    }

    addToPlan(workout);

    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    if (!mounted) {
      return;
    }

    if (alreadySaved) {
      toast.info("Already saved");
      return;
    }

    saveWorkout(workout);

    toast.success("Saved for later");
  };

  return (
    <section className="bg-base-100 px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-3xl border border-base-content/10 bg-base-200 lg:grid-cols-2">
          <div className="relative min-h-100 lg:min-h-150">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />

            <span className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold uppercase text-white">
              {workout.difficulty}
            </span>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
              Workout Details
            </p>

            <h1 className="mt-3 text-3xl font-extrabold uppercase text-base-content md:text-4xl">
              {workout.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-md bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm leading-6 text-base-content/60">
              {workout.description}
            </p>

            <div className="mt-7 overflow-hidden rounded-2xl border border-base-content/10">
              <SpecRow label="Equipment" value={workout.equipment} />

              <SpecRow label="Difficulty" value={workout.difficulty} />

              <SpecRow label="Sets" value={workout.sets} />

              <SpecRow label="Reps" value={workout.reps} />

              <SpecRow label="Duration" value={`${workout.duration} min`} />

              <SpecRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <SpecRow
                label="Rating"
                value={`★ ${workout.rating.toFixed(1)}`}
              />
            </div>

            <div className="mt-7">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                Instructions
              </h2>

              <ol className="space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#ccff00] text-xs font-bold text-black">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-base-content/70">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToPlan}
                disabled={!mounted}
                className="flex-1 rounded-xl bg-[#ccff00] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#d5ff33] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {!mounted
                  ? "Loading..."
                  : alreadyInPlan
                    ? "✓ Already in plan"
                    : "+ Add to today's plan"}
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!mounted}
                className="flex-1 rounded-xl border border-base-content/15 px-4 py-3 text-sm font-bold transition hover:border-[#ccff00]/50 hover:text-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {!mounted
                  ? "Loading..."
                  : alreadySaved
                    ? "♥ Saved"
                    : "♡ Save for later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
