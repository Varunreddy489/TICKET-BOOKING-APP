import { Button } from "@/components/ui/button";
import { useState } from "react";

const ROWS = 10;
const COLS = 10;
const generateSeats = () =>
  Array.from({ length: ROWS }, (_, row) =>
    Array.from({ length: COLS }, (_, col) => ({
      id: `${row}-${col}`,
      row,
      col,
      isBooked: Math.random() < 0.1,
      // 10% of seats are randomly booked
      isSelected: false,
    }))
  );

const Seat = ({
  seat,
  toggleSelect,
}: {
  seat: {
    id: string;
    row: number;
    col: number;
    isBooked: boolean;
    isSelected: boolean;
  };
  toggleSelect: (id: string) => void;
}) => {
  return (
    <Button
      onClick={() => toggleSelect(seat.id)}
      className={`text-white w-10 m-1 ${
        seat.isBooked
          ? " bg-grey-500 cursor-not-allowed"
          : seat.isSelected
          ? "bg-green-500"
          : "bg-blue-500"
      }   transition duration-200 `}
    >
      {seat.row + 1}
      {String.fromCharCode(65 + seat.col)}
    </Button>
  );
};

const Tickets = () => {
  const [seats, setSeats] = useState(generateSeats());

  console.log(seats);

  const toggleSelect = (id: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((row) =>
        row.map((seat) =>
          seat.id === id ? { ...seat, isSelected: !seat.isSelected } : seat
        )
      )
    );
  };

  const selectedSeats = seats.flat().filter((seat) => seat.isSelected);

  const handleBooking = () => {
    console.log("Selected Seats:", selectedSeats);
  };

  return (
    <div className="flex p-6 items-center flex-col  m-10 ">
      <h2 className="text-2xl font-semibold mb-4">Select Your Seats</h2>

      <div className="grid gap-2">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((seat) => (
              <Seat key={seat.id} seat={seat} toggleSelect={toggleSelect} />
            ))}
          </div>
        ))}
      </div>

      <Button
        onClick={handleBooking}
        className={`mt-6 px-3 py-2   ${
          selectedSeats.length === 0
            ? "bg-gray-950 cursor-not-allowed"
            : "bg-yellow-500 hover:bg-yellow-600 text-black"
        } `}
      >
        {selectedSeats.length === 0
          ? "Select Seats to Book"
          : `Book ${selectedSeats.length} Ticket(s)`}
      </Button>
    </div>
  );
};

export default Tickets;

/*

hey for my movie booking application i want to implament a feature where if two users are trying to book a same seat at the same time then the second user should be notified that the seat is already booked and he should be redirected to the previous page.how do i implement that feature
*/
