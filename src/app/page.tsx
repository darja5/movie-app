import { fetchPopularMovies } from "@/lib/api";
import HomeClient from "./HomeClient";

export default async function Home() {
  const data = await fetchPopularMovies();
  const movies = data?.results || [];

  return (
    <HomeClient initialMovies={movies}/>
  );
}