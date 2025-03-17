import { prisma } from "../config";
import { SeatStatus } from "@prisma/client";

async function seedSeats() {
  const movie = await prisma.movie.findUnique({ where: { id: 1 } });
  console.log(movie);

  const seats = await prisma.seat.createMany({
    data: [
      { seatNumber: "A1", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "A2", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "A3", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "A4", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "A5", status: SeatStatus.AVAILABLE, movieId: 2 },

      { seatNumber: "B1", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "B2", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "B3", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "B4", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "B5", status: SeatStatus.AVAILABLE, movieId: 2 },

      { seatNumber: "C1", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "C2", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "C3", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "C4", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "C5", status: SeatStatus.AVAILABLE, movieId: 2 },

      { seatNumber: "D1", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "D2", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "D3", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "D4", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "D5", status: SeatStatus.AVAILABLE, movieId: 2 },

      { seatNumber: "E1", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "E2", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "E3", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "E4", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "E5", status: SeatStatus.AVAILABLE, movieId: 2 },

      { seatNumber: "F1", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "F2", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "F3", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "F4", status: SeatStatus.AVAILABLE, movieId: 2 },
      { seatNumber: "F5", status: SeatStatus.AVAILABLE, movieId: 2 },
    ],
    skipDuplicates: true, // Optional: skips if movieId +2seatNumber already exists
  });
  console.log("Seats created:", seats);
}

seedSeats()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
