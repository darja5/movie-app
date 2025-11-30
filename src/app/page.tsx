import MovieCard from "@/components/MovieCard";
import { fetchPopularMovies } from "@/lib/api";
import { Movie } from "@/types/movie";

export default async function Home() {
  const data = await fetchPopularMovies();
  
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