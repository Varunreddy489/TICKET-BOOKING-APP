import { prisma } from "../config";
import AppError from "../utils/errors/app.error";

import { StatusCodes } from "http-status-codes";

export const getDashBoardStats = async () => {
  try {
    const movieCount = await prisma.movie.count();
    const ticketCount = await prisma.ticket.count();
    const totalRevenue = await prisma.ticket.aggregate({
      _sum: {
        totalCost: true,
      },
    });

    const seatOccupancy = await prisma.$queryRaw`
    SELECT
      SUM(CASE WHEN s.status = 'BOOKED' THEN 1 ELSE 0 END) AS "bookedSeats",
      SUM(m."movieSeatCapacity") AS "totalSeatCapacity",
      ROUND((SUM(CASE WHEN s.status = 'BOOKED' THEN 1 ELSE 0 END) * 100.0 / SUM(m."movieSeatCapacity")), 2) AS "occupancyRate"
    FROM "Movie" m
    LEFT JOIN "Seat" s ON m.id = s."movieId";
  `;

    const monthlyRevenue = await prisma.$queryRaw`
    SELECT
      DATE_TRUNC('month', "createdAt") AS month,
      SUM("totalCost") AS revenue
    FROM "Ticket"
    GROUP BY month
    ORDER BY month;
  `;

    const recentTickets = await prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const popularMovies = await prisma.$queryRaw`
  SELECT
    m.id AS "movieId",
    m.name AS "movieName",
    m."movieSeatCapacity" AS "movieSeatCapacity",
    m.images AS "images",
    COUNT(s.id) AS "seatsBooked",
    ROUND(COUNT(s.id) * 100.0 / m."movieSeatCapacity", 2) AS "percentage",
    SUM(t."totalCost") AS "totalRevenue"
  FROM "Movie" m
    LEFT JOIN "Ticket" t ON m.id = t."movieId"
    LEFT JOIN "Seat" s ON t.id = s."ticketId"
  GROUP BY m.id, m.name, m."movieSeatCapacity", m.images
  ORDER BY "seatsBooked" DESC;
`;

    const data = {
      movieCount,
      ticketCount,
      totalRevenue,
      seatOccupancy,
      monthlyRevenue,
      recentTickets,
      popularMovies,
    };

    return data;
  } catch (error: any) {
    console.log(error);
    throw new AppError(
      error.message || "Cannot fetch the stats",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// const popularMovies = await prisma.$queryRaw`

// SELECT m.id AS movieId,
// m.name AS movieName,
// m.movieSeatCapacity As movieSeatCapacity,
// m.images As images,
// COUNT(t.id) AS seatsBooked,
// ROUND(COUNT(t.id) * 100 / m.movieSeatCapacity, 2) AS percentage,
// SUM(t.totalCost) AS totalRevenue

// FROM "Movie" m
//   LEFT JOIN "Ticket" t ON m.id = t.movieId
//   LEFT JOIN "Seat" s ON t.id = s.ticketId
//   GROUP BY m.id
//   ORDER BY seatsBooked DESC
//   LIMIT 10;

// `;
