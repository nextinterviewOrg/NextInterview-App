// BaseLayout.js
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import SidebarUser from "../components/user/SidebarUser/SidebarUser";
import { PageWrapper, ContentWrapper } from "./BaseLayout.style";
import Header from "../components/Header/Header";
import NavBar from "../components/admin/Navbar/Navbar";
import UserHeader from "../components/UserHeader/UserHeader";
import ModuleSidebar from "../components/ModuleSidebar/ModuleSidebar";
import { useUser } from '@clerk/clerk-react';
import { getUserByClerkId } from "../api/userApi";

const BaseLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [title, setTitle] = useState(
    JSON.parse(localStorage.getItem("title")) || ""
  );
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [moduleNavigationState, setModuleNavigationState] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();

  const isAdminPath = location.pathname.startsWith("/admin");
  const isUserPath = location.pathname.startsWith("/user");
  const isModulePath = location.pathname.startsWith("/user/learning/") &&
    location.pathname.endsWith("/topic");

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
    if (window.innerWidth <= 768) {
      setIsExpanded(true);
    }
  };

  useEffect(() => {
    const apiCaller = async () => {
      if (isSignedIn && isLoaded && user) {
        try {
          const data = await getUserByClerkId(user.id);
          const role = data.data.user.user_role;
          const subscription = data.data.user.subscription_status;

          setSubscriptionStatus(subscription);

          if (role === "user") {
            if (data.data.user.profile_status === true) {
              if (subscription === "active") {
                // ok
              } else {
                navigate("/user/subscription");
              }
            } else {
              navigate("/personalInfo");
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    apiCaller();
  }, [user, isSignedIn, isLoaded, navigate]);

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

  // Handle module navigation state
  useEffect(() => {
    if (isModulePath && location.state) {
      setModuleNavigationState(location.state);
    }
  }, [isModulePath, location.state]);

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
            <Header title={title} toggleMobileSidebar={toggleMobileSidebar} />
            <NavBar />
            <Outlet />
          </ContentWrapper>
        </>
      ) : isModulePath ? (
        <>
          <ModuleSidebar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            setTitle={setTitle}
            isSidebarOpen={isMobileSidebarOpen}
            setIsSidebarOpen={setIsMobileSidebarOpen}
            isSubscribed={subscriptionStatus === "active"}
            key={moduleNavigationState ? JSON.stringify(moduleNavigationState) : 'default'}
          />
          <ContentWrapper isExpanded={isExpanded}>
            <UserHeader title={title} toggleMobileSidebar={toggleMobileSidebar} />
            <Outlet context={[moduleNavigationState, setModuleNavigationState]} />
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
            isSubscriptionActive={subscriptionStatus === "active"}
          />
          <ContentWrapper isExpanded={isExpanded}>
            <UserHeader title={title} toggleMobileSidebar={toggleMobileSidebar} />
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