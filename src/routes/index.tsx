import { Route, Routes } from "react-router-dom";
import { routesManager } from "./routesManager";
import {
    ChatPage,
    ProjectsPage,
    LandingPage,
    LoginPage,
    SourcesPage,
    ConfirmEmailPage,
    AcceptInvitationPage,
    AdminPage,
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
                                path={routesManager.getProjectsRoute()}
                                element={<ProjectsPage />}
                            />
                            <Route
                                path={routesManager.getSourcesRoute()}
                                element={<SourcesPage />}
                            />

                            <Route
                                path={routesManager.getAdminRoute()}
                                element={<AdminPage />}
                            />
                        </Routes>
                    </PrivateRoute>
                }
            ></Route>
        </Routes>
    );
};

export { AppRoutes };
