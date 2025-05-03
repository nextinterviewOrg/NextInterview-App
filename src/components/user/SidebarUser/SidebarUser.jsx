import React from "react";
import { useEffect } from "react";
import { SideBarwrapper } from "../SidebarUser/SidebarUser.styles";
import Logo from "../../../assets/nextInetrviewLogo.svg";
import { NavLink, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { MdOutlineMenuBook } from "react-icons/md";
import { BsFileEarmarkLock } from "react-icons/bs";
import { TbDeviceIpadQuestion } from "react-icons/tb";
import { IoIosRepeat } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { CiMobile1 } from "react-icons/ci";
import { MdOutlineLockClock } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdNotificationsNone } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate,} from "react-router-dom";
import { useState } from "react";
import { PiVideoConference } from "react-icons/pi";
import dboard from "../../../assets/Dashboard.svg";
import homeicon from "../../../assets/homeicon.svg";
import learnmod from "../../../assets/Learning_Module.svg";
import quick from "../../../assets/quicklyrevise.svg";
import question from "../../../assets/questionbank.svg";
import challenge from "../../../assets/Challenges.svg";
import world from "../../../modules/user/assets/world.svg";
import { useRef } from "react";
const Sidebar = ({ isExpanded, setIsExpanded, setTitle, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
// const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar visibility for mobile

  const SidebarItem = [
    {
      id: 1,
      name: "Dashboard",
      path: "/user",
      icon: <img className="svgicon" src={dboard} alt="Users Icon" />,
    },
    {
      id: 2,
      name: "Home",
      path: "/user/home",
      icon: <img className="svgicon" src={homeicon} alt="homeicon" />,
    },
    {
      id: 3,
      name: "Learning Module",
      path: "/user/learning",
      icon: <img className="svgicon" src={learnmod} alt="Users Icon" />,
    },
    {
      id: 4,
      name: "Quickly Revise",
      path: "/user/revise",
      icon: <img className="svgicon" src={quick} alt="quick" />,
    },
    {
      id: 5,
      name: "Question Bank",
      path: "/user/questionbank",
      icon: <img className="svgicon" src={question} alt="question" />,
    },
    {
      id: 6,
      name: "Challenges",
      path: "/user/challenges",
      icon: <img className="svgicon" src={challenge} alt="Users Icon" />,
    },
    {
      id: 8,
      name: "Subscription",
      path: "/user/subscription",
      icon: <FaMoneyCheckAlt />,
    },
    {
      id: 9,
      name: "Blogs",
      path: "/user/blogs",
     icon: <img className="svgicon" src={world} alt="Users Icon" />
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
            <img src={Logo} alt="logo" />
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
