import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { routes } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

export const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: env.corsOrigins }));
app.use(express.json({ limit: "100kb" }));

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);
