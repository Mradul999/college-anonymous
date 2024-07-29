import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import Comments from "../components/Comments";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  console.log(post);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/post/getallposts");
        if (response.status === 200) {
          setLoading(false);
          const foundPost = response.data.posts.find(
            (p) => p.slug === postSlug
          );
          setPost(foundPost);
        }
      } catch (error) {}
    };
    fetchPosts();
  }, [postSlug]);
  return (
    <div className="w-full min-h-screen  pt-[5rem] pb-2   flex justify-center  text-gray-300">
      {loading ? (
        <div className="flex justify-center items-center">
          <ThreeDots
            height="40"
            width="60"
            wrapperClass
            color="white"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <div className="w-full flex flex-col  rounded-lg py-4 px-4 mb-10  max-w-[900px] ">
          <div className="bg-indigo-900 p-4 rounded-md">
            <div className="flex gap-3 mb-2 items-center">
              <span>{post?.author}</span>
              <span className="text-sm">
                {moment(post?.createdAt).fromNow()}
              </span>
            </div>

            <h1 className="font-semibold text-2xl mb-5">{post?.title}</h1>
            {post?.image && (
              <img
                src={post?.image}
                className="mb-2 w-[600px] rounded-md "
              ></img>
            )}
            <p className="mb-2">{post?.content}</p>
            <div className="flex  gap-3 items-center mb-4   ">
              <div className="flex items-center justify-center cursor-pointer bg-indigo-500 px-2 gap-1 py-1 rounded-full">
                <CiHeart className=" " />
                <span className="text-xs">20</span>
              </div>

              <div className="flex items-center justify-center cursor-pointer bg-indigo-500 px-2 py-1 gap-1  rounded-full">
                <FaRegCommentAlt className=" text-sm " />
                <span className="text-xs">20</span>
              </div>
            </div>
            <div className="h-[1px] bg-indigo-700 w-full"></div>
          </div>

          <Comments />
        </div>
      )}
    </div>
  );
}
