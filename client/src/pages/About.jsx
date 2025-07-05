import React from "react";
import { useSelector } from "react-redux";

export default function About() {
  const { theme } = useSelector((state) => state.theme);
  
  return (
    <div className={`w-full ${theme === "dark" ? "bg-background-dark" : "bg-[#F0F2F5]"}`}>
      <div className="max-w-[1000px] mx-auto flex flex-col gap-10 min-h-screen pt-24 w-full px-4">
        <h1 className={`text-2xl font-bold text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          About
        </h1>
        <div className={`rounded-lg shadow-md p-8 ${theme === "dark" ? "bg-cardBg-dark border-gray-700" : "bg-white border-gray-200"} border`}>
          <p className={`text-base md:text-lg max-w-[800px] w-full mx-auto text-center leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Welcome to Anonymous! I'm Mradul, the creator of this platform.
            Anonymous allows GLA University students to post and share content
            anonymously while ensuring a safe and respectful environment. Access
            is granted exclusively through your college email ID. To maintain a
            positive space, we've implemented content moderation to prevent
            inappropriate or harmful content from being posted. Your feedback is
            important to us! Feel free to use the feedback form to share your
            thoughts and suggestions. Enjoy expressing yourself freely while
            keeping the community safe!
          </p>
        </div>
      </div>
    </div>
  );
}
