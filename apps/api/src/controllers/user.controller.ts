// src/controllers/user.controller.ts
import { Request, Response } from "express";
import ResponseService from "../services/response.service";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    res.json({ message: "GET all user" });
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    return ResponseService.success(res);
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};
