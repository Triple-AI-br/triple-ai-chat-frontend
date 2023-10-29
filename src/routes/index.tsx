import { Route, Routes } from "react-router-dom";
import { routesManager } from "./routesManager";
import {
  ChatPage,
  ProjectsPage,
  LandingPage,
  LoginPage,
  SourcesPage,
  ConfirmEmailPage,
  AcceptInvitationOrResetPasswordPage,
  AdminPage,
  PromptsPage,
  SuperuserPage,
  SearchPage,
} from "../pages";
import { PrivateRoute, PublicRoute } from "../components/shared";
import { ContractPage } from "../pages/Contracts";
import { ContractAnalysis } from "../pages/ContractAnalysis";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routesManager.getLandingRoute()} element={<LandingPage />} />

      <Route path={routesManager.getConfirmEmailRoute()} element={<ConfirmEmailPage />} />

      <Route
        path={routesManager.getAcceptInvitationRoute()}
        element={<AcceptInvitationOrResetPasswordPage />}
      />

      <Route
        path={routesManager.getResetPasswordRoute()}
        element={<AcceptInvitationOrResetPasswordPage />}
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
              <Route path={routesManager.getChatRoute()} element={<ChatPage />} />
              <Route path={routesManager.getProjectsRoute()} element={<ProjectsPage />} />
              <Route path={routesManager.getSourcesRoute()} element={<SourcesPage />} />
              <Route path={routesManager.getAdminRoute()} element={<AdminPage />} />
              <Route path={routesManager.getPromptsRoute()} element={<PromptsPage />} />
              <Route path={routesManager.getSuperuserRoute()} element={<SuperuserPage />} />
              <Route path={routesManager.getSearchRoute()} element={<SearchPage />} />
              <Route path={routesManager.getContractsRoute()} element={<ContractPage />} />
              <Route
                path={routesManager.getContractAnalysisRoute()}
                element={<ContractAnalysis />}
              />
            </Routes>
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export { AppRoutes };
