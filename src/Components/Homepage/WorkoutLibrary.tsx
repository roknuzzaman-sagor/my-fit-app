import type { IApp } from "@/Type/Type";

import WorkoutCard from "../WorkoutCard";

interface WorkoutLibraryProps {
  apps: IApp[];
}

export default function WorkoutLibrary({ apps }: WorkoutLibraryProps) {
  return (
    <section id="library" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
            THE LIBRARY
          </h1>

          <p className="mt-4 text-sm text-gray-400 md:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <WorkoutCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}
