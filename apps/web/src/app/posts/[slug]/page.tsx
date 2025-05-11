import Link from "next/link";
import { ServerService } from "../../../services/server.service";
import { FaArrowRight } from "react-icons/fa";

interface PostProps {
  id: number;
  slug: string;
  title: string;
  content: string;
  published: true;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    username: string;
    id: number;
  };
  comments: {
    author: {
      id: number;
      username: string;
    };
    createdAt: string;
    content: string;
  }[];
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post: PostProps = await ServerService.serverGet(`/posts/${slug}`);

    return (
      <div className="custom_container">
        <div className="w-20 h-20 rounded-full bg-gray-500"></div>
        <Link href="#" className="text-lg link">
          {post.author.username}
        </Link>
        <p className="text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <h2 className="text-2xl mt-3">{post.title}</h2>
        <div className="divider"></div>
        <p>{post.content}</p>
        <div className="mt-5 border border-base-content rounded-2xl  p-5">
          <h2 className="text-lg my-1">comments ({post.comments.length})</h2>
          <div className="max-h-96 overflow-auto flex flex-col gap-2">
            {post.comments.map((val, idx) => (
              <div className="border border-base-content rounded-md p-5">
                <h2 className="text-lg">{val.author.username}</h2>
                <h5 className="text-sm">
                  {new Date(val.createdAt).toLocaleString()}
                </h5>
                <p>{val.content}</p>
              </div>
            ))}
          </div>
          <form>
            <div className="w-full flex items-center my-2">
              <input
                name="comment"
                type="text"
                placeholder="write a comment here"
                className="input grow"
              />
              <button type="submit" className="btn btn-primary">
                <FaArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    return <p>error loading page</p>;
  }
}
