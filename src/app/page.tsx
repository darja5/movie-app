import MovieCard from "@/components/MovieCard";
import { Movie, MoviesResponse } from "@/types/movie";

export default async function Home() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
  );
  const data: MoviesResponse = await res.json();

  return (
    <div>
      <h1>Popular Movies</h1>
      <div>
        <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data?.results?.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}