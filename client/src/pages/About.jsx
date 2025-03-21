import React from "react";

export default function About() {
  return (
    <div className="w-full ">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-10   min-h-screen pt-24 w-full">
        <h1 className="dark:text-gray-300 text-textColor text-2xl font-medium  text-center">
          About{" "}
        </h1>
        <p className="dark:text-gray-300 text-textColor text-base md:text-lg  max-w-[800px] w-full px-2 mx-auto text-center ">
          Welcome to Anonymous! I’m Mradul, the creator of this platform.
          Anonymous allows GLA University students to post and share content
          anonymously while ensuring a safe and respectful environment. Access
          is granted exclusively through your college email ID. To maintain a
          positive space, we’ve implemented content moderation to prevent
          inappropriate or harmful content from being posted. Your feedback is
          important to us! Feel free to use the feedback form to share your
          thoughts and suggestions. Enjoy expressing yourself freely while
          keeping the community safe!
        </p>
      </div>
    </div>
  );
}
