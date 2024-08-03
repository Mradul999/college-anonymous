import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import VerifyOTP from "./pages/VerifyOTP";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import UserPost from "./pages/UserPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { Forgotpassword } from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
export default function App() {
  return (
    <div className=" dark:bg-background-dark overflow-hidden     bg-background">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/sign-up" element={<Signup />}></Route>
          <Route path="/sign-in" element={<Signin />}></Route>
          <Route path="/verify-otp" element={<VerifyOTP />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/post/:postSlug" element={<PostPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/posts/userposts"
            element={
              <ProtectedRoute>
                <UserPost />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/forgot-password" element={<Forgotpassword/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}
