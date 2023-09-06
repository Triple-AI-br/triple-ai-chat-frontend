import { selectIsAuthenticated } from "../../redux/authenticationSlice";
import { useAppSelector } from "../../redux/hooks";
import { routesManager } from "../../routes/routesManager";
import { Navigate, useLocation } from "react-router-dom";

interface IPrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
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
