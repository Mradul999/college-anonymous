import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import { ThreeDots } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function Comments({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [comments, setcomments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/api/comment/getcomments/${post._id}`
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
      const response = await axios.post(
        `${API_URL}/api/comment/createcomment`,
        {
          content: comment,
          userId: currentUser._id,
          postId: post._id,
        }
      );
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
    <div className={`w-full flex flex-col mb-20 mt-6 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
      {!currentUser && (
        <div className={`mb-4 p-4 rounded-lg ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
          <p className="text-center font-medium">
            <NavLink to="/sign-in" className="text-[#1877F2] hover:underline">Sign in</NavLink>{" "}
            <span> to comment</span>{" "}
          </p>
        </div>
      )}
      <form
        onSubmit={submitHandler}
        className={`w-full flex flex-col ${!currentUser && "hidden"} `}
      >
       <div className="flex md:flex-row flex-col gap-2 md:gap-3 items-start md:items-center w-full">
  <span className={`font-semibold text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
    {currentUser?.username}
  </span>
  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    rows={1}
    placeholder="Write a comment..."
    className={`w-full resize-none bg-transparent focus:outline-none border-b focus:border-b-2 focus:border-[#1877F2] 
      ${theme === "dark" ? "text-gray-200 border-gray-600" : "text-gray-800 border-gray-400"}`}
  />
</div>
        <button
          className={`text-white py-2 px-4 rounded-lg text-sm transition-colors duration-200 self-end mt-2 font-medium ${
            !comment
              ? "pointer-events-none bg-gray-400"
              : "pointer-events-auto bg-[#1877F2] hover:bg-[#166FE5]"
          }`}
        >
          Comment
        </button>
      </form>
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <ThreeDots
            height="30"
            width="30"
            radius="9"
            color={theme === "dark" ? "#ffffff" : "#1877F2"}
            ariaLabel="loading"
            visible={true}
          />
        </div>
      ) : (
        <div className="flex flex-col mt-4 ">
          {comments.length === 0 && (
            <div className={`text-center py-6 rounded-lg ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-500"}`}>
              <p className="font-medium">No comments yet. Be the first to comment!</p>
            </div>
          )}
          {comments?.map((comment) => (
            <SingleComment
              comment={comment}
              onEdit={onEdit}
              filterComments={filterComments}
              key={comment._id}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}
