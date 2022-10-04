import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs/Blogs";
import UpdateBlog from "./pages/Blogs/update/UpdateBlog";
import Login from "./pages/Login/Login";
import CreateProject from "./pages/projects/create/CreateProject";
import Projects from "./pages/projects/Projects";
import UpdateProject from "./pages/projects/update/UpdateProject";
import Reviews from "./pages/review/Reviews";
import UpdateReview from "./pages/review/update/UpdateReview";
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
          <Route
            path="/blogs"
            element={
              <PrivateRoute>
                <Blogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/blog/:blogId"
            element={
              <PrivateRoute>
                <UpdateBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <PrivateRoute>
                <Reviews />
              </PrivateRoute>
            }
          />
          <Route
            path="/review/:reviewId"
            element={
              <PrivateRoute>
                <UpdateReview />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routers;
