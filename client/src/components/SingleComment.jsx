import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa6";
import { useSelector } from "react-redux";

import Modal from "./Modal";

export default function SingleComment({ comment, filterComments, onEdit }) {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes.length);
  const { currentUser } = useSelector((state) => state.user);
  const [editArea, showEditArea] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);

  console.log("editedcomment", editedComment);

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

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `/api/comment/deletecomment/${comment._id}`
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
        `/api/comment/editcomment/${comment._id}`,
        { content: editedComment }
      );
      if (response.status === 200) {
        setLoading(false);
        onEdit(comment, response.data.content);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <span class="loader"></span>
        </div>
      ) : (
        <div className="w-full rounded-md mb-4 flex flex-col  ">
          {modal && <Modal deleteHandler={deleteHandler} />}
          <div className="flex gap-2 items-center">
            <h1 className="text-gray-200 font-medium">@{user?.username}</h1>
            <span className="text-sm text-gray-400">
              {moment(comment?.createdAt).fromNow()}
            </span>
          </div>
          {editArea ? (
            <textarea
              onChange={(e) => setEditedComment(e.target.value)}
              rows={1}
              value={editedComment}
              className="w-full   mt-2 focus:outline-none placeholder:text-sm bg-transparent border-b border-gray-500 placeholder:text-white  focus:border-b-white  focus:border-b-2  text-white text-sm"
            ></textarea>
          ) : (
            <p className="text-sm mt-1 text-gray-200 ">{editedComment}</p>
          )}
          {editArea && (
            <div className="flex gap-2 items-center self-end">
              <button
                onClick={() => showEditArea(false)}
                className={`   text-white py-1 px-2 rounded-full text-xs  hover:bg-indigo-600 transition-all self-end mt-2 font-medium `}
              >
                cancel
              </button>
              <button
                onClick={saveHandler}
                className={`   text-white py-1 px-2 rounded-full text-xs ${
                  !comment
                    ? "pointer-events-none text-gray-700 bg-gray-400"
                    : " pointer-events-auto bg-indigo-700"
                } hover:bg-indigo-500 transition-all self-end mt-2 font-medium `}
              >
                Save
              </button>
            </div>
          )}

          <div className={`flex gap-2 items-center ${editArea && "hidden"}   `}>
            <div
              onClick={likeHandler}
              className="flex items-center justify-center cursor-pointer  hover:bg-gray-700 transition-all px-2 gap-1 py-1 rounded-full"
            >
              {liked ? (
                <FaThumbsUp
                  className={`
               text-md transition-all`}
                />
              ) : (
                <FaRegThumbsUp className={` text-md transition-all  `} />
              )}
              <span className="text-xs">{likesCount}</span>
            </div>

            {currentUser._id === comment.userId && (
              <div className="flex  items-center text-sm pl-2">
                <button
                  onClick={() => showEditArea(true)}
                  className="hover:bg-gray-600 px-2 py-1 rounded-full transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={showModal}
                  className="hover:bg-gray-600 px-2 py-1 rounded-full transition-all"
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
