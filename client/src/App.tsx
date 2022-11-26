import { AppProvider } from "contexts/AppContext";

import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./routes/root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
