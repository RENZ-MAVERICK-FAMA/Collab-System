import React, {useState} from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import {Link} from "react-router-dom"
import {SidebarData} from "./ParentView"
import "../css/App.css"
import { IconContext } from "react-icons"
import { useUser } from './UserContext';
import UserContext from './UserContext';
function ParentNav(){
const [sidebar, setSideBar] = useState(false);
const showSideBar = () => setSideBar(!sidebar);
const { userType } = useUser();

    return(
        <>
        
        <IconContext.Provider value={{color:"undefined"}}>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSideBar}/>
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSideBar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icons}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                                )
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        
        </>


    )
}

export default ParentNav;