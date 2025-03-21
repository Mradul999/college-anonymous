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

import ResetPassword from "./pages/ResetPassword";
import PublicChat from "./components/PublicChat";
import ForgotPassword from "./pages/Forgotpassword";

export default function App() {
  return (
    <div className="dark:bg-background-dark overflow-hidden bg-background">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/posts/userposts"
            element={
              <ProtectedRoute>
                <UserPost />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <PublicChat />
              </ProtectedRoute>
            }
          /> */}
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}
