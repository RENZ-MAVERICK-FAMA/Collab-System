import * as React from "react";
import { createRoot } from "react-dom/client";
import { useParams } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import Class from "./src/pages/Class";
import Home from "./src/pages/Home";
import User from "./src/pages/User";
import Students from "./src/pages/Students";
import Messages from "./src/pages/Messages";
import Admin from "./src/pages/Admin";
import Grade from "./src/pages/Grade";
import NavBar from "./src/components/NavBar";
import ParentNav from "./src/components/ParentNav";
import "./css/App.css";
import Login from "./src/pages/Login";
import IndividualStud from "./src/pages/IndividualStud";
import { useLocation } from 'react-router-dom';
import Student from "./src/components/ParentView";
import {SideBarData} from "./src/components/ParentView";
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './src/components/UserContext';
import  { useEffect } from 'react';
import UserContext from './src/components/UserContext';
import {useUser} from "./src/components/UserContext";
const isAuthenticated = true; 





const AppLayout = () => {
  const { userType, setUserType } = useUser();
  const location = useLocation();
  const userTypeFromUrl = new URLSearchParams(location.search).get('userType');

  useEffect(() => {
    // Set the userType when it changes from the URL
    if (userTypeFromUrl) {
      setUserType(userTypeFromUrl);
    }
  }, [userTypeFromUrl, setUserType]);
  const renderUserTypeSpecificContent = () => {
    if (userType == "student") {
      return <ParentNav />;
    } else {
      return <NavBar />;
    }
  };
  return (
    <>
      {renderUserTypeSpecificContent()}
      <Outlet />
    </>
  );
};



const ProtectedRoute = ({ path, element }) => {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: path }} replace />
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute path="/" element={<IndividualStud />} />,
      },
      {
        path: "class",
        element: <ProtectedRoute path="class" element={<Class />} />,
      },
        {
        path: "home",
        element: <ProtectedRoute path="home" element={<Home />} />,
      },
      {
        path: "user",
        element: <ProtectedRoute path="user" element={<User />} />,
      },
      {
        path: "students",
        element: <ProtectedRoute path="students" element={<Students />} />,
      },
      {
        path: "messages",
        element: <ProtectedRoute path="messages" element={<Messages />} />,
      },
      {
        path: "admin",
        element: <ProtectedRoute path="admin" element={<Admin />} />,
      },
      {
        path: "student",
        element: <ProtectedRoute path="student" element={<Student />}/>,
      },
    ], },
    
    
  {
    path: "login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
