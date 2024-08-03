import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  console.log(success);
  const { token } = useParams();
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords not matching");
      return;
    }
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resetpassword`, {
        token,
        password,
      });
      if (response.status === 200) {
        setLoading(false);
        setSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 401) {
          setError("You can not set old password as your new Password!");
          return;
        } else if (error.response.status === 400) {
          setError("Reset password link expired please generate a new Link");
          return;
        } else {
          setError("Something went wrong");
          return;
        }
      }
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center   ">
      <div className="flex mx-2 flex-col gap-8  dark:bg-gray-700 bg-indigo-300 bg-opacity-30   dark:bg-opacity-30 rounded-md  max-w-[400px] py-10 px-8 w-full">
        <span className="text-2xl font-semibold  bg-indigo-800  dark:text-gray-300 size-10 flex justify-center items-center  self-center text-gray-200 rounded-full px-[0.5rem]">
          Λ
        </span>
        {success && <p className="dark:text-gray-200 text-textColor text-center text-xl">Password reset successfully</p>}
        <h1
          className={` text-2xl text-center dark:text-gray-200 text-textColor font-semibold ${
            success && "hidden"
          }`}
        >
          {" "}
          Reset Password
        </h1>
        <form
          onSubmit={submitHandler}
          className={`flex flex-col gap-4 dark:text-gray-200 text-textColor ${
            success && "hidden"
          }`}
        >
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md text-sm p-3 bg-transparent border-2 border-gray-600 focus:outline-none focus:border-indigo-700 dark:placeholder:text-gray-200 placeholder:text-textColor placeholder:text-sm placeholder: text-start border-opacity-60"
            type="password"
            placeholder="Enter new password"
          />
          <input
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-md text-sm p-3 bg-transparent border-2 border-gray-600 focus:outline-none focus:border-indigo-700 dark:placeholder:text-gray-200 placeholder:text-textColor placeholder:text-sm placeholder: text-start border-opacity-60"
            type="password"
            placeholder="Confirm password"
          />
          {error && (
            <p className="text-red-500 text-sm tracking-normal">{error}</p>
          )}
          <button
            className={`text-sm ${loading && "pointer-events-none"} ${
              success && "hidden"
            } hover:scale-95 transition-all font-medium bg-indigo-700 py-2 rounded-md text-gray-200  `}
          >
            {loading ? (
              <div className="flex justify-center items-center ">
                <span class="loader-small"></span>
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
