import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import SigninModal from "./SigninModal";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal";

export default function SingleComment({ comment, filterComments, onEdit }) {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes.length);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [editArea, showEditArea] = useState(false);
  const navigate=useNavigate();
  const [editedComment, setEditedComment] = useState(comment.content);

  const [signinModal, setSigninModal] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/getuser/${comment.userId}`);
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
    try {
      if (!currentUser) {
        setSigninModal(true);
        return;
      }
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/comment/likecomment/${comment._id}/${currentUser._id}`
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
        `${import.meta.env.VITE_API_URL}/api/comment/deletecomment/${comment._id}`
      );
      if (response.status === 200) {
        filterComments(response.data._id);
      }
    } catch (error) {}
  };

  const showModal = () => {
    setModal(!modal);
  };

  const saveHandler = async () => {
    showEditArea(false);
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/comment/editcomment/${comment._id}`,
        { content: editedComment }
      );
      if (response.status === 200) {
        setLoading(false);
        onEdit(comment, response.data.content);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSigninModal(false);
    setModal(false);
  };
  
  return (
    <div>
      {signinModal && <SigninModal onClose={closeModal}/>}
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <span className="loader"></span>
        </div>
      ) : (
        <div className={`w-full rounded-lg mb-4 flex flex-col p-4 ${theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-gray-50 border border-gray-200"}`}>
          {modal && <Modal onClose={closeModal} deleteHandler={deleteHandler} />}
          <div className="flex flex-col sm:flex-row  gap-2 items-start sm:items-center">
            <h1 className={`font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>@{user?.username}</h1>
            <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {moment(comment?.createdAt).fromNow()}
            </span>
          </div>
          {editArea ? (
            <textarea
              onChange={(e) => setEditedComment(e.target.value)}
              rows={3}
              value={editedComment}
              className={`w-full p-3 mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-800 border-gray-300"} border`}
            ></textarea>
          ) : (
            <p className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>{editedComment}</p>
          )}
          {editArea && (
            <div className="flex gap-2 items-center self-end mt-2">
              <button
                onClick={() => showEditArea(false)}
                className={`px-3 py-1.5 text-sm rounded-md font-medium ${theme === "dark" ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"} transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={saveHandler}
                className="px-3 py-1.5 text-sm bg-[#1877F2] text-white rounded-md font-medium hover:bg-[#166FE5] transition-colors"
              >
                Save
              </button>
            </div>
          )}

          <div className={`flex gap-2 items-center mt-3 ${editArea && "hidden"}`}>
            <button
              onClick={likeHandler}
              className={`flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80 px-2 gap-1 py-1 rounded-full ${liked ? (theme === "dark" ? "text-[#4080FF]" : "text-[#1877F2]") : (theme === "dark" ? "text-gray-400" : "text-gray-600")}`}
            >
              {liked ? (
                <FaThumbsUp className="h-5 w-5" />
              ) : (
                <FaRegThumbsUp className="h-5 w-5" />
              )}
              {likesCount > 0 && <span className="font-medium">{likesCount}</span>}
            </button>

            {currentUser?._id === comment.userId && (
              <div className="flex items-center text-sm pl-2">
                <button
                  onClick={() => showEditArea(true)}
                  className={`px-2 py-1 font-medium rounded-full transition-colors hover:underline ${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-[#1877F2] hover:text-[#166FE5]"}`}
                >
                  Edit
                </button>
                <button
                  onClick={showModal}
                  className="px-2 py-1 font-medium rounded-full transition-colors text-red-600 hover:text-red-700 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
