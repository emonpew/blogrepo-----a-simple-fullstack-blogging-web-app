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
import ResponseService from "../services/response.service";

export const getAllPost = async (req: Request, res: Response) => {
  try {
    // Parse query parameters for pagination and search
    const page = parseInt(req.query.page as string) || 1;
    const searchQuery = (req.query.search as string) || "";
    const limit = 10;
    const skip = (page - 1) * limit;

    // Build the where clause for search
    const whereClause = {
      published: true, // Only published posts
      ...(searchQuery && {
        OR: [
          { title: { contains: searchQuery } },
          { content: { contains: searchQuery } },
          {
            author: {
              username: { contains: searchQuery },
            },
          },
          {
            tags: {
              some: {
                tag: {
                  name: { contains: searchQuery },
                },
              },
            },
          },
        ],
      }),
    };

    // Get total count of posts for pagination info
    const totalPosts = await prisma.post.count({
      where: whereClause,
    });

    // Get posts with pagination and optional search
    const posts = await prisma.post.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc", // Newest first
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    // Return response with pagination info
    res.json({
      success: true,
      data: posts,
      pagination: {
        total: totalPosts,
        page,
        limit,
        totalPages: Math.ceil(totalPosts / limit),
      },
    });
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const slug = params.slug;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: { select: { username: true, id: true } },
        comments: {
          select: {
            author: { select: { id: true, username: true } },
            content: true,
            createdAt: true,
          },
        },
      },
    });
    if (!post) {
      return ResponseService.notFound(res, "post");
    }
    return res.status(200).json(post);
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { tags = [], ...reqBody }: postCreateRequestBody = req.body;
    if (!verifySlug(reqBody.slug)) {
      return ResponseService.badRequest(res, "invalid slug");
    }
    const slugExist = await prisma.post.findUnique({
      where: { slug: reqBody.slug },
    });
    if (slugExist) {
      return ResponseService.conflict(res, "slug");
    }
    const post = await prisma.post.create({
      data: { authorId: req.user!.id, ...reqBody },
    });

    if (tags.length > 0) {
      await TagServices.syncPostTags(post.id, tags);
    }

    return ResponseService.created(res, "post");
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { tags, ...reqBody }: postUpdateRequestBody = req.body;
    const params = req.params;
    const id = Number(params.id);

    const postExist = await prisma.post.findUnique({ where: { id } });
    if (!postExist) {
      return ResponseService.notFound(res, "post");
    }

    if (reqBody.slug && reqBody.slug != postExist.slug) {
      if (!verifySlug(reqBody.slug)) {
        return ResponseService.badRequest(res, "invalid slug");
      }
      const slugExist = await prisma.post.findUnique({
        where: { slug: reqBody.slug },
      });
      if (slugExist) {
        return ResponseService.conflict(res, "slug");
      }
    }

    if (postExist.authorId != req.user!.id) {
      return ResponseService.forbidden(
        res,
        "not allowed to change others post"
      );
    }

    const post = await prisma.post.update({ data: reqBody, where: { id } });
    if (tags) {
      await tagService.syncPostTags(post.id, tags);
    }
    return ResponseService.success(res);
  } catch (error: any) {
    return ResponseService.internalServerError(res);
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
      return ResponseService.forbidden(
        res,
        "not allowed to delete others post"
      );
    }

    await prisma.post.delete({ where: { id } });
    return ResponseService.success(res);
  } catch (error: any) {
    return ResponseService.internalServerError(res);
  }
};
