import React from "react";

export default function Suggestion() {
  return (
    <div className="w-full rounded-md bg-gray-200  dark:bg-cardBg-dark h-[55%] border border-gray-300 dark:border-gray-700 p-2">
      <h1 className="dark:text-gray-200 text-textColor font-medium">
        {" "}
        Here are some suggestions for your new Post
      </h1>
      <ul className="dark:text-gray-200 text-textColor text-sm space-y-2 font-medium mt-2">
        <li>Review of any online course </li>
        <li>Some incident happened today in college</li>
        <li>About any club</li>
        
      </ul>
    </div>
  );
}
