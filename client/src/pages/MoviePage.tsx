import { useEffect } from "react";
import { Clock, Film, Languages, Users } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Reviews from "./Reviews";
import Spinner from "@/components/Spinner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMovieStore } from "@/store/useMovieStore";

export default function MoviePage() {
  const { id } = useParams();
  const movieId = Number(id);
  const { movies, isLoading, error, getMovieById } = useMovieStore();

  useEffect(() => {
    if (id) getMovieById(movieId);
  }, [id, getMovieById]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/seats/" + movieId);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const totalSeats = movies?.movieSeatCapacity || 100;
  const bookedSeats = totalSeats / 10;
  const availableSeats = totalSeats - bookedSeats;
  const availabilityPercentage = (availableSeats / totalSeats) * 100;

  return (
    <div className="min-h-screen bg-black dark:text-white text-black ">
      {/* Hero section with poster */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src={movies?.images?.[0] || "/placeholder.svg"}
          alt={movies?.name || "Movie Poster"}
          className="object-cover w-full brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-0 text-white  w-full p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <Badge className="mb-4 bg-yellow-500 dark:text-white text-black hover:bg-yellow-600">
              {movies?.rating || "N/A"} ★
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
              {movies?.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl">
              {movies?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Movie details */}
          <div className="md:col-span-2 space-y-8">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-100">
                Movie Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DetailItem
                  icon={Film}
                  label="Genre"
                  value={
                    movies?.genres?.length ? movies.genres.join(", ") : "N/A"
                  }
                />

                <DetailItem
                  icon={Languages}
                  label="Languages"
                  value={movies?.languages?.join(", ") || "N/A"}
                />
                <DetailItem
                  icon={Users}
                  label="Capacity"
                  value={`${totalSeats} seats`}
                />
              </div>
            </Card>

            {/* Showtimes */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-100">Showtimes</h2>
                <div className="text-yellow-500 font-medium">
                  ${movies?.ticketCost || 10} per ticket
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {movies?.timings?.map((time: string, index: number) => (
                  <ShowtimeCard key={index} movieId={movies.id} time={time} />
                ))}
              </div>
            </Card>
          </div>

          {/* Booking sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card className="bg-gray-900 border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-100">
                  Ticket Availability
                </h2>

                {/* Availability indicator */}
                <div className="mb-4">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                      style={{ width: `${availabilityPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-gray-400 mt-2 text-sm">
                    <span>{availableSeats} seats available</span>
                    <span>{bookedSeats} booked</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <PriceItem
                    label="Ticket price"
                    value={`$${movies?.ticketCost || 10}.00`}
                  />
                  <PriceItem label="Booking fee" value="$0.50" />
                  <div className="border-t border-gray-700 text-white pt-4 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">
                      ${(movies?.ticketCost || 10) + 0.5}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleNavigate}
                  className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-6"
                >
                  Book Tickets
                </Button>
                <p className="text-xs text-center mt-4 text-gray-400">
                  Tickets once booked cannot be canceled
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Reviews */}
      <Reviews movieId={movieId} movieName={movies?.name || ""} />
    </div>
  );
}

// Helper Components
const DetailItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex text-white  items-center gap-3">
    <div className="bg-gray-800 p-2 rounded-full">
      <Icon className="h-5 w-5 text-yellow-500" />
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const getShowType = (time: string) => {
  const hour = parseInt(time.split(":")[0], 10);
  if (hour >= 0 && hour < 12) return "Morning Show";
  if (hour >= 12 && hour < 18) return "Afternoon Show";
  return "Evening Show";
};

const ShowtimeCard = ({ time, movieId }: { time: string; movieId: number }) => (
  <Link to={`/seats/${movieId}/${encodeURIComponent(time.replace(/:/g, "-"))}`}>
    <div
      className="border border-gray-700 rounded-lg p-4 text-white hover:border-yellow-500 transition-colors cursor-pointer group"
      role="button"
      aria-label={`Showtime at ${time}`}
    >
      <div className="flex items-center gap-3">
        <Clock className="h-5 w-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
        <span className="font-medium text-lg">{time}</span>
      </div>
      <div className="mt-2 text-sm text-gray-400">{getShowType(time)}</div>
    </div>
  </Link>
);

const PriceItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex text-white justify-between">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
