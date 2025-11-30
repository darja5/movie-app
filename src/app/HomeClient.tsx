"use client";

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchPopularMovies } from "@/lib/api";
import { Movie } from "@/types/movie";
import { useState } from "react";

interface Props {
    initialMovies: Movie[];
}

export default function HomeClient({ initialMovies }: Props) {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = async (query: string, pageNumber: number) => {
        if (!query) return;

        setLoading(true);
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&query=${encodeURIComponent(query)}&page=${pageNumber}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            console.error("Fetch error:", res.status);
            setLoading(false);
            return;
        }

        const data = await res.json();
        setMovies(prev => pageNumber === 1 ? data.results : [...prev, ...data.results]);
        setTotalPages(data.total_pages);
        setLoading(false);
    };

    const handleSearch = async () => {
        setPage(1);
        if (!searchQuery.trim()) {
            // prazno iskanje -> pokaži popular movies
            const data = await fetchPopularMovies();
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } else {
            fetchMovies(searchQuery, 1);
        }
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(searchQuery, nextPage);
    };

    return (
        <div className="min-h-screen text-white p-4 md:p-8" style={{ backgroundColor: "#141414" }}>
            <h1 className="text-3xl font-bold mb-6 text-center">Popular Movies</h1>

            <SearchBar onSearch={setSearchQuery} searchQuery={searchQuery} handleSearch={handleSearch} />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movies?.map((movie: Movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>
            {movies.length > 0 && page < totalPages && (
                <div className="mt-4 text-center">
                    <button
                        onClick={loadMore}
                        className="bg-[#333333] text-white px-4 py-2 rounded hover:bg-[#E50000] transition"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
        </div>
    )
}