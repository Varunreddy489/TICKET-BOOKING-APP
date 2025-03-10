import cors from "cors";
import express from "express";

import { apiRoutes } from "./routes";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRoutes);

export default app;
