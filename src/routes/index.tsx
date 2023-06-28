import { Route, Routes } from "react-router-dom";
import { routesManager } from "./routesManager";
import { ChatPage, LandingPage } from "../pages";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={routesManager.getChatRoute()} element={<ChatPage />} />
            <Route
                path={routesManager.getLandingRoute()}
                element={<LandingPage />}
            />
        </Routes>
    );
};

export { AppRoutes };
