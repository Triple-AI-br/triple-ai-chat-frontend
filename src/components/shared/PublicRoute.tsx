import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectIsAuthenticated } from "../../redux/authenticationSlice";
import { routesManager } from "../../routes/routesManager";

interface IPublicRouteProps {
    children: JSX.Element;
}

export default function PublicRoute({ children }: IPublicRouteProps) {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    if (!isAuthenticated) {
        return children;
    } else {
        return <Navigate to={routesManager.getProjectsRoute()} />;
    }
}
export { PublicRoute };
