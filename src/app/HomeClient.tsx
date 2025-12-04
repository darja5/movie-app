"use client";

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { Movie } from "@/types/movie";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";

interface Props {
    initialMovies: Movie[];
    initialTotalPages: number;
}

const CLIENT_API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;

export default function HomeClient({ initialMovies, initialTotalPages }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryFromUrl = searchParams.get("search") || "";

    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [searchQuery, setSearchQuery] = useState(queryFromUrl);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const fetchMovies = async (query: string, pageNumber: number) => {
        if (!query) return;

        setLoading(true);
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${CLIENT_API_KEY}&query=${encodeURIComponent(query)}&page=${pageNumber}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            setLoading(false);
            return;
        }

        const data = await res.json();
        setMovies(prev => {
            const newMovies = pageNumber === 1 ? data.results : [...(prev || []), ...data.results]
            const uniqueMovies = Array.from(
                new Map(newMovies.map((m: Movie) => [m.id, m])).values()
            ) as Movie[];
            return uniqueMovies;
        });
        setTotalPages(data.total_pages);
        setLoading(false);
    };

    const handleSearch = () => {
        setPage(1);

        if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push(`/`);
            setMovies(initialMovies);
            setTotalPages(initialTotalPages);
        }
    };

    const loadMore = useCallback(async () => {
        const nextPage = page + 1;
        setPage(nextPage);

        // SEARCH MODE
        if (searchQuery.trim()) {
            await fetchMovies(searchQuery, nextPage);
            return;
        }

        // POPULAR MODE
        setLoading(true);
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${CLIENT_API_KEY}&language=en-US&page=${nextPage}`,
            { cache: "no-store" }
        );
        const data = await res.json();
        setMovies(prev => {
            const newMovies = [...(prev || []), ...data.results]
            const uniqueMovies = Array.from(
                new Map(newMovies.map((m: Movie) => [m.id, m])).values()
            ) as Movie[];
            return uniqueMovies;
        });
        setTotalPages(data.total_pages);
        setLoading(false);
    }, [page, searchQuery]);

    useEffect(() => {
        const resetToHome = async () => {
            if (queryFromUrl) {
                await fetchMovies(queryFromUrl, 1);
                setSearchQuery(queryFromUrl);
                return;
            }

            setSearchQuery("");
            setMovies(initialMovies);
            setPage(1);
            setTotalPages(initialTotalPages);
        }

        resetToHome();
    }, [queryFromUrl]);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && !loading && page < totalPages) {
                    loadMore();
                }
            },
            { rootMargin: "300px", }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [loading, page, totalPages, loadMore]);

    useEffect(() => {
        const loadMoviesFromQuery = async () => {
            if (queryFromUrl.trim()) {
                await fetchMovies(queryFromUrl, 1);
                setPage(1);
            } else {
                setMovies(initialMovies);
                setTotalPages(initialTotalPages);
                setPage(1);
                setSearchQuery("");
            }
        };

        loadMoviesFromQuery();
    }, [queryFromUrl, initialMovies, initialTotalPages]);

    return (
        <div className="min-h-screen text-white bg-[#141414]">
            <Header />

            <div className="p-4 md:p-8">
                <SearchBar onSearch={setSearchQuery} searchQuery={searchQuery} handleSearch={handleSearch} />

                <h2 className="text-xl mb-4">
                    {!searchQuery.trim()
                        ? "Popular Movies"
                        : movies?.length === 0
                            ? `No results found for "${searchQuery}"`
                            : `Results for "${searchQuery}"`
                    }
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {movies === null ? (
                        <div>Loading...</div>
                    ) : movies?.map((movie: Movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
                <div ref={loadMoreRef} />
            </div>
        </div>
    )
}