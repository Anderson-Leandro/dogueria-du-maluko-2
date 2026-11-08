import type { Request, Response } from "express";
import { OrderModel } from "../models/OrderModel.js";
import { orderView } from "../views/orderView.js";
import { createOrderSchema } from "../validators/order.schema.js";
import { idParamSchema } from "../validators/common.schema.js";
import { HttpError } from "../utils/HttpError.js";

export const OrderController = {
  async create(req: Request, res: Response) {
    const data = createOrderSchema.parse(req.body);
    const order = await OrderModel.create(req.userId!, data);
    res.status(201).json(orderView(order));
  },

  async index(req: Request, res: Response) {
    const orders = await OrderModel.listByUser(req.userId!);
    res.json(orders.map(orderView));
  },

  async show(req: Request, res: Response) {
    const { id } = idParamSchema.parse(req.params);
    const order = await OrderModel.findByIdForUser(id, req.userId!);
    if (!order) throw new HttpError(404, "Pedido não encontrado.");
    res.json(orderView(order));
  },
};
