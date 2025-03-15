import { Star, Ticket, Clock } from "lucide-react";
import { Movie } from "@/types/types";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const {
    id,
    images,
    name,
    description,
    rating,
    ticketCost,
    timings,
    languages,
    genres,
    isMovieAvailable,
  } = movie;


  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Link to={`/movie/${id}`}>
      <div className="bg-gray-300 shadow-lg rounded-2xl overflow-hidden w-full max-w-sm transition-transform transform hover:scale-105">
        <img src={images[0]} alt={name} className="w-full h-60 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold text-black mb-2">{name}</h2>
          <p className="text-gray-600 mb-2 truncate">{description}</p>

          <div className="flex justify-between ">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700 font-medium">
                {rating.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Ticket className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700 font-medium">
                ${ticketCost.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 font-medium">
              {timings.map((time) => formatTime(time)).join(", ")}
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
              isMovieAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isMovieAvailable ? "Available" : "Unavailable"}
          </span>

          <button
            className={`mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300 ${
              !isMovieAvailable && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isMovieAvailable}
          >
            Book Ticket
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
