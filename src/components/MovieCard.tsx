interface MovieCardProps {
  title: string;
  posterPath: string | null;
}

export default function MovieCard({ title, posterPath }: MovieCardProps) {
  const imgUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "https://placehold.co/500x750?text=No+Image";

  return (
    <div className="border rounded p-2 shadow">
      <img src={imgUrl} alt={title} className="w-full rounded mb-2" />
      <h2 className="font-semibold">{title}</h2>
    </div>
  );
}