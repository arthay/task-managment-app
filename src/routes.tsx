import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import App from "./App";
import ProjectPage from "@/pages/Project";
import PrivateRoute from "@/components/common/PrivateRoute";
import LoginPage from "@/pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/projects/:projectId",
        element: (
          <PrivateRoute>
            <ProjectPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
