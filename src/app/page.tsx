import MovieCard from "@/components/MovieCard";
import { fetchPopularMovies } from "@/lib/api";
import { Movie } from "@/types/movie";
import HomeClient from "./HomeClient";

export default async function Home() {
  const data = await fetchPopularMovies();
  const movies = data?.results || [];

  return (
    <HomeClient initialMovies={movies}/>
  );
}