import cors from "cors";
import express from "express";

import { apiRoutes } from "./routes";
import { PORT, logger } from "./config";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Jai Shree Ram");
  logger.info(`Server is running on port ${PORT}`);
});
