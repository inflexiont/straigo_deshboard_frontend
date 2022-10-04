import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import CreateProject from "./pages/projects/create/CreateProject";
import Projects from "./pages/projects/Projects";
import UpdateProject from "./pages/projects/update/UpdateProject";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
const Routers = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/project/create"
            element={
              <PrivateRoute>
                <CreateProject />
              </PrivateRoute>
            }
          />
          <Route
            path="/project/:projectId"
            element={
              <PrivateRoute>
                <UpdateProject />
              </PrivateRoute>
            }
          />
          {/* <Route
          path="/teams"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routers;
