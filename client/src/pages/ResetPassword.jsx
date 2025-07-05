import axios from "axios";
import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resetpassword`,
        {
          token,
          password,
        }
      );
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
    <div className={`w-screen min-h-screen flex flex-col items-center justify-center px-4 ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
      <div className={`max-w-[450px] rounded-lg shadow-md flex flex-col gap-6 py-8 px-6 w-full ${theme === "dark" ? "bg-cardBg-dark border-gray-700" : "bg-white border-gray-200"} border`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1877F2] mb-2">
            {success ? "Password Reset Successfully" : "Reset Password"}
          </h1>
          {success && (
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
          )}
        </div>
        
        {!success ? (
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div className="relative">
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter new password"
              />
              <div className={`absolute right-3 top-3.5 cursor-pointer ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {showPassword ? (
                  <IoEyeOutline onClick={toggleShowPassword} className="text-lg" />
                ) : (
                  <FaRegEyeSlash onClick={toggleShowPassword} className="text-lg" />
                )}
              </div>
            </div>
            
            <div className="relative">
              <input
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
                type={`${showPasswordConfirm ? "text" : "password"}`}
                placeholder="Confirm password"
              />
              <div className={`absolute right-3 top-3.5 cursor-pointer ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {showPasswordConfirm ? (
                  <IoEyeOutline onClick={toggleShowPasswordConfirm} className="text-lg" />
                ) : (
                  <FaRegEyeSlash onClick={toggleShowPasswordConfirm} className="text-lg" />
                )}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium">*{error}</p>}
            
            <button className={`bg-[#1877F2] hover:bg-[#166FE5] rounded-md text-white py-3 font-medium transition-all transform hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50 ${loading && "pointer-events-none"}`}>
              {loading ? (
                <ThreeDots
                  height="24"
                  width="60"
                  color="white"
                  ariaLabel="loading"
                />
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        ) : (
          <NavLink to="/sign-in">
            <button className="w-full bg-[#1877F2] hover:bg-[#166FE5] rounded-md text-white py-3 font-medium transition-all transform hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50">
              Go to Sign in
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
