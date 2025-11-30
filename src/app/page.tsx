import MovieCard from "@/components/MovieCard";
import { fetchPopularMovies } from "@/lib/api";
import { Movie } from "@/types/movie";

export default async function Home() {
  const data = await fetchPopularMovies();

  return (
    <div className="min-h-screen text-white p-4 md:p-8" style={{ backgroundColor: "#141414" }}>
      <h1 className="text-3xl font-bold mb-6 text-center">Popular Movies</h1>
      <div>
        <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {data?.results?.map((movie: Movie) => (
            <MovieCard
              movie={movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
}