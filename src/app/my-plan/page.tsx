"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


import { useWorkout } from "@/Context/WorkoutContext";
import { toast } from 'react-toastify';


export default function MyPlan() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState<
    "plan" | "saved"
  >("plan");

  const workouts =
    activeTab === "plan" ? plan : saved;


  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  
  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }

    toast.success("Workout removed");
  };

 
  const handleDone = (id: number) => {
    markAsDone(id);
    toast.success("Workout completed");
  };

  return (
    <main className="min-h-screen bg-base-100 px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">

       
        <div>
         

          <h1 className="mt-2 text-4xl font-extrabold uppercase md:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm text-base-content/60 md:text-base">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </div>

       
        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-base-content/10 bg-base-200 p-5">
            <p className="text-xs font-bold uppercase text-base-content/50">
              Exercises
            </p>

            <p className="mt-2 text-3xl font-extrabold text-[#ccff00]">
              {plan.length}
            </p>
          </div>

          <div className="rounded-2xl border border-base-content/10 bg-base-200 p-5">
            <p className="text-xs font-bold uppercase text-base-content/50">
              Minutes
            </p>

            <p className="mt-2 text-3xl font-extrabold text-[#ccff00]">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-2xl border border-base-content/10 bg-base-200 p-5">
            <p className="text-xs font-bold uppercase text-base-content/50">
              Calories
            </p>

            <p className="mt-2 text-3xl font-extrabold text-[#ccff00]">
              {totalCalories}
            </p>
          </div>

        </div>

        
        <div className="mt-10 flex gap-2">

          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-t-xl px-5 py-3 text-sm font-bold ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "text-base-content/60 hover:text-base-content"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-t-xl px-5 py-3 text-sm font-bold ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "text-base-content/60 hover:text-base-content"
            }`}
          >
            Saved
          </button>

        </div>

       
        <div className="mt-6 space-y-4">

          {workouts.length === 0 ? (

            
            <div className="rounded-2xl border border-base-content/10 px-5 py-16 text-center">

              <h2 className="text-2xl font-extrabold uppercase">
                NOTHING HERE YET
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm text-base-content/60">
                Browse the library and add a lift
                to get today moving.
              </p>

              <Link
                href="/"
                className="mt-6 inline-block rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-bold text-black hover:bg-[#d5ff33]"
              >
                Go to workouts
              </Link>

            </div>

          ) : (

            workouts.map((workout) => (

              <div
                key={workout.id}
                className="flex flex-col gap-5 rounded-2xl border border-base-content/10 bg-base-200 p-4 md:flex-row md:items-center"
              >

              
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl md:h-28 md:w-40">

                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />

                </div>

                
                <div className="flex-1">

                  <h2 className="text-xl font-extrabold uppercase">
                    {workout.name}
                  </h2>

                  <p className="mt-2 text-sm text-base-content/60">
                    {workout.equipment}
                  </p>

                
                  <div className="mt-4 flex flex-wrap gap-5 text-sm">

                    <span>
                      ⏱ {workout.duration} min
                    </span>

                    <span>
                      🔥 {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      ★ {workout.rating.toFixed(1)}
                    </span>

                  </div>

                </div>

               
                <div className="flex flex-wrap gap-2 md:flex-col">

                  <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-lg border border-base-content/15 px-4 py-2 text-xs font-bold hover:border-[#ccff00] hover:text-[#ccff00]"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() =>
                        handleDone(workout.id)
                      }
                      className="rounded-lg bg-[#ccff00] px-4 py-2 text-xs font-bold text-black hover:bg-[#d5ff33]"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleRemove(workout.id)
                    }
                    className="rounded-lg border border-red-500/30 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10"
                  >
                    ✕ Remove
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    </main>
  );
}