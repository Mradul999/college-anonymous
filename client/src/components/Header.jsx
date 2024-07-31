import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { signoutSuccess } from "../redux/user.slice";
import { useDispatch } from "react-redux";
import axios from "axios";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const profileClickHandler = () => {
    setDropdown(!dropdown);
  };

  const signoutHandler = async () => {
    try {
      const signoutResponse = await axios.post("/api/auth/signout");
      console.log(signoutResponse)
      if (signoutResponse.status === 200) {
        dispatch(signoutSuccess());
        setDropdown(false)
        navigate("/sign-in");
      }
    } catch (error) {
        console.log(error);
    }
  };
  const myPostHandler=()=>{
    navigate("/posts/userposts");
    setDropdown(false);
  }

  return (
    <div
      className="w-screen flex justify-between items-center py-4 fixed z-10 sm:px-7 px-2   bg shadow-sm shadow-indigo-700  text-white
  "
    >
      <NavLink to="/">
        <h1 className="text-xl font-semibold ">Anonymous</h1>
      </NavLink>

      <div className="flex  items-center relative gap-3">
        <NavLink to="/about"><button className="text-gray-300 font-medium text-sm">About</button></NavLink>
        <NavLink to="/contact"><button className="text-gray-300 font-medium text-sm">Feedback</button></NavLink>
        
        {currentUser ? (
          // <img
          //   onClick={profileClickHandler}
          //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
          //   className="rounded-full size-8 cursor-pointer"
          //   alt="profile"
          // ></img>
          <h2 onClick={profileClickHandler} className="text-sm cursor-pointer text-indigo-600 font-semibold">{currentUser.username}</h2>
        ) : (
          <NavLink to="/sign-in">
            <button className="px-2 py-2 bg-indigo-600 text-sm rounded-md font-medium hover:bg-indigo-700 transition-all hover:scale-95">
              Login
            </button>
          </NavLink>
        )}

        <div
          className={`absolute top-12 right-0 flex bg-indigo-900 rounded-md p-2   gap-2 transition-all duration-100 origin-top   ${
            dropdown ? "scale-y-100" : "scale-y-0"
          }  flex-col`}
        >
          <h1 className="text-sm">@{currentUser?.username}</h1>
          <div className="h-[0.7px] w-[95%] bg-gray-300 rounded-full mx-auto"></div>
          
          <p onClick={myPostHandler} className="text-sm font-medium hover:scale-95 pl-1 transition-all cursor-pointer">My Posts</p>
          <div className="h-[0.7px] w-[95%] bg-gray-300 rounded-full mx-auto"></div>
          <button
            onClick={signoutHandler}
            className="px-2 py-2 bg-indigo-600 text-sm rounded-md font-medium hover:bg-indigo-700 transition-all hover:scale-95"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
