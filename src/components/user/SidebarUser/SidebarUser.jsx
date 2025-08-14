import React from "react";
import { useEffect } from "react";
import { SideBarwrapper } from "../SidebarUser/SidebarUser.styles";
import LogoSmall from "../../../assets/nextInetrviewLogo.svg";
import LogoBig from "../../../assets/LOGO.png";
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
import { useNavigate, } from "react-router-dom";
import { useState } from "react";
import { PiVideoConference } from "react-icons/pi";
import dboard from "../../../assets/Dashboard.svg";
import homeicon from "../../../assets/homeicon.svg";
import learnmod from "../../../assets/Learning_Module.svg";
import quick from "../../../assets/quicklyrevise.svg";
import question from "../../../assets/questionbank.svg";
import challenge from "../../../assets/Challenges.svg";
import world from "../../../modules/user/assets/world.svg";
import blog from "../../../assets/blogging.svg";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import lock from "../../../assets/lock.svg"

const Sidebar = ({ isExpanded, setIsExpanded, setTitle, isSidebarOpen, setIsSidebarOpen, isSubscriptionActive }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar visibility for mobile

  const SidebarItem = [
    {
    id: 1,
    name: "Dashboard",
    path: "/user",
    img: dboard,
    alt: "Dashboard",
    lockIcon: lock
  },
  {
     id: 2,
    name: "Home",
    path: "/user/home",
    img: homeicon,
    alt: "Home",
    lockIcon: lock
  },
  {
    id: 3,
    name: "Learning Module",
    path: "/user/learning",
    img: learnmod,
    alt: "Learning Module"
  },
{
  id: 4,
  name: "Quick Revise",
  path: "/user/revise",
  img: quick,
  alt: "Quick Revise",
  lockIcon: lock
},
{
  id: 5,
  name: "Question Bank",
  path: "/user/mainQuestionBank/questionbank",
  img: question,
  alt: "Question Bank",
  lockIcon: lock
},
{
  id: 6,
  name: "Challenges",
  path: "/user/challenges",
  img: challenge,
  alt: "Challenges",
  lockIcon: lock
},
    // {
    //   id: 8,
    //   name: "Subscription",
    //   path: "/user/subscription",
    //   icon: <FaMoneyCheckAlt />,
    // },
{
  id: 7,
  name: "Blogs",
  path: "/user/blogs",
  img: blog,
  alt: "Blogs",
  imgWidth: 20,
  imgHeight: 20,
  lockIcon: lock
}


  ];


  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    console.log("Subscription status in SidebarUser:", isSubscriptionActive);
  }, [isSubscriptionActive]);

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
      // onMouseEnter={() => setIsExpanded(true)}
      // onMouseLeave={() => setIsExpanded(false)}
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
                to={
                  isSubscriptionActive || item.name === "Learning Module"
                    ? item.path
                    : "#"
                }
                end // <-- add this line
                className={({ isActive }) => {
                  const isLocked = !isSubscriptionActive && item.name !== "Learning Module";
                  const baseClass = "menu-link";
                  if (isActive && !isLocked) return `${baseClass} active`;
                  if (isLocked) return `${baseClass} disabled`;
                  return baseClass;
                }}
                onClick={(e) => {
                  const isLocked = !isSubscriptionActive && item.name !== "Learning Module";
                  if (isLocked) {
                    e.preventDefault();
                  } else {
                    setTitle(item.name);
                  }
                }}
              >

<span className="menu-link-icon">
  {!isExpanded ? (
    <abbr title={item.name}>
      <img className="svgicon" src={item.img} alt={item.alt}   width={item.imgWidth || undefined}
        height={item.imgHeight || undefined}/>
    </abbr>
  ) : (
    <img className="svgicon" src={item.img} alt={item.alt}   width={item.imgWidth || undefined}
        height={item.imgHeight || undefined} />
  )}
</span>
                <span className="menu-link-text">{item.name}</span>
               {!isSubscriptionActive && item.lockIcon && (
  <span className="menu-link-lock">
    {!isExpanded ? (
      <abbr title={item.name}>
        <img className="svgicon" src={item.lockIcon} alt="Locked" />
      </abbr>
    ) : (
      <img className="svgicon" src={item.lockIcon} alt="Locked" />
    )}
  </span>
)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow toggle (desktop) */}
      <div
        className="arrow-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? <FaChevronLeft size={14} /> : <FaChevronRight size={14} />}
      </div>


      {isExpanded ? (
        <div className="mock-card">
          <div className="mock-card-icon">
            <PiVideoConference />
          </div>
          <h2 className="mock-card-title">Take a Mock Interview</h2>
          <p className="mock-card-description">
            Take a Mock interview to understand whether you are Interview Ready!
          </p>
          <button
            className="mock-card-button"
            // onClick={() => navigate("/user/interview")}
                  onClick={() => alert("This feature is coming soon...")}

          >
            Start interview
          </button>
        </div>
      ) : (
        <div
          className="mock-card-icon collapsed"
          title="Take a Mock Interview"
          // onClick={() => navigate("/user/interview")}
                onClick={() => alert("This feature is coming soon...")}
          style={{ cursor: "pointer" }}
        >
          <PiVideoConference className="collapsed-icon" />
        </div>
      )}


    </SideBarwrapper>
  );
};

export default Sidebar;
