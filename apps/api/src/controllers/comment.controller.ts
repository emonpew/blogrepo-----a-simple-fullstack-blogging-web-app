// src/controllers/comment.controller.ts
import { Request, Response } from "express";
import {
  commentAddRequestBody,
  commentUpdateRequestBody,
} from "../types/comment.type";
import prisma from "../utils/prisma";
import { error } from "console";

export const getAllComment = async (req: Request, res: Response) => {
  try {
    return res.json({ message: "GET all comment" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const reqBody: commentAddRequestBody = req.body;

    const postExist = await prisma.post.findUnique({
      where: { id: reqBody.postId },
    });
    if (!postExist) {
      return res.status(400).json({ error: "post not found" });
    }

    await prisma.comment.create({
      data: { ...reqBody, authorId: req.user!.id },
    });

    return res.status(201).json({ message: "created successfully" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content }: commentUpdateRequestBody = req.body;
    const id = Number(req.params.id);

    const commentExist = await prisma.comment.findUnique({ where: { id } });
    if (!commentExist) {
      return res.status(400).json({ error: "message not found" });
    }
    if (commentExist.authorId !== req.user!.id) {
      return res
        .status(400)
        .json({ error: "not allowed to change other's comment" });
    }

    await prisma.comment.update({ data: { content }, where: { id } });
    return res.status(200).json({ message: "comment updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const commentExist = await prisma.comment.findUnique({ where: { id } });
    if (!commentExist) {
      return res.status(400).json({ error: "message not found" });
    }
    if (commentExist.authorId !== req.user!.id) {
      return res
        .status(400)
        .json({ error: "not allowed to delete other's comment" });
    }

    await prisma.comment.delete({ where: { id } });

    return res.status(200).json({ message: "comment deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
