import type { Request, Response } from "express";
import { ProductModel } from "../models/ProductModel.js";
import { hotdogView } from "../views/productView.js";
import { idParamSchema } from "../validators/common.schema.js";
import { HttpError } from "../utils/HttpError.js";

export const ProductController = {
  async index(_req: Request, res: Response) {
    const products = await ProductModel.listHotdogs();
    res.json(products.map(hotdogView));
  },

  async show(req: Request, res: Response) {
    const { id } = idParamSchema.parse(req.params);
    const product = await ProductModel.findHotdogById(id);
    if (!product) throw new HttpError(404, "Produto não encontrado.");
    res.json(hotdogView(product));
  },
};
