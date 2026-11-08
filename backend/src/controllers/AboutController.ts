import type { Request, Response } from "express";
import { AboutModel } from "../models/AboutModel.js";
import { aboutView } from "../views/aboutView.js";

export const AboutController = {
  async show(_req: Request, res: Response) {
    res.json(aboutView(await AboutModel.getAll()));
  },
};
