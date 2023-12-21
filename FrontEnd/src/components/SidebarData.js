import React from "react"
import * as AiIcons from "react-icons/ai"

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
        title: "Class",
        path: "/class",
        icons: <AiIcons.AiOutlineTeam />,
        cName: "nav-text",
    }
    ,
   
    {
        title: "Students",
        path: "/students",
        icons: <AiIcons.AiOutlineFolder />,
        cName: "nav-text",
    }
    ,
    
    {
        title: "Admin",
        path: "/admin",
        icons: <AiIcons.AiOutlineKey/>,
        cName: "nav-text",
    },
    {
        title: "Messages",
        path: "/messages",
        icons: <AiIcons.AiOutlineComment />,
        cName: "nav-text",
    }
    
]