import Banner from "@/Components/Homepage/Banner";
import WorkoutLibrary from "@/Components/Homepage/WorkoutLibrary";

type IApp = Parameters<typeof WorkoutLibrary>[0]["apps"][number];

async function getWorkouts(): Promise<IApp[]> {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data: IApp[] = await response.json();

  return data;
}

export default async function Home() {
  const apps = await getWorkouts();

  return (
    <div>
      <Banner />
      <WorkoutLibrary apps={apps} />
    </div>
  );
}
