import { useEffect } from "react";

import Spinner from "@/components/Spinner";
import Carousel from "@/components/Carousel";
import MovieCard from "@/components/MovieCard";
import { useMovieStore } from "@/store/useMovieStore";

const Home = () => {
  const { movies, isLoading, error, getAllMovies } = useMovieStore();

  useEffect(() => {
    getAllMovies();
  }, []);

  if (isLoading) return <Spinner />;

  if (error) return <div>{error}</div>;

  return (
    <div
      className="mt-16   "
    >
      <Carousel />

      <h1 className="text-3xl font-semibold text-white  mb-6 p-6">
        Recommended Movies
      </h1>

      <div className="grid grid-cols-1 h-screen sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {Array.isArray(movies) &&
          movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Home;
