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
        const response = await axios.get("/api/post/getallposts");
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
    <div className=" flex flex-col items-center gap-5 w-[40%]        p-2  ">
      <div className="flex flex-col w-full gap-1  card-bg rounded-md  p-2">
        <h1 className=" text-gray-100 text-xl text-start font-semibold ">
          Popular Posts
        </h1>
        {loading ? (
          <div className="flex justify-center items-center ">
          <span class="loader-small"></span>
        </div>
        ) : (
          <div>
            {allPosts.length===0&& <p className="text-sm text-gray-200 text-center my-3">No post available</p>}
            {allPosts?.map((post, key) => (
              <div key={post._id} className="flex flex-col gap-2    ">
               
                <div className="flex flex-col mt-3 ">
                  <div className="flex gap-2 items-center">
                    <h1 className="text-gray-200 font-medium text-sm">{post.author}</h1>
                    <p className="text-sm text-gray-400">
                      {moment(post.createdAt).fromNow()}
                    </p>
                    <span className="text-gray-300 text-sm">
                      {post.likes.length} <span>{post.likes.length>1?"likes":"like"}</span>
                    </span>
                  </div>
                  <NavLink to={`/post/${post?.slug}`}><h1 className="text-gray-200 font-semibold underline">{post.title}</h1></NavLink>
                  

                 
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
