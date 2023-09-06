import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { routesManager } from "../../routes/routesManager";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LoadingPage } from "../../pages";
import {
  actionUpdateAuthenticationStatus,
  selectIsAuthenticated,
} from "../../redux/authenticationSlice";

interface IPrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated === undefined) {
      dispatch(actionUpdateAuthenticationStatus());
    }
  }, []);

  if (isAuthenticated === undefined) {
    return <LoadingPage />;
  } else if (isAuthenticated) {
    return children;
  } else {
    const url = location.pathname + location.search + location.hash;
    return (
      <Navigate
        to={routesManager.getLoginRoute()}
        state={{ next: url }}
      ></Navigate>
    );
  }
};

export { PrivateRoute };
