import { Movie, MoviesResponse } from "@/types/movie";
import { notFound } from "next/navigation";


const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies(page: number = 1): Promise<MoviesResponse> {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch popular movies");
    }

    return res.json();
}


export async function fetchMovieDetails(id: string): Promise<Movie> {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

    const res = await fetch(url, { cache: "no-store" });

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`[API ERROR] Failed to fetch details for ID ${id}. Status: ${res.status}. Response: ${errorText}`);

        throw new Error("TMDB API request failed.");
    }

    return res.json();
}