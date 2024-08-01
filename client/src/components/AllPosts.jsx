import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./SigninModal";
const API_URL = import.meta.env.VITE_API_URL;

import SinglePost from "./SinglePost";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/post/getallposts`);
        if (response.status === 200) {
          setLoading(false);
          const sortedPosts = response.data.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAllPosts(sortedPosts);
        }
      } catch (error) {
        setLoading(false);
      
      }
    };
    fetchPosts();
  }, []);

  const clickHandler = () => {
    if (!currentUser) {
      setModal(true);
      return;
    }
    navigate("/create-post");
  };

  const onDelete = async (postId) => {
    const updatedPosts = allPosts.filter((post) => post._id !== postId);
    setAllPosts(updatedPosts);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className=" flex flex-col items-center gap-6 w-full h-screen   overflow-y-scroll scrollbar-hide     p-2  ">
      {modal && <Modal onClose={closeModal} />}
      <button
        onClick={clickHandler}
        className=" dark:bg-cardBg-dark bg-gray-200 border border-gray-300 dark:border-gray-700 text-start dark:text-gray-200 text-textColor font-semibold text-lg rounded-md px-2 py-5 w-full flex  items-center gap-1"
      >
        <MdAddCircleOutline className="text-3xl text-indigo-600" />
        Create post...
      </button>

      <div className="flex flex-col w-full     gap-4">
        <h1 className="dark:text-gray-200 text-textColor font-semibold text-lg">Latest Posts</h1>
        {loading ? (
          <div className="flex justify-center items-center ">
            <span class="loader"></span>
          </div>
        ) : (
          <div className="flex flex-col w-full     gap-3">
            {allPosts.length === 0 && (
              <p className="text-center dark:text-gray-200 text-textColor">No post available</p>
            )}
            {allPosts?.map((post) => (
              <SinglePost post={post} onDelete={onDelete} key={post._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
