import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";

export default function ProtectedRoute() {
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
    return <Signin />;
  }
  return <Home />;
}
