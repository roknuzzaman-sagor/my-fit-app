import Link from "next/link";
import Image from "next/image";
import type { IApp } from "@/Type/Type";

type IconName = "clock" | "flame" | "star" | "arrowUpRight";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

function Icon({
  name,
  size = 20,
  className = "",
}: IconProps) {
  const paths = {
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    flame: (
      <path d="M12 21a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-3 5-3 8a6 6 0 0 0 6 6Z" />
    ),

    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3.1 9.6l6.2-.9L12 3Z" />
    ),

    arrowUpRight: (
      <>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

interface WorkoutCardProps {
  app: IApp;
}

export default function WorkoutCard({
  app,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${app.id}`}
      className="group block h-full"
      aria-label={`View details for ${app.name}`}
    >
      <article className="h-full overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:border-[#ccff00]/50 hover:shadow-[0_0_25px_rgba(204,255,0,0.08)]">

        {/* Workout Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-[#202020]">

          <Image
            src={app.image}
            alt={app.name}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Difficulty Badge */}
          <span className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            {app.difficulty}
          </span>

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

          {/* Muscle Group Tags */}
          <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-2">
            {app.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-md bg-[#ccff00] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Workout Information */}
        <div className="p-5">

          {/* Title + Arrow */}
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-extrabold uppercase leading-tight tracking-wide text-white transition-colors group-hover:text-[#ccff00]">
              {app.name}
            </h2>

            <Icon
              name="arrowUpRight"
              size={20}
              className="shrink-0 text-gray-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#ccff00]"
            />
          </div>

          {/* Equipment */}
          <p className="mt-3 line-clamp-1 text-sm text-gray-400">
            <span className="mr-2 text-[#ccff00]">↳</span>
            {app.equipment}
          </p>

          {/* Divider */}
          <div className="my-4 border-t border-white/10" />

          {/* Workout Stats */}
          <div className="grid grid-cols-3 gap-2">

            {/* Duration */}
            <div className="flex flex-col gap-2">
              <Icon
                name="clock"
                size={17}
                className="text-[#ccff00]"
              />

              <span className="text-sm font-semibold text-white">
                {app.duration} min
              </span>

              <span className="text-[10px] uppercase tracking-wider text-gray-500">
                Duration
              </span>
            </div>

            {/* Calories */}
            <div className="flex flex-col gap-2">
              <Icon
                name="flame"
                size={17}
                className="text-[#ccff00]"
              />

              <span className="text-sm font-semibold text-white">
                {app.caloriesBurned} kcal
              </span>

              <span className="text-[10px] uppercase tracking-wider text-gray-500">
                Calories
              </span>
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-2">
              <Icon
                name="star"
                size={17}
                className="text-[#ccff00]"
              />

              <span className="text-sm font-semibold text-white">
                {app.rating.toFixed(1)}
              </span>

              <span className="text-[10px] uppercase tracking-wider text-gray-500">
                Rating
              </span>
            </div>

          </div>
        </div>
      </article>
    </Link>
  );
}