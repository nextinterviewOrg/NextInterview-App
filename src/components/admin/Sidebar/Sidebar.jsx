import React from "react";
import { SideBarwrapper } from "./Sidebar.styles";
import LogoSmall from "../../../assets/nextInetrviewLogo.svg";
import LogoBig from "../../../assets/LOGO.png";
import { NavLink, useLocation } from "react-router-dom";
import dboard from "../../../assets/Dashboard.svg";
import users from "../../../assets/Vector.svg";
import learnmod from "../../../assets/Learning_Module.svg";
import squerry from "../../../assets/Support_Query.svg";
import fcard from "../../../assets/Flash_Cards.svg";
import faq from "../../../assets/FAQ's.svg";
import challenge from "../../../assets/Challenges.svg";
import Settings from "../../../assets/Settings.svg";
import Notification from "../../../assets/Notifications.svg";
import world from "../../../modules/user/assets/world.svg";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Blogs from "../../../assets/blogging.svg";
import UserFeedback from "../../../assets/userFeedback.svg";
import Authentication from "../../../assets/Authentication.svg";
import Coding from "../../../assets/coding.svg";
// import { FaBars } from "react-icons/fa"; // Importing the hamburger icon

const Sidebar = ({ isExpanded, setIsExpanded, setTitle, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const SidebarItem = [
    {
      id: 1,
      name: "Dashboard",
      path: "/admin",
      icon: <img className="svgicon" src={dboard} alt="Dashboard Icon" />,
    },
    {
      id: 2,
      name: "Users",
      path: "/admin/users",
      icon: <img className="svgicon" src={users} alt="Users Icon" />,
    },
    {
      id: 3,
      name: "Learning Module",
      path: "/admin/learning",
      icon: (
        <img className="svgicon" src={learnmod} alt="Learning Module Icon" />
      ),
    },
    {
      id: 4,
      name: "Support Query",
      path: "/admin/SupportQuery",
      icon: <img className="svgicon" src={squerry} alt="Support Query Icon" />,
    },
    {
      id: 5,
      name: "Flashcards",
      path: "/admin/flashcards",
      icon: <img className="svgicon" src={fcard} alt="Flashcards Icon" />,
    },
    {
      id: 6,
      name: "FAQ's",
      path: "/admin/faq",
      icon: <img className="svgicon" src={faq} alt="FAQ's Icon" />,
    },
    {
      id: 7,
      name: "Challenges",
      path: "/admin/challenges",
      icon: <img className="svgicon" src={challenge} alt="Challenges Icon" />,
    },
    {
      id: 8,
      name: "Notifications",
      path: "/admin/notifications",
      icon: (
        <img className="svgicon" src={Notification} alt="Notifications Icon" />
      ),
    },
    {
      id: 9,
      name: "Multi Factor Authentication",
      path: "/admin/manage-mfa",
      icon: <img className="svgicon" src={Authentication} alt="MFA Icon" />,
    },
    {
      id: 10,
      name: "Blogs",
      path: "/admin/real-world-scenario",
      icon: <img className="svgicon" src={Blogs} alt="Blogs Icon" />,
    },
    {
      id: 11,
      name: "User Feedback",
      path: "/admin/user-feedback",
      icon: <img className="svgicon" src={UserFeedback} alt="User feedback Icon" />

    },
    {
      id: 12,
      name: "Coding Questions",
      path: "/admin/TIYQBCodingQuestions",
      icon: <img className="svgicon" src={Coding} alt="Coding Icon" />,
    },
    {
      id: 13,
      name: "Settings",
      path: "/admin/settingspage",
      icon: <img className="svgicon" src={Settings} alt="Settings Icon" />,
    }
  ];

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const sidebarRef = useRef(null); // Create a ref for the sidebar

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    // Add event listener when sidebar is open in mobile view
    if (isSidebarOpen && window.innerWidth <= 768) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);
  return (
    <SideBarwrapper
      ref={sidebarRef}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      isExpanded={isExpanded}
      isSidebarOpen={isSidebarOpen} // Pass the open state to the styled component
    >
      <div className="logo">
        <img src={isExpanded ? LogoBig : LogoSmall} alt="logo" />
      </div>
      <div className="menu">
        <ul className="menu-list">
          {SidebarItem.map((item) => (
            <li className="menu-item" key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
                onClick={() => {
                  setTitle(item.name);
                  localStorage.setItem("title", JSON.stringify(item.name));
                }}
                end
              >
                <span className="menu-link-icon">{item.icon}</span>
                <span className="menu-link-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>


    </SideBarwrapper>
  );
};

export default Sidebar;
