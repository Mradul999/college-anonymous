import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import SinglePost from "./SinglePost";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/post/getallposts");
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
      navigate("/sign-in");
    }
    navigate("/create-post");
  };

  return (
    <div className=" flex flex-col items-center gap-10 w-full h-screen   overflow-y-scroll scrollbar-hide     p-2  ">
      <button
        onClick={clickHandler}
        className=" card-bg text-start text-gray-200 font-semibold text-lg rounded-md px-2 py-5 w-full flex  items-center gap-1"
      >
        <MdAddCircleOutline className="text-2xl" />
        Create post...
      </button>
      <div className="flex flex-col w-full     gap-4">
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
          <div className="flex flex-col w-full     gap-3" >
            {allPosts?.map((post) => (
              <SinglePost post={post} key={post._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
