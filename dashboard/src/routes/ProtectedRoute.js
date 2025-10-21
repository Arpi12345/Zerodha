import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useGeneralContext from "../components/useGeneralContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useGeneralContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
