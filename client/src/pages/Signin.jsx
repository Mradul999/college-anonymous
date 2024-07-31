import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { signinSuccess } from "../redux/user.slice";

import { useDispatch } from "react-redux";
export default function Signin() {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const dispatch=useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if ( !formData?.password || !formData?.email) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/auth/signin", {
        email: formData.email,
        password:formData.password
      });

      if (response.status === 200) {
        setLoading(false);
        
        dispatch(signinSuccess(response.data.user))

        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404) {
          setError("User not registered yet ");
        } else if (error.response.status == 401) {
          setError("Invalid credentials");
        } else {
          setError("Internal server error");
        }
      }
    }
  };
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg  px-2  ">
      <div
        className={`max-w-[500px] rounded-md flex flex-col gap-10 py-6 px-2 sm:px-6 w-full bg-opacity-40 border-2 border-gray-600 bg-gray-700`}
      >
        <h1 className="text-center text-white text-2xl sm:text-3xl font-semibold">
          Sign in
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col  gap-4  ">
         
          <input
            onChange={changeHandler}
            id="email"
            type="text"
            className="rounded-md bg-black bg-opacity-10 py-2 px-2 text-white  focus:outline-none border-[2px] focus:border-green-600 border-indigo-600"
            placeholder="Enter GLA mail ID"
          />
          <input
            onChange={changeHandler}
            id="password"
            type="password"
            className="rounded-md bg-black bg-opacity-10 py-2 px-2 text-white  focus:outline-none border-[2px] focus:border-green-600 border-indigo-600"
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
              "Sign in"
            )}
          </button>
          <p className="text-gray-200">
            Don't have a account?{" "}
            <NavLink to="/sign-up">
              {" "}
              <span className=" font-semibold cursor-pointer">Sign up</span>
            </NavLink>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
