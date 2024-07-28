import React from "react";
import { PopularPosts } from "../components/PopularPosts";
import { AllPosts } from "../components/AllPosts";

export default function Home() {
  return (
    <div className="w-screen   min-h-screen">
      <div className="w-full  flex  justify-center px-2 pt-20">
        <PopularPosts />
        <AllPosts />
      </div>
    </div>
  );
}
