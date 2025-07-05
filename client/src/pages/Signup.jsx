import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Signup() {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData?.name || !formData?.password || !formData?.email) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/generateotp`,
        {
          email: formData.email,
        }
      );

      if (response.status === 200) {
        setLoading(false);
        sessionStorage.setItem("email", formData.email);
        sessionStorage.setItem("name", formData.name);
        sessionStorage.setItem("password", formData.password);
        navigate("/verify-otp");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 400) {
          setError("Enter a valid Email");
        } else if (error.response.status == 409) {
          setError("User already registered");
        } else {
          setError("Internal server error");
        }
      }
    }
  };
  return (
    <div className={`w-screen min-h-screen flex flex-col items-center justify-center px-4 ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
      <div className={`max-w-[450px] rounded-lg shadow-md flex flex-col gap-8 py-8 px-6 w-full ${theme === "dark" ? "bg-cardBg-dark border-gray-700" : "bg-white border-gray-200"} border`}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1877F2] mb-2">Anonymous</h1>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Create a new account</p>
        </div>
        
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            onChange={changeHandler}
            id="name"
            type="text"
            className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
            placeholder="Enter Full Name"
          />
          <input
            onChange={changeHandler}
            id="email"
            type="text"
            className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
            placeholder="Enter GLA mail ID"
          />
          <div className="relative">
            <input
              onChange={changeHandler}
              id="password"
              type={`${showPassword ? "text" : "password"}`}
              className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
              placeholder="Enter Password"
            />
            <div className={`absolute right-3 top-3.5 cursor-pointer ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {showPassword ? (
                <IoEyeOutline onClick={toggleShowPassword} className="text-lg" />
              ) : (
                <FaRegEyeSlash onClick={toggleShowPassword} className="text-lg" />
              )}
            </div>
          </div>

          {error && <span className="text-red-500 text-sm font-medium">*{error}</span>}
          
          <button className="bg-[#1877F2] hover:bg-[#166FE5] flex justify-center rounded-md text-white py-3 font-medium transition-all transform hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50">
            {loading ? (
              <ThreeDots
                height="24"
                width="60"
                color="white"
                ariaLabel="loading"
              />
            ) : (
              "Sign up"
            )}
          </button>
          
          <div className="text-center mt-2">
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Already have an account?{" "}
              <NavLink to="/sign-in" className="text-[#1877F2] font-semibold hover:underline transition-all">
                Sign in
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
