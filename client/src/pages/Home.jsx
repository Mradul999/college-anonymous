import React from "react";
import { PopularPosts } from "../components/PopularPosts";
import { AllPosts } from "../components/AllPosts";
import Suggestion from "../components/Suggestion";

export default function Home() {
  return (
    <div className=" ">
      <div className="w-full  flex   px-2 pt-20">
        <PopularPosts />
        <AllPosts />
        <Suggestion/>
        
      </div>
    </div>
  );
}
