import { AuthSession } from "../../utils/AuthSession";
import { Navigate } from "react-router-dom";
import { routePaths } from "../../constants/routePaths";
import React from "react";

interface Props {
  component: React.ComponentType;
}
export const PrivateRoute = (props: Props) => {
  return AuthSession.isTokenSet() ? (
    <props.component />
  ) : (
    <Navigate replace to={routePaths.authorization} />
  );
};
