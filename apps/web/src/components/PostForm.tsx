"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiService } from "../services/api.service";

type PostFormProps = {
  initialData?: {
    title: string;
    slug: string;
    content: string;
  };
  id?: number;
};

export default function PostForm({ initialData, id }: PostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with existing data if editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let response;
      if (id) {
        response = await ApiService.put(`/posts/${id}`, formData);
      } else {
        response = await ApiService.post(`/posts`, formData);
      }
      if (!response.ok) throw new Error("Failed to submit");
      router.push(`/posts/${formData.slug}`);
    } catch (error) {
      console.error("submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="custom_container">
      <div className="card bg-base-300 shadow-2xl">
        <div className="card-body">
          <form
            className="flex flex-col items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              name="title"
              type="text"
              className="input input-primary"
              placeholder="title"
              required
              value={formData.title}
              onChange={handleChange}
            />
            <input
              name="slug"
              type="text"
              className="input input-primary"
              placeholder="slug"
              required
              value={formData.slug}
              onChange={handleChange}
            />
            <textarea
              name="content"
              className="textarea textarea-primary"
              placeholder="content"
              required
              value={formData.content}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : id
                  ? "Update Post"
                  : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
