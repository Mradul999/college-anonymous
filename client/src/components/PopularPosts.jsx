import React, { useEffect, useState } from "react";
import axios from "axios";
import SinglePost from "./SinglePost";
import moment from "moment";
import Suggestion from "./Suggestion";
export const PopularPosts = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/post/getallposts");
      if (response.status === 200) {
        const sortedPosts = response.data.posts.sort(
          (a, b) => b.likes.length - a.likes.length
        );

        const topthreePost = sortedPosts.slice(0, 3);
        setAllPosts(topthreePost);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className=" flex flex-col items-center gap-5 w-[40%]        p-2  ">
      <div className="flex flex-col w-full gap-4  bg-indigo-600 rounded-md  p-2">
        <h1 className=" text-white text-xl text-start font-semibold ">
          Popular Posts
        </h1>
        {allPosts?.map((post) => (
          <div className="flex flex-col   ">
            <div className="flex gap-2 items-center">
              <h1 className="text-white">{post.author}</h1>
              <p className="text-sm text-white">
                {moment(post.createdAt).fromNow()}
              </p>
              <span className="text-gray-300 text-sm">{post.likes.length} Likes</span>
            </div>
            <h1 className="text-white font-semibold">{post.title}</h1>

            <p className="text-gray-300">{post.content}</p>
          </div>
        ))}
      </div>
      <Suggestion/>
    </div>
  );
};
