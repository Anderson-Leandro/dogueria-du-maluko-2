import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { routes } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

export const app = express();

app.disable("x-powered-by");
// Requisições chegam pelo proxy do Vite (loopback). Confiar só nele faz o
// rate limit usar o IP real do cliente (X-Forwarded-For) em vez de 127.0.0.1.
app.set("trust proxy", "loopback");
app.use(cors({ origin: env.corsOrigins }));
app.use(express.json({ limit: "100kb" }));

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);
