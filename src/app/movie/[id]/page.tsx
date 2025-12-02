export const dynamic = 'force-dynamic'; 
import Image from 'next/image';
import { fetchMovieDetails } from "@/lib/api";
import { notFound } from "next/navigation";

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
    const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/200x300?text=No+Image";

    return (
        <div className="p-6 text-white" style={{ backgroundColor: "#141414" }}>
            <div className="max-w-4xl mx-auto">
                <Image
                    src={imgUrl}
                    width={200} 
                    height={300}
                    alt={movie.title}
                    className="rounded mb-4"
                />

                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <p className="text-gray-400 mb-2">**Release Date:** {movie.release_date}</p>
                <p className="text-gray-400 mb-4">**Rating:** {movie.vote_average.toFixed(1)} / 10</p> 
                <p className="text-lg leading-relaxed">{movie.overview}</p>
            </div>
        </div>
    );
}