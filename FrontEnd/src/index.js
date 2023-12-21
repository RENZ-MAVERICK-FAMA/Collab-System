// ./src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";


const AppLayout = () => (
  <>

    <Login/>
   
  
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
