import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import Comments from "../components/Comments";
import { ThreeDots } from "react-loader-spinner";
import SigninModal from "../components/SigninModal";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [signinModal, setSigninModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/getallposts`
        );
        if (response.status === 200) {
          setLoading(false);
          const foundPost = response.data.posts.find(
            (p) => p.slug === postSlug
          );
          setPost(foundPost);
          setLikesCount(foundPost.likes.length);

          if (currentUser) {
            setLiked(foundPost.likes.includes(currentUser._id));
          }
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [postSlug, currentUser]);

  const likeHandler = async (e) => {
    try {
      if (!currentUser) {
        setSigninModal(true);
        return;
      }

      e.stopPropagation();
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/post/likepost/${post._id}/${
          currentUser._id
        }`
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
      console.error("Error liking post:", error);
    }
  };

  const closeModal = () => {
    setSigninModal(false);
  };

  if (loading)
    return (
      <div className={`w-full min-h-screen pt-20 pb-20 flex justify-center items-center ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color={theme === "dark" ? "#ffffff" : "#1877F2"}
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    );

  if (!post)
    return (
      <div className={`w-full min-h-screen pt-20 pb-20 flex justify-center items-center ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
        <p className={`text-xl font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Post not found</p>
      </div>
    );

  return (
    <div className={`w-full min-h-screen pt-20 pb-20 flex justify-center ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
      {signinModal && <SigninModal onClose={closeModal} />}
      <div className="max-w-[800px] px-4 mt-2 mb-10 items-center w-full flex gap-6 flex-col">
        <div className={`w-full ${theme === "dark" ? "bg-cardBg-dark" : "bg-white"} rounded-lg shadow-md p-6`}>
          <div className="flex items-center mb-4">
            <div className={`${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#E7F3FF] text-[#1877F2]"} rounded-full px-3 p-2 mr-3`}>
              <span className="font-bold ">
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {post.author}
              </h3>
              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>

          <h1 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {post.title}
          </h1>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto rounded-lg mb-4 object-cover max-h-[400px]"
            />
          )}

          <div className="prose max-w-none mb-6">
            <p className={`whitespace-pre-wrap ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              {post.content}
            </p>
          </div>

          <div className={`flex items-center justify-between border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"} pt-4`}>
            <div className="flex items-center space-x-2">
              <button
                onClick={likeHandler}
                className={`flex items-center space-x-1 ${!currentUser && "cursor-not-allowed opacity-50"}`}
                disabled={!currentUser}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${liked ? "text-[#1877F2]" : theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                  fill={liked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{likesCount}</span>
              </button>
            </div>
          </div>
        </div>

        <hr className={`w-full border-t-2 ${theme === "dark" ? "border-gray-700" : "border-[#1877F2] border-opacity-20"} my-4`} />

        <Comments post={post} />
      </div>
    </div>
  );
}
