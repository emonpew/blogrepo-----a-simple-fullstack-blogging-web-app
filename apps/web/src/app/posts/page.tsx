"use server";
import { log } from "console";
import Pagination from "../../components/Pagination";
import PostCard from "../../components/PostCard";
import { ServerService } from "../../services/server.service";
import { redirect } from "next/navigation";

interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    username: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
  _count: {
    likes: number;
    comments: number;
  };
}

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function PostsPage({ searchParams }: PageProps) {
  // Fetch initial data on the server
  const page = searchParams.page || "1";
  const search = searchParams.search || "";

  try {
    const {
      data: posts,
      pagination,
    }: { data: Post[]; pagination: PaginationProps } =
      await ServerService.serverGet(`/posts?page=${page}&search=${search}`);

    // Search form action
    const handleSearch = async (formData: FormData) => {
      "use server";
      const searchQuery = formData.get("search") as string;
      // The redirect will happen automatically by Next.js
      redirect(`/posts?page=1&search=${encodeURIComponent(searchQuery)}`);
    };

    return (
      <div className="custom_container">
        {/* Search Bar (Client-side update) */}
        <div className="flex flex-col items-center gap-2">
          <form action={handleSearch}>
            <input
              name="search"
              className="input input-primary"
              type="text"
              placeholder="Search posts..."
              defaultValue={searchParams.search || ""}
            />
          </form>

          <div className="flex flex-wrap justify-center gap-1">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                comments={post._count.comments}
                likes={post._count.likes}
                content={post.content}
              />
            ))}
          </div>

          {/* Pagination (Client-side update) */}
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
          />
        </div>
      </div>
    );
  } catch (error) {
    return <p>error loading posts</p>;
  }
}
