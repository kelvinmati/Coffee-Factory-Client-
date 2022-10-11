import React from "react";

import { Outlet, Navigate } from "react-router-dom";
const Auth = () => {
  let token = localStorage.getItem("userToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
