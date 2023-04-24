import { Navigate, RoutesProps } from "react-router-dom";
import { getToken } from "../util/useToken";
import React, { ComponentType } from "react";
interface PrivateRouteProps extends RoutesProps {
  route: ComponentType;
}

export default function PrivateRoute({ route: Route }: PrivateRouteProps) {
  const isLoggedIn = getToken();
  return (
    <React.Fragment>
      {!isLoggedIn ? <Navigate to="/signin" /> : <Route />}
    </React.Fragment>
  );
}
