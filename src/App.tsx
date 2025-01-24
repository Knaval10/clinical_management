import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NewPatients from "./pages/NewPatients";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/patients",
      element: (
        <Layout>
          <NewPatients />
        </Layout>
      ),
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
