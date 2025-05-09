"use client";
import PostForm from "../../../components/PostForm";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function pages() {
  return (
    <ProtectedRoute>
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <PostForm />
    </ProtectedRoute>
  );
}
