import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { FaFire, FaHeart, FaClock, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function PopularPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/getallposts`
        );
        if (response.status === 200) {
          setLoading(false);
          const sortedPosts = response.data.posts.sort(
            (a, b) => b.likes.length - a.likes.length
          );
          const topThreePosts = sortedPosts.slice(0, 3);
          setAllPosts(topThreePosts);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <div
        className={`rounded-lg shadow-md px-3 py-4 sm:p-4 ${
          theme === "dark" ? "bg-cardBg-dark border-gray-700" : "bg-white border-gray-200"
        } border`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <FaFire className="text-orange-500 text-lg sm:text-xl" />
          <h1
            className={`text-lg sm:text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Popular Posts
          </h1>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center py-6">
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
          <div className="space-y-2">
            {allPosts.length === 0 ? (
              <p
                className={`text-center py-4 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No posts available yet
              </p>
            ) : (
              allPosts.map((post) => (
                <NavLink
                  to={`/post/${post.slug}`}
                  key={post._id}
                  className="block group"
                >
                  <div
                    className={`p-3 sm:p-4 rounded-lg transition-colors ${
                      theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  >
                    {/* Author Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
  <div className={`flex items-center gap-1`}>
    <div
      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <FaUser
        className={`text-xs sm:text-sm ${
          theme === "dark" ? "text-gray-300" : "text-[#1877F2]"
        }`}
      />
    </div>
    <span
      className={`text-sm font-medium break-all ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      @{post.author}
    </span>
  </div>

  <div
    className={`flex items-center gap-1 text-sm ${
      theme === "dark" ? "text-gray-400" : "text-gray-500"
    }`}
  >
    <FaClock className="text-xs" />
    <span className="whitespace-nowrap">{moment(post.createdAt).fromNow()}</span>
  </div>
</div>


                    {/* Post Title */}
                    <h2
                      className={`text-base sm:text-lg font-semibold transition-colors break-words ${
                        theme === "dark"
                          ? "text-gray-100 group-hover:text-blue-400"
                          : "text-gray-900 group-hover:text-[#1877F2]"
                      }`}
                    >
                      {post.title}
                    </h2>

                    {/* Likes Count */}
                    <div
                      className={`flex items-center gap-1 mt-1 text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <FaHeart className="text-red-500" />
                      <span>
                        {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
                      </span>
                    </div>
                  </div>
                </NavLink>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
