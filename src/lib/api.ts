import { MoviesResponse } from "@/types/movie";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies(): Promise<MoviesResponse> {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return res.json();
}