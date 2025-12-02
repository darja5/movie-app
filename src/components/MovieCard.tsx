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

  console.log(`Link created for: ${movie.title} with ID: /movie/${movie.id}`);
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="border border-gray-700 rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
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
        <h2 className="font-semibold text-lg">{movie.title}</h2>
        <p className="text-gray-400 text-sm">{movie.release_date}</p>
      </div>
    </Link>

  );
}