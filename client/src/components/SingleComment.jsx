import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function SingleComment({ comment }) {
  const [user, setUser] = useState(null);

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
      <div className="flex gap-3 items-center">
        <h1 className="text-white font-medium">@{user?.username}</h1>
        <span className="text-sm">{moment(comment?.createdAt).fromNow()}</span>
        
      </div>
      <p className="text-sm">{comment?.content}</p>
      <div>
        <span>{comment?.likes.length}</span>
      </div>
    </div>
  );
}
