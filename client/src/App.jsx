import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import VerifyOTP from "./pages/VerifyOTP";
import Home from "./pages/Home";
export default function App() {
  return (
    <div className=" bg">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/sign-up" element={<Signup />}></Route>
          <Route path="/sign-in" element={<Signin />}></Route>
          <Route path="/verify-otp" element={<VerifyOTP />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
