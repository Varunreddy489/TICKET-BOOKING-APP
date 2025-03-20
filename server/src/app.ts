import cors from "cors";
import express from "express";
import { clerkMiddleware } from "@clerk/express";

import { limiter } from "./config";
import { apiRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(clerkMiddleware());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRoutes);

export default app;
