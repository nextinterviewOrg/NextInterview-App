import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import SidebarUser from "../components/user/SidebarUser/SidebarUser";
import { PageWrapper, ContentWrapper } from "./BaseLayout.style";
import Header from "../components/Header/Header";
import NavBar from "../components/admin/Navbar/Navbar";
import UserHeader from "../components/UserHeader/UserHeader";
import ModuleSidebar from "../components/ModuleSidebar/ModuleSidebar";
import { useUser, useSession } from '@clerk/clerk-react';
import { getUserByClerkId } from "../api/userApi";

const BaseLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [title, setTitle] = useState(
    JSON.parse(localStorage.getItem("title")) || ""
  );
  const location = useLocation();
  const { isSignedIn, user, isLoaded, sessionId } = useUser();
  const navigate = useNavigate();
  // Determine layout based on path
  const isAdminPath = location.pathname.startsWith("/admin");
  const isUserPath = location.pathname.startsWith("/user");
  const [ModulePath, setModulePath] = useState(
  location.pathname.startsWith("/user/learning/") &&
    location.pathname.endsWith("/topic"));


  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
    if (window.innerWidth <= 768) {
      setIsExpanded(true); // Force expanded view on mobile when opened
    }
  };
  useEffect(() => {
    const apiCaller = async () => {
      if (isSignedIn && isLoaded && user) {
        try {

          const data = await getUserByClerkId(user.id);
          if (data.data.user.user_role === "user") {
            if (data.data.user.profile_status === true) {
              // navigate("/user", { state: sessionId });
            } else {
              navigate("/personalInfo");
            }
          } else if (data.data.user.user_role === "admin") {
            // navigate("/admin");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    apiCaller();
  }, [user])
  useEffect(() => {
    console.log("ModulePath 1111",  location.pathname.startsWith("/user/learning/") ,
    location.pathname.endsWith("/topic"));
    setModulePath(
      location.pathname.startsWith("/user/learning/") &&
        location.pathname.endsWith("/topic")
    )
  }, [navigate])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && isMobileSidebarOpen) {
        const sidebar = document.querySelector('.sidebar-wrapper');
        if (sidebar && !sidebar.contains(event.target) &&
          !event.target.closest('.mobile-hamburger')) {
          setIsMobileSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileSidebarOpen]);

  return (
    <PageWrapper isExpanded={isExpanded}>
      {isAdminPath ? (
        <>
          <Sidebar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            setTitle={setTitle}
            isSidebarOpen={isMobileSidebarOpen}
            setIsSidebarOpen={setIsMobileSidebarOpen}
          />
          <ContentWrapper isExpanded={isExpanded}>
            <Header
              title={title}
              toggleMobileSidebar={toggleMobileSidebar}
            />
            <NavBar />
            <Outlet />
          </ContentWrapper>
        </>
      ) : ModulePath ? (
        <>
          <ModuleSidebar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            setTitle={setTitle}
            isSidebarOpen={isMobileSidebarOpen}
            setIsSidebarOpen={setIsMobileSidebarOpen}
          />
          <ContentWrapper isExpanded={isExpanded}>
            <UserHeader
              title={title}
              toggleMobileSidebar={toggleMobileSidebar}
            />
            <Outlet />
          </ContentWrapper>
        </>
      ) : isUserPath ? (
        <>
          <SidebarUser
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            setTitle={setTitle}
            isSidebarOpen={isMobileSidebarOpen}
            setIsSidebarOpen={setIsMobileSidebarOpen}
          />
          <ContentWrapper isExpanded={isExpanded}>
            <UserHeader
              title={title}
              toggleMobileSidebar={toggleMobileSidebar}
            />
            <Outlet />
          </ContentWrapper>
        </>
      ) : (
        <div>
          <h1>404 - Page Not Found</h1>
        </div>
      )}
    </PageWrapper>
  );
};

export default BaseLayout;