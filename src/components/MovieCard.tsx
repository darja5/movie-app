import { Movie } from "@/types/movie";
import Image from 'next/image';
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {

  if (!movie.id) {
    console.error(`Movie missing ID: ${movie.title}`);
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="border border-gray-700 rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow duration-200
      cursor-pointer transition duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg"
        style={{ backgroundColor: "#1A1A1A", borderColor: "#262626" }}>
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width={500}
            height={750}
            alt={movie.title}
            className="rounded mb-4"
          />
        ) : (
          <img
            src="https://placehold.co/200x300?text=No+Image"
            alt="No Image"
            className="rounded mb-4 w-full h-auto"
          />
        )}
        {movie.title && <h2 className="font-semibold text-lg">{movie.title}</h2>}
        {movie.release_date && <p className="text-gray-400 text-sm">{new Date(movie.release_date).toLocaleDateString("sl-SI")}</p>}
      </div>
    </Link>
  );
}