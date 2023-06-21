import { Route, Routes } from "react-router-dom";
import { routesManager } from "./routesManager";
import { ChatPage } from "../pages";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={routesManager.getChatRoute()} element={<ChatPage />} />
        </Routes>
    );
};

export { AppRoutes };
