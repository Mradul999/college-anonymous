import React from "react";

export default function CreatePost() {
  return (
    <div className="w-full min-h-screen pt-20 flex justify-center">
      <div className="min-w-[1000px]  items-center w-full flex flex-col">
        <h1 >Create Post</h1>
        <form >
            <input type="text" placeholder="" />
        </form>
      </div>
    </div>
  );
}
