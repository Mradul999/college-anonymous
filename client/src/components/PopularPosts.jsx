import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import moment from "moment";
import Suggestion from "./Suggestion";
import { NavLink } from "react-router-dom";
export const PopularPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/getallposts`);
        if (response.status === 200) {
          setLoading(false);
          const sortedPosts = response.data.posts.sort(
            (a, b) => b.likes.length - a.likes.length
          );

          const topthreePost = sortedPosts.slice(0, 3);
          setAllPosts(topthreePost);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className=" flex flex-col items-center gap-5 md:w-[40%]         p-2  ">
      <div className="flex flex-col w-full gap-1  border border-gray-300 dark:border-gray-700   dark:bg-cardBg-dark bg-gray-200 rounded-md  p-2">
        <h1 className=" dark:text-gray-200 text-textColor text-xl text-start font-semibold ">
          Popular Posts
        </h1>
        {loading ? (
          <div className="flex justify-center items-center ">
          <span class="loader-small"></span>
        </div>
        ) : (
          <div>
            {allPosts.length===0&& <p className="text-sm dark:text-gray-200 text-textColor text-center my-3">No post available</p>}
            {allPosts?.map((post, key) => (
              <div key={post._id} className="flex flex-col gap-2    ">
               
                <div className="flex flex-col mt-3 ">
                  <div className="flex gap-2 items-center">
                    <h1 className="dark:text-gray-200 text-textColor font-medium text-sm">{post.author}</h1>
                    <p className="text-sm dark:text-gray-200 text-textColor">
                      {moment(post.createdAt).fromNow()}
                    </p>
                    <span className="dark:text-gray-200 text-textColor text-sm">
                      {post.likes.length} <span className="dark:text-gray-200 text-textColor">{post.likes.length>1?"likes":"like"}</span>
                    </span>
                  </div>
                  <NavLink to={`/post/${post?.slug}`}><h1 className="dark:text-gray-200 text-textColorfont-semibold underline">{post.title}</h1></NavLink>
                  

                 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Suggestion />
    </div>
  );
};
