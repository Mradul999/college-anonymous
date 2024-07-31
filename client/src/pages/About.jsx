import React from "react";

export default function About() {
  return (
    <div className="w-full ">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-10   min-h-screen pt-24 w-full">
        <h1 className="text-gray-300 text-2xl font-medium  text-center">
          About{" "}
        </h1>
        <p className="text-gray-300 text-lg  max-w-[800px] w-full mx-auto text-center">
          Welcome to Silent Campus. I am Mradul and i  build this app.Post anything with anonymous identity.Only GLA Students can access this app using their college mail id.You can share your suggestions by submitting the feedback form.
        </p>
      </div>
    </div>
  );
}
