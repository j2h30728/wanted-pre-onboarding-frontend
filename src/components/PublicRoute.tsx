import { Navigate, RoutesProps } from "react-router-dom";
import React, { ComponentType } from "react";
import useAuth from "../hooks/auth/useAuth";
interface PublicRouteProps extends RoutesProps {
  route: ComponentType;
}
export default function PublicRoute({ route: Route }: PublicRouteProps) {
  const { isLogined } = useAuth();
  return (
    <React.Fragment>
      {isLogined ? <Navigate to="/todo" /> : <Route />}
    </React.Fragment>
  );
}
