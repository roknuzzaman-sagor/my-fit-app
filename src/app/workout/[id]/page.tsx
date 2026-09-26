import WorkoutDetails from "@/Components/WorkoutDetailsPage";
import type { IApp } from "@/Type/Type";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getWorkout(id: string): Promise<IApp | null> {
  try {
    const response = await fetch(
      `https://api.abcz.workers.dev/api/fitlog/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("API error:", response.status);
      return null;
    }

    const data: IApp = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch workout:", error);
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1 className="text-2xl font-bold">Workout not found</h1>
      </div>
    );
  }

  return <WorkoutDetails workout={workout} />;
}
