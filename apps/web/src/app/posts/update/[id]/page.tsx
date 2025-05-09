"use client";
import PostForm from "../../../../components/PostForm";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { useAuth } from "../../../../contexts/AuthProvider";
import { ApiService } from "../../../../services/api.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PostData {
  title: string;
  slug: string;
  content: string;
}

export default function PostEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      //   if (!user) return;
      if (!user && !isLoading) {
        router.push("/login");
      }
      if (!user) return;
      try {
        const { title, slug, content, authorId } = await ApiService.get(
          `/posts/${id}`
        );
        if (user.userId != authorId) {
          throw new Error("don't have permission to change this post");
        }
        setPost({ title, slug, content });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [user, isLoading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
        <PostForm initialData={post} id={Number(id)} />
      </div>
    </ProtectedRoute>
  );
}
