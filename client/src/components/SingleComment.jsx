import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function SingleComment({ comment }) {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes.length);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/user/getuser/${comment.userId}`);
        setUser(response.data);
      } catch (error) {}
    };
    getUser();
  }, [comment.userId]);

  useEffect(() => {
    if (currentUser) {
      setLiked(comment.likes.includes(currentUser._id));
    }
  }, [comment.likes]);

  const likeHandler = async () => {
    // console.log("comment._id,currentUser._id", comment._id, currentUser._id);
    try {
      const response = await axios.put(
        `/api/comment/likecomment/${comment._id}/${currentUser._id}`
      );
      if (response.status === 200) {
        if (response.data.likes.includes(currentUser._id)) {
          setLiked(true);
          setLikesCount(likesCount + 1);
        } else {
          setLiked(false);
          setLikesCount(likesCount - 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full rounded-md mb-4  ">
      <div className="flex gap-2 items-center">
        <h1 className="text-gray-200 font-medium">@{user?.username}</h1>
        <span className="text-sm text-gray-400">
          {moment(comment?.createdAt).fromNow()}
        </span>
      </div>
      <p className="text-sm mt-1 text-gray-200 ">{comment?.content}</p>
      <div className="flex gap-2 items-center  ">
        {liked ? (
          <FaThumbsUp
            onClick={likeHandler}
            className={`
               text-md transition-all`}
          />
        ) : (
          <FaRegThumbsUp
            onClick={likeHandler}
            className={` text-md transition-all  `}
          />
        )}

        <span className="text-sm">{likesCount}</span>
        {currentUser._id === comment.userId && (
          <div className="flex  items-center text-sm pl-2">
            <button className="hover:bg-gray-600 px-2 py-1 rounded-full transition-all">
              Edit
            </button>
            <button className="hover:bg-gray-600 px-2 py-1 rounded-full transition-all">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
