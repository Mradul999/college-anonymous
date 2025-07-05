import React from "react";
import { useSelector } from "react-redux";

export default function Suggestion() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={`w-full rounded-lg shadow-md p-4 mb-4 ${theme === "dark" ? "bg-cardBg-dark" : "bg-white"}`}>
      <h2 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Suggestions</h2>
      <ul className="space-y-3">
        <li className="flex items-start">
          <div className="flex-shrink-0 text-[#1877F2] mr-2">&bull;</div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Share your thoughts anonymously with your college community
          </p>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 text-[#1877F2] mr-2">&bull;</div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Discuss academic challenges, campus life, or career advice
          </p>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 text-[#1877F2] mr-2">&bull;</div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Connect with peers who share similar experiences
          </p>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 text-[#1877F2] mr-2">&bull;</div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Remember to be respectful and follow community guidelines
          </p>
        </li>
      </ul>
      <div className={`mt-4 p-3 rounded-md ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
        <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          Need help? Visit our{" "}
          <a
            href="/about"
            className="text-[#1877F2] hover:underline font-medium"
          >
            About
          </a>{" "}
          page or{" "}
          <a
            href="/contact"
            className="text-[#1877F2] hover:underline font-medium"
          >
            Contact
          </a>{" "}
          us.
        </p>
      </div>
    </div>
  );
}