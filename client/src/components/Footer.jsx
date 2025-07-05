import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const location = useLocation();
  const { theme } = useSelector((state) => state.theme);
  
  return (
    <div
      className={` h-[5rem] ${location.pathname.startsWith("/reset-password") && "hidden"} 
      ${theme === "dark" ? "bg-[#18191A] border-gray-800" : "bg-[#1877F2]"} 
      border-t flex items-center flex-col gap-2 justify-center px-4`}
    >
      <h1 className="text-white text-center text-sm font-medium">
        Created by Mradul
      </h1>
      <div className="flex gap-4 text-lg text-white">
        <a 
          target="_blank" 
          href="https://github.com/Mradul999"
          className="hover:opacity-80 transition-all"
        >
          <FaGithub className="cursor-pointer" />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/mradul-verma-b74048254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          className="hover:opacity-80 transition-all"
        >
          <FaLinkedin className="cursor-pointer" />
        </a>
        <a 
          target="_blank" 
          href="https://www.instagram.com/catsaredramatic99/"
          className="hover:opacity-80 transition-all"
        >
          <FaInstagram className="cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
