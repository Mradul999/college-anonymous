import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/signup"></Route>
      </Routes>

      
      </BrowserRouter>
    </div>
  );
}
