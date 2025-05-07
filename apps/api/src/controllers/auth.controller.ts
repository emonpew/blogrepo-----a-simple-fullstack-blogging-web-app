// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { LoginRequestBody, RegisterRequestBody } from "../types/auth.type";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../utils/config";

const SALT_ROUND = 10;

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, password }: RegisterRequestBody = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(409).json({ error: "username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// export const loginController = async (req: Request, res: Response) => {
//   try {
//     res.status(201).json({ message: "auth created" });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password }: LoginRequestBody = req.body;

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Return generic error to avoid revealing whether user exists
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Create JWT payload (exclude sensitive data)
    const payload = {
      id: user.id,
      username: user.username,
    };

    // Generate token
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Return success response with token
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
