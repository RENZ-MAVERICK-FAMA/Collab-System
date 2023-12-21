// SidebarData.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icons: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "User",
    path: "/user",
    icons: <AiIcons.AiOutlineUser />,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/messages",
    icons: <AiIcons.AiOutlineComment />,
    cName: "nav-text",
  },
];

// Your React component making the request


const Student = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin">
      <h1>Student</h1>
      </div>
  );
};
export default Student;
