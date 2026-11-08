import type { Request, Response } from "express";
import { ProductModel } from "../models/ProductModel.js";
import { drinkCategoryView, drinkView } from "../views/productView.js";
import { drinksQuerySchema } from "../validators/catalog.schema.js";

export const DrinkController = {
  async index(req: Request, res: Response) {
    const { category } = drinksQuerySchema.parse(req.query);
    const drinks = await ProductModel.listDrinks(category);
    res.json(drinks.map(drinkView));
  },

  async categories(_req: Request, res: Response) {
    const categories = await ProductModel.listDrinkCategories();
    res.json(categories.map(drinkCategoryView));
  },
};
