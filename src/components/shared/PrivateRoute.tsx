import { Spinner } from "../loaders";
import { supabaseClient, useSupabaseSession } from "../../services";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

interface IPrivateRouteProps {
    children: JSX.Element;
}

export default function PrivateRoute({ children }: IPrivateRouteProps) {
    const session = useSupabaseSession();
    const location = useLocation();

    if (session === undefined) {
        return (
            <div className="text-center mt-4">
                <Spinner />
            </div>
        );
    } else if (session === null) {
        const url = location.pathname + location.search + location.hash;
        // return <Navigate to="/login" state={{ next: url }}></Navigate>;
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                sx={{ backgroundColor: "#ddd" }}
            >
                <Box
                    padding={4}
                    mt={4}
                    borderRadius={3}
                    boxShadow="6px 6px 10px 0px rgba(0, 0, 0, 0.12)"
                    sx={{ backgroundColor: "#fff" }}
                    overflow="scroll"
                >
                    <Auth
                        redirectTo={url}
                        supabaseClient={supabaseClient}
                        appearance={{ theme: ThemeSupa }}
                        showLinks={false}
                        providers={[]}
                    />
                </Box>
            </Box>
        );
    } else {
        return children;
    }
}
export { PrivateRoute };
