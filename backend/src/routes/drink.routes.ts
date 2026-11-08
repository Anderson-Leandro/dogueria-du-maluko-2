import { Router } from "express";
import { DrinkController } from "../controllers/DrinkController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const drinkRoutes = Router();

drinkRoutes.get("/", asyncHandler(DrinkController.index));
drinkRoutes.get("/categories", asyncHandler(DrinkController.categories));
