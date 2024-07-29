import React, { useEffect, useState } from "react";
import moment from "moment";

import { FaRegCommentAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa6";

export default function SinglePost({ post }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [commentCount, setCommentsCount] = useState(0);
  console.log("commentCount",commentCount);
  const [liked, setLiked] = useState(false);
  const postClickHandler = () => {
    navigate(`/post/${post?.slug}`);
  };
  useEffect(() => {
    if (currentUser) {
      setLiked(post.likes.includes(currentUser._id));
    }
  }, [currentUser, post.likes]);

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(`/api/comment/getcomments/${post._id}`);
      if (response.status === 200) {
        console.log("response",response);
        setCommentsCount(response.data?.length);
      }
    };
    getComments();
  },[]);

  const likeHandler = async (e) => {
    try {
      e.stopPropagation();
      const response = await axios.put(
        `/api/post/likepost/${post._id}/${currentUser._id}`
      );
      if (response.status === 200) {
        console.log(response);
        if (response.data.likes.includes(currentUser._id)) {
          setLiked(true);
          setLikesCount(likesCount + 1);
        } else {
          setLiked(false);
          setLikesCount(likesCount - 1);
        }
      }
    } catch (error) {}
  };
  return (
    <div
      onClick={postClickHandler}
      className="p-2   card-bg text-gray-200 cursor-pointer     rounded-lg"
    >
      <div className="flex items-center  gap-4">
        <p>@{post.author}</p>
        <p className=" text-sm">{moment(post.createdAt).fromNow()}</p>
      </div>

      <h1 className="font-semibold mb-3 tracking-normal text-gray-200  text-lg">
        {post.title}
      </h1>
      <div className="flex mb-3">
        <p className="text-sm ">{post.content}</p>
      </div>
      {post.image && (
        <img src={post?.image} className=" mb-3 rounded-md w-[400px] " alt="" />
      )}

      <div className="flex   gap-3 items-center  ">
        <div
          onClick={likeHandler}
          className="flex items-center justify-center px-2 gap-1 py-1 rounded-full"
        >
          {liked ? (
            <FaThumbsUp
              className={`
               text-md transition-all`}
            />
          ) : (
            <FaRegThumbsUp className={` text-md transition-all  `} />
          )}

          <span className="text-xs pt-[1.3px]">{likesCount}</span>
        </div>

        <div className="flex items-center justify-center  px-2 py-1 gap-1  rounded-full">
          <FaRegCommentAlt className=" text-md " />
          <span className="text-xs">{commentCount}</span>
        </div>
      </div>
    </div>
  );
}
