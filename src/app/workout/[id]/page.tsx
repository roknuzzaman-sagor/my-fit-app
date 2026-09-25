import WorkoutDetails from "@/Components/WorkoutDetailsPage";
import type { IApp } from "@/Type/Type";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getWorkout(id: string): Promise<IApp> {
  const response = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json();
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workout = await getWorkout(id);

  return <WorkoutDetails workout={workout} />;
}
