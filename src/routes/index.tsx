import { Route, Routes } from "react-router-dom";
import { routesManager } from "./routesManager";
import { ChatPage, LandingPage } from "../pages";
import { PrivateRoute } from "../components/shared";

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
                path={routesManager.getLandingRoute()}
                element={<LandingPage />}
            />
        </Routes>
    );
};

export { AppRoutes };
