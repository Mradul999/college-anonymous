import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

export default function Comments({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `/api/comment/getcomments/${post._id}`
        );
        if (response.status === 200) {
          const sortedComments = response.data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setcomments(sortedComments);
        }
      } catch (error) {}
    };
    fetchComments();
  }, [post]);
  return (
    <div className="w-full flex flex-col   mt-6">
      <form className="w-full">
        <div className="flex  gap-3 items-center">
          <span className="text-white font-semibold text-sm">{currentUser.username}</span>
        <textarea rows={1}
          type="text"
          placeholder="Add Comment"
          className="w-full focus:outline-none placeholder:text-sm bg-transparent border-b border-gray-500 placeholder:text-white  focus:border-b-white  focus:border-b-2  text-white text-sm"

        />
                

        </div>
        

        
      </form>
      <button className=" bg-indigo-600 py-1 px-2 rounded-full text-xs hover:bg-indigo-500 transition-all self-end mt-2 font-medium ">Comment</button>
     

      <div className="flex flex-col mt-2 gap-2">
        {comments?.map((comment) => (
          <SingleComment comment={comment} key={comment._id} />
        ))}
      </div>
    </div>
  );
}
