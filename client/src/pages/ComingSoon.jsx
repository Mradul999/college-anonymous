import React from "react";
import { useSelector } from "react-redux";

const ComingSoon = () => {
  const { theme } = useSelector((state) => state.theme);
  
  return (
    <div className={`flex min-h-screen items-center justify-center ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
      <div className={`rounded-lg shadow-md p-12 text-center ${theme === "dark" ? "bg-cardBg-dark border-gray-700" : "bg-white border-gray-200"} border`}>
        <h1 className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Coming Soon</h1>
        <p className={`mt-4 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>We're working on something awesome!</p>
      </div>
    </div>
  );
};

export default ComingSoon;
