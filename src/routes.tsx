import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import App from "./App";
import ProjectPage from "@/pages/Project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects/:projectId", element: <ProjectPage /> },
    ],
  },
  // {
  //   path: "*",
  //   element: <App />,
  //   children: [
  //     { path: "*", element: <ErrorPage />, errorElement: <ErrorPage /> },
  //   ],
  //   errorElement: <ErrorPage />,
  // },
]);

export default router;
