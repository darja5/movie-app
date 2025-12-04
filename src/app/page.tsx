import { fetchPopularMovies } from "@/lib/api";
import HomeClient from "./HomeClient";
import { Suspense } from "react";

export default async function Home() {
  const data = await fetchPopularMovies();
  const movies = data?.results || [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeClient initialMovies={movies} initialTotalPages={data.total_pages} />
    </Suspense>
  );
}