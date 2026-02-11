import { Suspense } from "react";
import { getCurrentWeather } from "@/lib/services/current-weather";

import styles from "./page.module.css";

import Search from "@/components/search";
import Results from "@/components/results";

export default async function Home(props: {
  searchParams?: Promise<{
    location?: string;
  }>;
}) {
  let data = null;
  let error = null;
  const params = await props.searchParams;
  const query = params?.location || "";

  try {
    data = await getCurrentWeather(query);
  } catch (error) {
    error = "Something went wrong, please try again or come back later.";
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Search />
        <Suspense fallback={<div>Loading...</div>}>
          {error ? <p>{error}</p> : <Results results={data} />}
        </Suspense>
      </main>
    </div>
  );
}
