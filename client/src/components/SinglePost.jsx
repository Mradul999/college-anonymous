import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaRegCommentAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa6";
import Modal from "./postModal";
import { FaRegThumbsUp } from "react-icons/fa6";
import SigninModal from "./SigninModal";

export default function SinglePost({ post, onDelete }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [commentCount, setCommentsCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [signinModal, setSigninModal] = useState(false);
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
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comment/getcomments/${post._id}`);
      if (response.status === 200) {
        setCommentsCount(response.data?.length);
      }
    };
    getComments();
  }, []);

  const likeHandler = async (e) => {
    try {
      if (!currentUser) {
        e.stopPropagation();
        setSigninModal(true);
        return;
      }
      e.stopPropagation();
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/post/likepost/${post._id}/${currentUser._id}`
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
    } catch (error) {}
  };
  
  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/post/deletepost/${post._id}`
      );
      if (response.status === 200) {
        setModal(false);
        onDelete(response.data._id);
      }
    } catch (error) {}
  };
  
  const showModal = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  const closeModal = () => {
    setSigninModal(false);
    setModal(false);
  };
  
  return (
    <div
      onClick={postClickHandler}
      className={`p-4 cursor-pointer rounded-lg shadow-sm ${theme === "dark" ? "bg-cardBg-dark border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-800"} border mb-4`}
    >
      {signinModal && <SigninModal onClose={closeModal}></SigninModal>}
      {modal && <Modal onClose={closeModal} deleteHandler={deleteHandler} />}
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <span className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-[#1877F2]"}`}>
              {post.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>@{post.author}</p>
            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{moment(post.createdAt).fromNow()}</p>
          </div>
        </div>
      </div>

      <h1 className={`font-bold mb-2 text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        {post.title}
      </h1>
      
      {post.image && (
        <img
          src={post?.image}
          className="mb-3 rounded-lg w-full max-h-[300px] object-cover border"
          alt="Post image"
        />
      )}
      
      <div className="mb-4">
        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} line-clamp-2`}>
          {post.content}
        </p>
      </div>

      <div className={`flex justify-between items-center pt-2 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex items-center gap-4">
          <button
            onClick={likeHandler}
            className={`flex items-center gap-1 py-1 px-2 rounded-md transition-colors ${liked ? (theme === "dark" ? "text-[#4080FF]" : "text-[#1877F2]") : (theme === "dark" ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100")}`}
          >
            {liked ? (
              <FaThumbsUp className="text-lg" />
            ) : (
              <FaRegThumbsUp className="text-lg" />
            )}
            <span className="text-sm font-medium">{likesCount}</span>
          </button>

          <button 
            className={`flex items-center gap-1 py-1 px-2 rounded-md ${theme === "dark" ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"} transition-colors`}
          >
            <FaRegCommentAlt className="text-lg" />
            <span className="text-sm font-medium">{commentCount}</span>
          </button>
        </div>

        {currentUser?._id === post.userId && (
          <button
            onClick={showModal}
            className="bg-red-500 hover:bg-red-600 rounded-md px-3 py-1.5 text-sm text-white font-medium transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
