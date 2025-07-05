import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const changeHandler = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required");
      return;
    }
    const email = sessionStorage.getItem("email");
    const name = sessionStorage.getItem("name");
    const password = sessionStorage.getItem("password");

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verifyotp`,
        { email, otp }
      );
      if (response.status === 200) {
        setLoading(false);
        const signupResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/signup`,
          {
            email,
            name,
            password,
          }
        );
        if (signupResponse.status === 200) {
          navigate("/sign-in");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404 || error.response.status === 401) {
          setError("Invalid OTP");
        } else {
          setError("Internal server error");
        }
      }
    }
  };

  return (
    <div className={`w-screen min-h-screen flex flex-col items-center justify-center px-4 ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
      <div className={`max-w-[450px] rounded-lg shadow-md flex flex-col gap-6 py-8 px-6 w-full ${theme === "dark" ? "bg-cardBg-dark border-gray-700" : "bg-white border-gray-200"} border`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1877F2] mb-2">Verify OTP</h1>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Enter the OTP sent to your email</p>
        </div>
        
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            onChange={changeHandler}
            type="text"
            className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
            placeholder="Enter OTP"
          />
          <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>OTP will expire in {timeLeft} seconds</span>

          {error && <span className="text-red-500 text-sm font-medium">*{error}</span>}
          
          <button className="bg-[#1877F2] hover:bg-[#166FE5] rounded-md text-white py-3 font-medium transition-all transform hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50">
            {loading ? (
              <ThreeDots
                height="24"
                width="60"
                color="white"
                ariaLabel="loading"
              />
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
