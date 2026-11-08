import { Router } from "express";
import { AboutController } from "../controllers/AboutController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const aboutRoutes = Router();

aboutRoutes.get("/", asyncHandler(AboutController.show));
