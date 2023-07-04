import { Route, Routes } from "react-router-dom";
import { routesManager } from "./routesManager";
import { ChatPage, LandingPage, LoginPage } from "../pages";
import { PrivateRoute, PublicRoute } from "../components/shared";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path={routesManager.getChatRoute()}
                element={
                    <PrivateRoute>
                        <ChatPage />
                    </PrivateRoute>
                }
            />
            <Route
                path={routesManager.getLoginRoute()}
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />

            <Route
                path={routesManager.getLandingRoute()}
                element={<LandingPage />}
            />
        </Routes>
    );
};

export { AppRoutes };
