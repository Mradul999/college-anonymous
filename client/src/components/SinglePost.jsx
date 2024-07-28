import React from "react";
import moment from "moment";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";

export default function SinglePost({ post }) {
  return (
    <div className="p-2   bg-indigo-600 text-gray-200     rounded-lg">
      <div className="flex items-center  gap-4">
        <p>@{post.author}</p>
        <p className=" text-sm">{moment(post.createdAt).fromNow()}</p>
      </div>

      <h1 className="font-semibold mb-3 tracking-normal text-white text-lg">
        {post.title}
      </h1>
      <div className="flex mb-3">
        <p className="text-sm ">{post.content}</p>
      </div>
      {post.image && (
        <img src={post?.image} className=" mb-3 rounded-md " alt="" />
      )}

      <div className="flex  gap-3 items-center  ">
        <div className="flex items-center justify-center bg-indigo-500 px-2 gap-1 py-1 rounded-full">
          <CiHeart className=" " />
          <span className="text-xs">20</span>
        </div>

        <div className="flex items-center justify-center bg-indigo-500 px-2 py-1 gap-1  rounded-full">
          <FaRegCommentAlt className=" text-sm " />
          <span className="text-xs">20</span>
        </div>
      </div>
    </div>
  );
}
