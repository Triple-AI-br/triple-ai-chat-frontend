import { Navigate } from "react-router-dom";
import { useSupabaseSession } from "../../services";
import { Spinner } from "../loaders";

interface IPublicRouteProps {
    children: React.ReactNode;
}

export default function PublicRoute({ children }: IPublicRouteProps) {
    const session = useSupabaseSession();

    if (session === undefined) {
        return <Spinner />;
    } else if (session === null) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
}
export { PublicRoute };
