import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { routesManager } from "../../routes/routesManager";
import { useEffect } from "react";
import { LoadingPage } from "../../pages";
import {
  actionUpdateAuthenticationStatus,
  selectIsAuthenticated,
} from "../../redux/authenticationSlice";

interface IPublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: IPublicRouteProps) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated === undefined) {
      dispatch(actionUpdateAuthenticationStatus());
    }
  }, []);

  if (isAuthenticated === undefined) {
    return <LoadingPage />;
  } else if (!isAuthenticated) {
    return children;
  } else {
    return <Navigate to={routesManager.getProjectsRoute()} />;
  }
};
export { PublicRoute };
