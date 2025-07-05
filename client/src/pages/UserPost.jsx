import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SinglePost from "../components/SinglePost";
import { ThreeDots } from "react-loader-spinner";

export default function UserPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/getallposts`);
        if (response.status === 200) {
          console.log("user post fetchced")
           const filteredPosts = response.data.posts.filter(
            (post) => post.userId === currentUser._id
          );
          const sortedPosts = filteredPosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sortedPosts);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentUser._id]);

  const onDelete = async (postId) => {
    const updatedPosts = posts.filter((post) => post._id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div className={`w-full min-h-screen pt-20 pb-20 flex justify-center ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
      <div className="max-w-[800px] px-4 mt-2 mb-10 items-center w-full flex gap-6 flex-col">
        <div className={`w-full ${theme === "dark" ? "bg-cardBg-dark" : "bg-white"} rounded-lg shadow-md p-6`}>
          <h1 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            My Posts
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
            <div className="w-full space-y-4">
              {posts.length === 0 ? (
                <div className={`text-center py-8 ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} font-medium`}>
                    You haven't created any posts yet
                  </p>
                  <button 
                    onClick={() => window.location.href = '/create-post'}
                    className="mt-4 px-4 py-2 bg-[#1877F2] text-white rounded-md font-medium hover:bg-[#166FE5] transition-all focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50"
                  >
                    Create Your First Post
                  </button>
                </div>
              ) : (
                posts.map((post) => (
                  <SinglePost post={post} onDelete={onDelete} key={post._id} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
