import { Movie } from "@/types/movie";
import Image from 'next/image';
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imgUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/200x300?text=No+Image";

  if (!movie.id) {
    console.error(`Movie missing ID: ${movie.title}`);
  }

  console.log(`Link created for: ${movie.title} with ID: /movie/${movie.id}`);
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="border border-gray-700 rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
        style={{ backgroundColor: "#1A1A1A", borderColor: "#262626" }}>
        <Image src={imgUrl} alt={movie.title} width={200} height={300} className="w-full rounded mb-2" />
        <h2 className="font-semibold text-lg">{movie.title}</h2>
        <p className="text-gray-400 text-sm">{movie.release_date}</p>
      </div>
    </Link>

  );
}