"use client";
import { FaPlus } from "react-icons/fa";
import Spacer from "../../components/Spacer";
import { useState } from "react";
import PostCard from "../../components/PostCard";

export default function page() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: string[] = ["Posts", "Comments", "Likes"];
  const lorem =
    " Non do labore dolore pariatur excepteur reprehenderit eu dolore pariatur amet laborum laborum. Commodo qui ex excepteur qui veniam minim magna amet. Eu Lorem voluptate do fugiat nulla Lorem nulla ex enim cillum nostrud nulla. Sit adipisicing quis ex ullamco dolor dolor ad. Exercitation esse sunt eiusmod amet dolore laboris magna dolore. Irure cillum fugiat proident occaecat deserunt eiusmod mollit. ";

  return (
    <div className="custom_container flex flex-col lg:flex-row items-center h-screen">
      <div className="mt-2 card bg-base-300 shadow-2xl p-5 max-w-xl flex-col items-center ">
        <div className="w-32 h-32 rounded-full bg-gray-600"></div>
        <h2 className="text-lg">Example Name</h2>
        <Spacer></Spacer>
        <p className="max-h-36 overflow-auto">
          Exercitation elit esse duis ex ullamco et minim mollit occaecat.
          Mollit nulla anim pariatur esse ea et laborum consectetur. Mollit
          excepteur amet magna commodo consequat eu aliqua sit excepteur laboris
          duis. In excepteur eu eu ea excepteur nulla esse in dolor.
        </p>
        <Spacer></Spacer>
        <div className="stats stats-horizontal shadow">
          <div className="stat place-items-center">
            <div className="stat-title">followers</div>
            <div className="stat-value">31K</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">likes</div>
            <div className="stat-value">31K</div>
          </div>
        </div>
        <Spacer></Spacer>
        <button className="btn btn-outline btn-primary">
          <FaPlus /> Follow
        </button>
      </div>
      <div className=" m-2 card bg-base-300 shadow-2xl p-5 w-full grow">
        <div className=" flex flex-row justify-center gap-2">
          {tabs.map((val, idx) => (
            <button
              onClick={() => setActiveTab(idx)}
              className={`btn ${activeTab == idx ? "" : "btn-soft"} btn-primary`}
            >
              {val}
            </button>
          ))}
        </div>
        <div className="divider"></div>
        <div className="flex flex-col gap-2 max-h-96 overflow-auto">
          <PostCard
            href={"#"}
            list
            title="Post title"
            content={lorem}
            likes={300}
            comments={100}
          />
          <PostCard
            href={"#"}
            list
            title="Post title"
            content={lorem}
            likes={300}
            comments={100}
          />{" "}
          <PostCard
            href={"#"}
            list
            title="Post title"
            content={lorem}
            likes={300}
            comments={100}
          />{" "}
          <PostCard
            href={"#"}
            list
            title="Post title"
            content={lorem}
            likes={300}
            comments={100}
          />{" "}
          <PostCard
            href={"#"}
            list
            title="Post title"
            content={lorem}
            likes={300}
            comments={100}
          />{" "}
          <PostCard
            href={"#"}
            list
            title="Post title"
            content={lorem}
            likes={300}
            comments={100}
          />
        </div>
      </div>
    </div>
  );
}
