export const dynamic = 'force-dynamic';
import Image from 'next/image';
import { fetchMovieDetails } from "@/lib/api";
import { notFound } from "next/navigation";
import Rating from "@mui/material/Rating";
import Header from '@/components/Header';

interface ParamsObject {
    id: string;
}

interface MoviePageProps {
    params: ParamsObject | Promise<ParamsObject>;
}

export default async function MoviePage({ params }: MoviePageProps) {
    const resolvedParams = await params;
    const movieId = resolvedParams.id as string;

    if (!movieId || !/^\d+$/.test(movieId)) {
        notFound();
    }

    const movie = await fetchMovieDetails(movieId);

    return (
        <div className="min-h-screen text-white bg-[#141414]">
            <Header/>
            <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8">

                {/* Poster */}
                <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                    {movie.poster_path ? (
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={400}
                            height={600}
                            loading="lazy"
                            className="rounded object-cover w-full max-w-sm"
                            unoptimized
                        />
                    ) : (
                        <img
                            src="https://placehold.co/200x300?text=No+Image"
                            alt="No Image"
                            loading="lazy"
                            className="rounded object-cover w-full max-w-sm"
                        />
                    )}


                </div>

                {/* Movie Info */}
                <div className="flex flex-col flex-1 items-center md:items-start md:pt-2">
                    {movie.title && <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>}
                    {movie.release_date && <p className="text-gray-400 mb-2">Release Date: {new Date(movie.release_date).toLocaleDateString("sl-SI")}</p>}
                    {movie.vote_average &&
                        <p className="mb-2">
                            <Rating
                                name="movie-rating"
                                value={movie.vote_average / 2}
                                precision={0.5}
                                readOnly
                                sx={{
                                    color: "#E50000",
                                    "& .MuiRating-iconEmpty": {
                                        color: "#555",
                                    },
                                }}
                            />
                        </p>}

                    {movie.overview && <p className="text-lg leading-relaxed text-center md:text-left">{movie.overview}</p>}
                </div>
            </div>
        </div>
    );
}