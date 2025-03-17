import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import useSeatStore from "@/store/useSeatStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  return (
    <Button
      onClick={() => toggleSelect(seat.id)}
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
  const { movieId } = useParams();
  const { seats, isLoading, error, getSeats } = useSeatStore();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    if (movieId) getSeats(Number(movieId));
  }, [movieId]);

  // console.log(seats.data);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">{error}</div>
    );

  // Convert flat array to a 2D grid based on seat rows (A, B, C, etc.)
  const seatGrid: { [key: string]: any[] } = {};
  seats?.forEach((seat: any) => {
    const rowLabel = seat.seatNumber.charAt(0); // Extract row letter
    if (!seatGrid[rowLabel]) seatGrid[rowLabel] = [];
    seatGrid[rowLabel].push(seat);
  });

  // Toggle seat selection
  const toggleSelect = (id: number) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((seatId) => seatId !== id) : [...prev, id]
    );
  };

  const handleBooking = () => {
    console.log("Selected Seats:", selectedSeats);
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

      <Button
        onClick={handleBooking}
        className={`mt-6 px-3 py-2 ${
          selectedSeats.length === 0
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-yellow-500 hover:bg-yellow-600 text-black"
        }`}
      >
        {selectedSeats.length === 0
          ? "Select Seats to Book"
          : `Book ${selectedSeats.length} Ticket(s)`}
      </Button>
    </div>
  );
};

export default MovieSeats;
