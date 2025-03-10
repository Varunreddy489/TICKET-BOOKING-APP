// import { Prisma, PrismaClient } from "@prisma/client";
// import { Genres } from "../utils/common";

// const prisma = new PrismaClient();

// async function main() {
//   await prisma.movie.createMany({
//     data: [
//       {
//         title: "Parasite",
//         description:
//           "A poor family schemes to become employed by a wealthy household.",
//         rating: 9,
//         image: "https://example.com/parasite.jpg",
//         genres: [Prisma.Genres.Thriller],
//       },
//       {
//         title: "Avengers: Endgame",
//         description:
//           "The Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
//         rating: 9,
//         image: "https://example.com/endgame.jpg",
//         genres: [Prisma.Genres.Action],
//       },
//     ],
//   });

//   console.log("✅ Seed data inserted successfully!");
// }

// main()
//   .catch((e) => {
//     console.error("❌ Error inserting seed data:", e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
