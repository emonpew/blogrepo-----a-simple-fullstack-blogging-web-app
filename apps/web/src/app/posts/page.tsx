import PostCard from "../../components/PostCard";
import Spacer from "../../components/Spacer";

export default function page() {
  const lorem =
    " Non do labore dolore pariatur excepteur reprehenderit eu dolore pariatur amet laborum laborum. Commodo qui ex excepteur qui veniam minim magna amet. Eu Lorem voluptate do fugiat nulla Lorem nulla ex enim cillum nostrud nulla. Sit adipisicing quis ex ullamco dolor dolor ad. Exercitation esse sunt eiusmod amet dolore laboris magna dolore. Irure cillum fugiat proident occaecat deserunt eiusmod mollit. ";

  return (
    <div className="custom_container">
      <div className="flex items-center justify-center">
        <input type="text" className="input" placeholder="search posts" />
        <div className="ml-1 btn btn-primary">search</div>
      </div>
      <Spacer />
      <h2 className="text-xl">Posts</h2>
      <div className="divider"></div>
      <div className="flex flex-wrap justify-center gap-1">
        <PostCard
          title="Post title"
          content={lorem}
          liked
          likes={3000}
          comments={100}
        />{" "}
        <PostCard
          title="Post title"
          content={lorem}
          likes={300}
          comments={100}
        />{" "}
        <PostCard
          title="Post title"
          content={lorem}
          likes={300}
          comments={100}
        />{" "}
        <PostCard
          title="Post title"
          content={lorem}
          likes={300}
          comments={100}
        />{" "}
        <PostCard
          title="Post title"
          content={lorem}
          likes={300}
          comments={100}
        />{" "}
        <PostCard
          title="Post title"
          content={lorem}
          likes={300}
          comments={100}
        />{" "}
        <PostCard
          title="Post title"
          content={lorem}
          likes={300}
          comments={100}
        />{" "}
        <PostCard
          title="Post title"
          content={lorem}
          likes={300}
          comments={100}
        />{" "}
        <PostCard
          title="Post title"
          content={lorem}
          likes={300}
          comments={100}
        />{" "}
        <PostCard
          title="Post title"
          content={lorem}
          likes={300}
          comments={100}
        />
      </div>
      <div className="join w-full  justify-center">
        <button className="join-item btn">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">99</button>
        <button className="join-item btn">100</button>
      </div>
    </div>
  );
}
