// src/controllers/post.controller.ts
import { Request, Response } from "express";
import {
  postCreateRequestBody,
  postUpdateRequestBody,
} from "../types/post.type";
import prisma from "../utils/prisma";
import { verifySlug } from "../utils/slugVerifier";
import TagServices from "../services/tag.service";
import tagService from "../services/tag.service";

export const getAllPost = async (req: Request, res: Response) => {
  try {
    res.json({ message: "GET all post" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { tags = [], ...reqBody }: postCreateRequestBody = req.body;
    if (!verifySlug(reqBody.slug)) {
      return res.status(400).json({ error: "invalid slug" });
    }
    const slugExist = await prisma.post.findUnique({
      where: { slug: reqBody.slug },
    });
    if (slugExist) {
      return res.status(400).json({ error: "slug already taken" });
    }
    // if (!req.user?.id) {
    //   return res.status(500).json({ error: "internal server error" });
    // }
    const post = await prisma.post.create({
      data: { authorId: req.user!.id, ...reqBody },
    });

    if (tags.length > 0) {
      await TagServices.syncPostTags(post.id, tags);
    }

    return res.status(201).json({ message: "post created successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { tags, ...reqBody }: postUpdateRequestBody = req.body;
    const params = req.params;
    const id = Number(params.id);
    if (reqBody.slug) {
      if (!verifySlug(reqBody.slug)) {
        return res.status(400).json({ error: "invalid slug" });
      }
      const slugExist = await prisma.post.findUnique({
        where: { slug: reqBody.slug },
      });
      if (slugExist) {
        return res.status(400).json({ error: "duplicate slug" });
      }
    }

    const postExist = await prisma.post.findUnique({ where: { id } });
    if (!postExist) {
      return res.status(400).json({ error: "post not found" });
    }
    if (postExist.authorId != req.user!.id) {
      return res
        .status(401)
        .json({ error: "not allowed to change other's post" });
    }

    const post = await prisma.post.update({ data: reqBody, where: { id } });
    if (tags) {
      await tagService.syncPostTags(post.id, tags);
    }
    return res.status(200).json({ message: "updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const id = Number(params.id);

    const postExist = await prisma.post.findUnique({ where: { id } });
    if (!postExist) {
      return res.status(400).json({ error: "post not found" });
    }
    if (postExist.authorId != req.user!.id) {
      return res
        .status(401)
        .json({ error: "not allowed to delete other's post" });
    }

    await prisma.post.delete({ where: { id } });
    return res.status(200).json({ message: "post deleted" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
