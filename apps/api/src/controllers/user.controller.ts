// src/controllers/user.controller.ts
import { Request, Response } from "express";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    res.json({ message: "GET all user" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    res.status(201).json({ message: "user created" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
