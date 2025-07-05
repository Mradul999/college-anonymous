import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { signoutSuccess } from "../redux/user.slice";
import { setTheme } from "../redux/theme.slice";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoChatboxOutline } from "react-icons/io5";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [dropdown, setDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const modeClickhandler = () => {
    dispatch(setTheme(theme === "dark" ? "Light" : "dark"));
    setDropdown(false);
  };

  const profileClickHandler = () => {
    setDropdown(!dropdown);
  };

  const signoutHandler = async () => {
    setActiveTab("");
    try {
      const signoutResponse = await axios.post(`${API_URL}/api/auth/signout`);
      if (signoutResponse.status === 200) {
        dispatch(signoutSuccess());
        setDropdown(false);
        navigate("/sign-in");
      }
    } catch (error) {}
  };

  const myPostHandler = () => {
    navigate("/posts/userposts");
    setDropdown(false);
    setActiveTab("");
  };

  return (
    <div
      className={`w-screen ${
        location.pathname.startsWith("/reset-password") && "hidden"
      } flex justify-between items-center py-3 fixed z-10 sm:px-7 px-4 ${
        theme === "dark"
          ? "bg-cardBg-dark text-white"
          : "bg-white text-gray-900"
      } shadow-md`}
    >
      {/* Logo */}
      <NavLink to="/">
        <h1
          onClick={() => setActiveTab("")}
          className="text-xl font-bold flex items-center gap-1"
        >
          <span className="text-2xl bg-[#1877F2] text-white rounded-full px-[0.5rem]">
            Λ
          </span>
          nonymous
        </h1>
      </NavLink>

      {/* Navbar Right */}
      <div className="flex items-center relative gap-3 md:gap-4">
        {/* ChatRoom */}
        <NavLink to="/chat">
          <div className="flex gap-1 items-center cursor-pointer font-medium hover:text-[#1877F2] transition-colors">
            <IoChatboxOutline className="text-xl" />
            <span className="hidden sm:block">ChatRoom</span>
          </div>
        </NavLink>

        {/* Dark Mode */}
        <span
          onClick={modeClickhandler}
          className="flex items-center cursor-pointer hover:text-[#1877F2] transition-colors"
        >
          {theme === "dark" ? (
            <CiSun className="text-xl" />
          ) : (
            <FaMoon className="text-xl" />
          )}
        </span>

        {/* About (desktop only) */}
        <NavLink to="/about" className="hidden sm:flex">
          <button
            onClick={() => {
              setDropdown(false);
              setActiveTab("about");
            }}
            className={`font-medium transition-colors text-sm ${
              activeTab === "about"
                ? "text-[#1877F2]"
                : theme === "dark"
                ? "text-white"
                : "text-gray-700"
            } hover:text-[#1877F2]`}
          >
            About
          </button>
        </NavLink>

        {/* Feedback (desktop only) */}
        <NavLink to="/contact" className="hidden sm:flex">
          <button
            onClick={() => {
              setDropdown(false);
              setActiveTab("feedback");
            }}
            className={`font-medium transition-colors text-sm ${
              activeTab === "feedback"
                ? "text-[#1877F2]"
                : theme === "dark"
                ? "text-white"
                : "text-gray-700"
            } hover:text-[#1877F2]`}
          >
            Feedback
          </button>
        </NavLink>

        {/* Profile or Login */}
        {currentUser ? (
          <div
            onClick={profileClickHandler}
            className={`text-2xl bg-[#1877F2] text-white px-[0.5rem] rounded-full cursor-pointer ${
              dropdown && "rotate-180"
            } transition-all font-semibold`}
          >
            Λ
          </div>
        ) : (
          <NavLink to="/sign-in">
            <button
              onClick={() => setActiveTab("")}
              className="px-4 py-2 bg-[#1877F2] text-sm rounded-md font-medium hover:bg-[#166FE5] transition-all text-white focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50"
            >
              Login
            </button>
          </NavLink>
        )}

        {/* Dropdown */}
        <div
          className={`absolute top-12 right-0 flex ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } border rounded-lg p-3 gap-2 transition-all duration-200 origin-top shadow-lg ${
            dropdown ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
          } flex-col w-48`}
        >
          {/* Mobile-only About & Feedback */}
          

          {/* <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 sm:hidden"></div> */}

          <h1 className="text-sm font-medium">@{currentUser?.username}</h1>
          <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600"></div>

          <p
            onClick={myPostHandler}
            className="text-sm font-medium hover:text-[#1877F2] transition-colors cursor-pointer"
          >
            My Posts
          </p>

     <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 sm:hidden"></div>  
          <NavLink to="/about" className="block sm:hidden">
            <p
              onClick={() => {
                setDropdown(false);
                setActiveTab("about");
              }}
              className="text-sm font-medium hover:text-[#1877F2] transition-colors cursor-pointer"
            >
              About
            </p>
          </NavLink>
           <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 sm:hidden"></div>

          <NavLink to="/contact" className="block sm:hidden">
            <p
              onClick={() => {
                setDropdown(false);
                setActiveTab("feedback");
              }}
              className="text-sm font-medium hover:text-[#1877F2] transition-colors cursor-pointer"
            >
              Feedback
            </p>
          </NavLink>
           <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 sm:hidden"></div>

          <button
            onClick={signoutHandler}
            className="px-4 py-2 bg-[#1877F2] text-sm rounded-md font-medium text-white hover:bg-[#166FE5] transition-all focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
