import WorkoutDetails from "@/Components/WorkoutDetailsPage";
import type { IApp } from "@/Type/Type";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getWorkout(
  id: string
): Promise<IApp | null> {
  try {
    const response = await fetch(
      `https://api.abcz.workers.dev/api/fitlog/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Workout API error:",
        response.status
      );

      return null;
    }

    const data: IApp = await response.json();

    return data;
  } catch (error) {
    console.error(
      "Failed to fetch workout:",
      error
    );

    return null;
  }
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            FITLOG
          </p>

          <h1 className="mt-3 text-3xl font-extrabold uppercase">
            Workout Not Found
          </h1>

          <p className="mt-3 text-sm text-base-content/60">
            Sorry, this workout could not be found.
          </p>
        </div>
      </div>
    );
  }

  return <WorkoutDetails workout={workout} />;
}