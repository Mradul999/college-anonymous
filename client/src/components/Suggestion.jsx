import React from "react";

export default function Suggestion() {
  return (
    <div className="w-full rounded-md card-bg p-2">
      <h1 className="text-gray-100 font-medium">
        {" "}
        Here are some suggestions for your new Post
      </h1>
      <ul className="text-gray-300 text-sm space-y-2 font-medium mt-2">
        <li>Review of any online course </li>
        <li>Some incident happened today in college</li>
        <li>About club</li>
      </ul>
    </div>
  );
}
