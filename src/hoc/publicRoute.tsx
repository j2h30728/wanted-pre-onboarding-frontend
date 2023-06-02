import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import useAuth from "../hooks/auth/useAuth";

export const publicRoute = (Component: React.ComponentType) => () => {
  const { isLogined } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogined) navigate("/todo");
  }, [isLogined, navigate]);

  return <Component />;
};
