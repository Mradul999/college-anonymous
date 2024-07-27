import React from "react";
import { NavLink } from "react-router-dom";

export default function Signup() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg  px-2  ">
      <div
        className={`max-w-[500px] rounded-md flex flex-col gap-10 py-6 px-2 sm:px-6 w-full shadow-md shadow-indigo-600  bg-indigo-900`}
      >
        <h1 className="text-center text-white text-2xl sm:text-3xl font-semibold">
          Sign up
        </h1>
        <form className="flex flex-col  gap-4  ">
          <input
            type="text"
            className="rounded-md bg-black bg-opacity-10 py-2 px-2 text-white  focus:outline-none border-[2px] focus:border-green-600 border-indigo-600"
            placeholder="Enter Full Name"
          />
          <input
            type="text"
            className="rounded-md bg-black bg-opacity-10 py-2 px-2 text-white  focus:outline-none border-[2px] focus:border-green-600 border-indigo-600"
            placeholder="Enter Email"
          />
          <input
            type="text"
            className="rounded-md bg-black bg-opacity-10 py-2 px-2 text-white  focus:outline-none border-[2px] focus:border-green-600 border-indigo-600"
            placeholder="Enter Password"
          />
          <button className=" bg-indigo-600 rounded-md text-gray-200 py-2 hover:scale-95 transition-all hover:bg-indigo-700    font-medium">
            Sign up
          </button>
          <p className="text-gray-200">
            Already have an account?{" "}
            <NavLink to="/sign-in">
              {" "}
              <span className=" font-semibold cursor-pointer">Sign in</span>
            </NavLink>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
