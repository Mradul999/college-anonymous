import React, { useEffect, useState } from "react";
import axios from "axios";
import SinglePost from "./SinglePost";
import { MdAddCircleOutline } from "react-icons/md";
export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/post/getallposts");
      if (response.status === 200) {
        const sortedPosts=response.data.posts.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
        setAllPosts(sortedPosts);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className=" flex flex-col items-center gap-10 w-full h-screen   overflow-y-scroll scrollbar-hide     p-2  ">
      <button className=" bg-indigo-700 text-start text-gray-200 font-semibold text-lg rounded-md px-2 py-5 w-full flex  items-center gap-1">
      <MdAddCircleOutline className="text-2xl" />
        Create post...
      </button>
      <div className="flex flex-col w-full     gap-4">
        {allPosts?.map((post) => (
          <SinglePost post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};
