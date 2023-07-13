import { Route, Routes } from "react-router-dom";
import { routesManager } from "./routesManager";
import {
    ChatPage,
    ChatsPage,
    LandingPage,
    LoginPage,
    SourcesPage,
    ConfirmEmailPage,
    AcceptInvitationPage,
} from "../pages";
import { PrivateRoute, PublicRoute } from "../components/shared";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path={routesManager.getLandingRoute()}
                element={<LandingPage />}
            />

            <Route
                path={routesManager.getConfirmEmailRoute()}
                element={<ConfirmEmailPage />}
            />

            <Route
                path={routesManager.getAcceptInvitationRoute()}
                element={<AcceptInvitationPage />}
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
                path="*"
                element={
                    <PrivateRoute>
                        <Routes>
                            <Route
                                path={routesManager.getChatRoute()}
                                element={<ChatPage />}
                            />
                            <Route
                                path={routesManager.getChatsRoute()}
                                element={<ChatsPage />}
                            />
                            <Route
                                path={routesManager.getSourcesRoute()}
                                element={<SourcesPage />}
                            />
                        </Routes>
                    </PrivateRoute>
                }
            ></Route>
        </Routes>
    );
};

export { AppRoutes };
