import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
export default function Signup() {
  const [formData, setFormData] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <div className="w-screen min-h-screen flex flex-col items-center justify-center   px-2  ">
      <div
        className={`max-w-[500px] rounded-md flex flex-col gap-10 py-6 px-2 sm:px-6 w-full bg-opacity-20 dark:bg-opacity-30  bg-indigo-300 dark:bg-gray-700`}
      >
        <h1 className="text-center dark:text-gray-300 text-textColor text-2xl sm:text-3xl font-semibold">
          Sign up
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col  gap-4  ">
          <input
            onChange={changeHandler}
            id="name"
            type="text"
            className="rounded-md bg-gray-200 bg-opacity-55 dark:placeholder:text-gray-300 placeholder:text-gray-600 py-2 px-2 dark:text-gray-300 text-textColor focus:outline-none border focus:border-green-600 border-indigo-600"
            placeholder="Enter Full Name"
          />
          <input
            onChange={changeHandler}
            id="email"
            type="text"
            className="rounded-md bg-gray-200 dark:placeholder:text-gray-300 placeholder:text-gray-600 bg-opacity-55 py-2 px-2 dark:text-gray-300 text-textColor  focus:outline-none border focus:border-green-600 border-indigo-600"
            placeholder="Enter GLA mail ID"
          />
          <input
            onChange={changeHandler}
            id="password"
            type="password"
            className="rounded-md dark:placeholder:text-gray-300 placeholder:text-gray-600 bg-gray-200 bg-opacity-55 py-2 px-2 dark:text-gray-300 text-textColor  focus:outline-none border focus:border-green-600 border-indigo-600"
            placeholder="Enter Password"
          />
          {error && <span className=" text-red-600 text-sm">*{error}</span>}
          <button className=" bg-indigo-600 rounded-md  text-gray-200 py-2 hover:scale-95 transition-all hover:bg-indigo-700 flex justify-center    font-medium">
            {loading ? (
              <ThreeDots
                height="40"
                width="60"
                wrapperClass
                color="white"
                ariaLabel="loading"
              />
            ) : (
              "Sign up"
            )}
          </button>
          <p className="dark:text-gray-300 text-textColor">
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
