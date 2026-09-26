import Banner from "@/Components/Homepage/Banner";
import WorkoutLibrary from "@/Components/Homepage/WorkoutLibrary";

type IApp = Parameters<typeof WorkoutLibrary>[0]["apps"][number];

async function getWorkouts(): Promise<IApp[]> {
  try {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: IApp[] = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch workouts:", error);

    return [];
  }
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
