import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa6";

export default function SingleComment({ comment }) {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);


  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/user/getuser/${comment.userId}`);
        setUser(response.data);
      } catch (error) {}
    };
    getUser();
  }, [comment]);
  return (
    <div className="w-full rounded-md mt-2  ">
      <div className="flex gap-2 items-center">
        <h1 className="text-gray-200 font-medium">@{user?.username}</h1>
        <span className="text-sm text-gray-400">
          {moment(comment?.createdAt).fromNow()}
        </span>
      </div>
      <p className="text-sm mt-1 text-gray-200 ">{comment?.content}</p>
      <div className="flex gap-2 items-center ">
        {liked ? (
          <FaThumbsUp
            className={`
               text-md transition-all`}
          />
        ) : (
          <FaRegThumbsUp className={` text-md transition-all  `} />
        )}

        <span>{comment?.likes.length}</span>
      </div>
    </div>
  );
}
