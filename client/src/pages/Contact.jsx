import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

export default function Contact() {
  const { theme } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/feedback/createfeedback`,
        formData
      );
      if (response.status === 200) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        setSuccessMessage("Message sent successfully");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full min-h-screen ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
      <div className="max-w-[500px] mx-auto px-4 flex flex-col gap-6 min-h-screen pt-24 w-full">
        <h1 className={`text-2xl font-bold text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Contact me
        </h1>
        
        <div className={`rounded-lg shadow-md p-6 ${theme === "dark" ? "bg-cardBg-dark border-gray-700" : "bg-white border-gray-200"} border`}>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <input
              required
              value={formData.name}
              onChange={changeHandler}
              id="name"
              type="text"
              className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
              placeholder="Enter name"
            />
            <input
              required
              value={formData.email}
              onChange={changeHandler}
              id="email"
              type="email"
              className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
              placeholder="Enter Mail"
            />
            <textarea
              required
              value={formData.message}
              onChange={changeHandler}
              rows={6}
              id="message"
              type="text"
              className={`w-full rounded-md py-3 px-4 border focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-700 border-gray-300"}`}
              placeholder="Enter your message"
            />
            {successMessage && (
              <p className="bg-green-600 rounded-md py-3 text-white text-center font-medium">
                {successMessage}
              </p>
            )}

            <button className={`bg-[#1877F2] hover:bg-[#166FE5] rounded-md text-white py-3 font-medium transition-all transform hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-opacity-50 ${loading && "pointer-events-none"}`}>
              {loading ? (
                <ThreeDots
                  height="24"
                  width="60"
                  color="white"
                  ariaLabel="loading"
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
