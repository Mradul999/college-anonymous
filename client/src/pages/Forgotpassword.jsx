import axios from "axios";
import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgotpassword`,
        { email }
      );
      if (response.status === 200) {
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404) {
          setError("Sorry, Your account was not found");
        } else {
          setError("Something went wrong.");
        }
      }
    }
  };

  return (
    <div className={`w-screen min-h-screen flex flex-col items-center justify-center px-4 ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
      <div className={`max-w-[450px] rounded-lg shadow-md flex flex-col gap-6 py-8 px-6 w-full ${theme === "dark" ? "bg-cardBg-dark border-gray-700" : "bg-white border-gray-200"} border`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1877F2] mb-2">
            {success ? "Email Sent" : "Forgot your Password?"}
          </h1>
          {success ? (
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              An email has been sent to your email address with instructions on
              how to reset your password.
            </p>
          ) : (
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Enter your email to receive a password reset link
            </p>
          )}
        </div>
        
        {!success ? (
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
              type="email"
              placeholder="Enter Your account email"
            />
            {error && <p className="text-red-500 text-sm font-medium">*{error}</p>}

            <button
              className={`bg-[#1877F2] hover:bg-[#166FE5] rounded-md text-white py-3 font-medium transition-all transform hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50 ${loading && "pointer-events-none"}`}
            >
              {loading ? (
                <ThreeDots
                  height="24"
                  width="60"
                  color="white"
                  ariaLabel="loading"
                />
              ) : (
                "Send Email"
              )}
            </button>
            
            <div className="text-center mt-2">
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Remember your password?{" "}
                <NavLink to="/sign-in" className="text-[#1877F2] font-semibold hover:underline transition-all">
                  Sign in
                </NavLink>
              </p>
            </div>
          </form>
        ) : (
          <NavLink to="/sign-in" className="mt-2">
            <button className="w-full bg-[#1877F2] hover:bg-[#166FE5] rounded-md text-white py-3 font-medium transition-all transform hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50">
              Back to Sign in
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
