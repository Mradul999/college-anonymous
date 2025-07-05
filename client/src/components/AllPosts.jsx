import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./SigninModal";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SinglePost from "./SinglePost";
import { ThreeDots } from "react-loader-spinner";

const API_URL = import.meta.env.VITE_API_URL;

export default function AllPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

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
    <div className="w-full h-screen flex flex-col ">
      {/* Create Post Button */}
      <button
        onClick={clickHandler}
        className={`w-full ${theme === "dark" ? "bg-cardBg-dark border-gray-700" : "bg-white border-gray-200"} border rounded-lg p-4 flex items-center gap-3 transition-colors mb-4 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm`}
      >
        <MdAddCircleOutline className="text-3xl text-[#1877F2]" />
        <span className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
          Create post...
        </span>
      </button>

      {/* Latest Posts Section */}
      <div className="w-full h-[calc(100vh-3rem)] overflow-y-auto scrollbar-hide">
        <h1 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Latest Posts
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <ThreeDots
              height="30"
              width="30"
              radius="9"
              color={theme === "dark" ? "#ffffff" : "#1877F2"}
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {allPosts.length === 0 ? (
              <p className={`text-center py-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                No posts available
              </p>
            ) : (
              allPosts.map((post) => (
                <SinglePost post={post} onDelete={onDelete} key={post._id} />
              ))
            )}
          </div>
        )}
      </div>

      {/* Signin Modal */}
      {modal && <Modal onClose={closeModal} />}
    </div>
  );
};