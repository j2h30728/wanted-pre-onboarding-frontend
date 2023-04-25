import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

export const withAuth = (Component: React.ComponentType) => () => {
  const { isLogined } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogined) navigate("/signin");
  }, [isLogined, navigate]);

  return <Component />;
};
