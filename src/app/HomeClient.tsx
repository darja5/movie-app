"use client";

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { Movie } from "@/types/movie";
import { useState } from "react";

interface Props {
    initialMovies: Movie[];
}

export default function HomeClient({ initialMovies }: Props) {
    const [query, setQuery] = useState("");

    const filteredMovies = initialMovies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="min-h-screen text-white p-4 md:p-8" style={{ backgroundColor: "#141414" }}>
            <h1 className="text-3xl font-bold mb-6 text-center">Popular Movies</h1>
            <div>
                <SearchBar onSearch={setQuery} />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {filteredMovies?.map((movie: Movie) => (
                        <MovieCard
                            movie={movie}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}