import Link from "next/link";
import { FaHeart, FaRegCommentAlt, FaRegHeart } from "react-icons/fa";

interface PostType {
  title: string;
  content: string;
  liked?: boolean;
  likes: number;
  comments: number;
  list?: boolean;
  href: string;
}

const renderNum = (num: number) => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`; // Thousand
  } else if (num < 1000000000) {
    return `${(num / 1000000).toFixed(1)}M`; // Million
  } else {
    return `${(num / 1000000000).toFixed(1)}B`; // Billion
  }
};

export default function PostCard({
  title,
  content,
  liked = false,
  likes,
  comments,
  list = false,
  href,
}: PostType) {
  return (
    <Link href={href} className={`w-full  ${list ? "" : "lg:w-96"}`}>
      <div
        className={`card bg-base-100 w-full ${list ? "" : "lg:w-96"} shadow-sm`}
      >
        <div className="card-body">
          <div className="card-title line-clamp-1">{title}</div>
          <p className="line-clamp-3">{content}</p>

          <div className="card-actions justify-end">
            <div className="flex items-center">
              {liked ? <FaHeart /> : <FaRegHeart />}
              <h2>{renderNum(likes)}</h2>
            </div>
            <div className="ml-3 flex items-center">
              {<FaRegCommentAlt />}
              <h2>{renderNum(comments)}</h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
