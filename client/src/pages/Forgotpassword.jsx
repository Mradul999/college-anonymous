import react from "react";
import { NavLink } from "react-router-dom";

export const Forgotpassword = () => {
    
  return (
    <div className="w-full min-h-screen flex justify-center dark:text-gray-200 text-textColor ">
      <div className="flex flex-col gap-4 my-28 dark:bg-gray-700 bg-indigo-300 bg-opacity-30   dark:bg-opacity-30 rounded-md  max-w-[350px] py-10 px-8 w-full  ">
        <span className="text-2xl font-semibold mb-8 bg-indigo-800  dark:text-gray-300 size-10 flex justify-center items-center  self-center text-gray-200 rounded-full px-[0.5rem]">
          Λ
        </span>
        <h1 className="text-center text-sm  font-semibold">Forgot your Password?</h1>
        <form className="flex flex-col gap-5">
          <input
            className="rounded-md text-sm p-2 bg-transparent border-2 border-gray-600 focus:outline-none focus:border-indigo-700 dark:placeholder:text-gray-200 placeholder:text-textColor placeholder:text-xs placeholder: text-start border-opacity-60"
            type="email"
            placeholder="Enter Your account email"
          />
          <button className="text-sm font-medium bg-indigo-700 py-2 rounded-md text-gray-200 ">Send Email</button>
        </form>
        <span className="text-center font-medium mt-8 text-xs">
          Remember Your password?{" "}
          <NavLink to="/sign-in"> <span className="font-semibold underline ">Sign in</span>{" "}</NavLink>
         
        </span>
      </div>
    </div>
  );
};
