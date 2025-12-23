import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, roles = [] }) => {
  const location = useLocation();

  // 1️⃣ Read auth data
  const authData = JSON.parse(localStorage.getItem("accessToken"));
  const token = authData?.access;

  // 2️⃣ Decode JWT safely
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (error) {
      return null;
    }
  };

  // ❌ Not logged in
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  const decoded = decodeJWT(token);
  console.log(decoded)

  // ❌ Invalid token
  if (!decoded) {
    return <Navigate to="/login" replace />;
  }

  const userRole = decoded.role;

  // ❌ Role not allowed
  if (!roles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }


  // ✅ Allowed
  return children;
};

export default PrivateRoute;
