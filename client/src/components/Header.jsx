import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function Header() {
  

  return (
    <div
      className="w-screen flex justify-between items-center py-4 fixed z-10 px-3 bg shadow-lg  text-white
  "
    >
      <h1 className="text-xl font-semibold ">Anonymous</h1>
      <div className="flex  items-center gap-3">
        <NavLink to="/sign-up">
          {" "}
          <button className="px-2 py-2 bg-indigo-600 text-sm rounded-md font-medium hover:bg-indigo-700 transition-all hover:scale-95 ">
            Sign up
          </button>
        </NavLink>
        <NavLink to="/sign-in">
          <button className="px-2 py-2 bg-indigo-600 text-sm rounded-md font-medium hover:bg-indigo-700 transition-all hover:scale-95">
            Login
          </button>
        </NavLink>
      </div>
    </div>
  );
}
