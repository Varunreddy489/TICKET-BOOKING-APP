import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useSeatStore from "@/store/useSeatStore";
import Spinner from "@/components/ui/Spinner";
import { BookingDialog } from "@/components/BookingDialog";
import { toast } from "sonner";

const Seat = ({
  seat,
  toggleSelect,
}: {
  seat: {
    id: number;
    seatNumber: string;
    status: string;
    isSelected: boolean;
  };
  toggleSelect: (id: number) => void;
}) => {
  const isBooked = seat.status === "BOOKED";
  return (
    <Button
      onClick={() => {
        if (isBooked) {
          toast("This Seat is Already Booked!!");
        } else {
          toggleSelect(seat.id);
        }
      }}
      className={`text-white w-10 m-1 ${
        seat.status === "BOOKED"
          ? "bg-gray-500 cursor-not-allowed"
          : seat.isSelected
          ? "bg-green-500"
          : "bg-blue-500"
      } transition duration-200`}
    >
      {seat.seatNumber}
    </Button>
  );
};

const MovieSeats = () => {
  const { movieId, time } = useParams();
  const [searchParams] = useSearchParams();

  const ticketCost = Number(searchParams.get("cost")) || 10;
  const movieName = searchParams.get("movieName") || "Unknown Movie";

  const formattedTime = time?.replace(/-/g, ":") || "N/A";

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { seats, isLoading, error, getSeats } = useSeatStore();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  console.log(seats);

  useEffect(() => {
    if (movieId) getSeats(Number(movieId));
  }, [movieId, getSeats]);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">{error}</div>
    );

  // Convert flat array to a 2D grid based on seat rows (A, B, C, etc.)
  const seatGrid: { [key: string]: any[] } = {};
  seats?.forEach((seat: any) => {
    const rowLabel = seat.seatNumber.charAt(0);
    if (!seatGrid[rowLabel]) seatGrid[rowLabel] = [];
    seatGrid[rowLabel].push(seat);
  });

  const toggleSelect = (id: number) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((seatId) => seatId !== id) : [...prev, id]
    );
  };

  const handleBooking = () => {
    setIsDialogOpen(true);
  };

  const selectedSeatNumbers = seats
    ?.filter((seat: any) => selectedSeats.includes(seat.id))
    .map((seat: any) => seat.seatNumber);

  const movieDetails = {
    id: Number(movieId),
    title: movieName,
    poster: "/placeholder.svg?height=96&width=64",
    showtime: formattedTime,
    date: new Date().toLocaleDateString(),
  };

  return (
    <div className="flex p-6 items-center flex-col m-10">
      <h2 className="text-2xl font-semibold mb-4">Select Your Seats</h2>

      <div className="grid gap-2">
        {Object.entries(seatGrid).map(([row, seats]) => (
          <div key={row} className="flex">
            {seats.map((seat: any) => (
              <Seat
                key={seat.id}
                seat={{ ...seat, isSelected: selectedSeats.includes(seat.id) }}
                toggleSelect={toggleSelect}
              />
            ))}
          </div>
        ))}
      </div>

      <BookingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        movieDetails={movieDetails}
        seats={selectedSeatNumbers || []}
        ticketPrice={ticketCost}
        convenienceFee={5}
      />

      <Button
        onClick={handleBooking}
        className={`mt-6 px-3 py-2 ${
          selectedSeats.length === 0
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-yellow-500 hover:bg-yellow-600 text-black"
        }`}
        disabled={selectedSeats.length === 0}
      >
        {selectedSeats.length === 0
          ? "Select Seats to Book"
          : `Book ${selectedSeats.length} Ticket(s)`}
      </Button>
    </div>
  );
};

export default MovieSeats;
