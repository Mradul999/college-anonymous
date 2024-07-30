import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import { ThreeDots } from "react-loader-spinner";

export default function Comments({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setcomments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/comment/getcomments/${post._id}`
        );
        if (response.status === 200) {
          setLoading(false);
          const sortedComments = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setcomments(sortedComments);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchComments();
  }, [post]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!comment) {
      return;
    }
    try {
      const response = await axios.post("/api/comment/createcomment", {
        content: comment,
        userId: currentUser._id,
        postId: post._id,
      });
      if (response.status === 200) {
        setComment("");
        setcomments([response.data, ...comments]);
      }
    } catch (error) {}
  };

  const filterComments = async (commentId) => {
    const filteredComments = comments.filter(
      (comment) => comment._id !== commentId
    );
    setcomments(filteredComments);
  };

  const onEdit = async (comment, content) => {
    comments.map((c) => (c._id === comment._id ? { ...c, content } : c));
  };

  return (
    <div className="w-full flex flex-col   mt-6">
      <form onSubmit={submitHandler} className="w-full flex flex-col ">
        <div className="flex  gap-3 items-center">
          <span className="text-white font-semibold text-sm">
            {currentUser.username}
          </span>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={1}
            type="text"
            placeholder="Add Comment"
            className="w-full focus:outline-none placeholder:text-sm bg-transparent border-b border-gray-500 placeholder:text-white  focus:border-b-white  focus:border-b-2  text-white text-sm"
          />
        </div>
        <button
          className={`   text-white py-1 px-2 rounded-full text-xs ${
            !comment
              ? "pointer-events-none text-gray-700 bg-gray-400"
              : " pointer-events-auto bg-indigo-700"
          } hover:bg-indigo-500 transition-all self-end mt-2 font-medium `}
        >
          Comment
        </button>
      </form>
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
        <div className="flex flex-col mt-2 gap-2">
          {comments.length===0 && <p className="text-center">No comments yet</p>}
          {comments?.map((comment) => (
            <SingleComment
              comment={comment}
              onEdit={onEdit}
              filterComments={filterComments}
              key={comment._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
