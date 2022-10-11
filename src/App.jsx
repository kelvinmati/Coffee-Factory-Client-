import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
("react-router-dom");
import "./App.css";
import AdminLogin from "./components/AdminLogin";

import Admin from "./components/dashboard/Admin";
import Farmer from "./components/dashboard/Farmer";
import Staff from "./components/dashboard/Farmer";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Auth from "./middleware/Auth";

function App() {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route element={<Auth />}>
            <Route path="/dashboard/farmer" element={<Farmer />} />
            <Route path="/dashboard/admin/*" element={<Admin />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
