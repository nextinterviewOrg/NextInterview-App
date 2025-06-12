import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/Logo.png";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";
import {
  HeaderContainer,
  Title,
  HeaderRight,
  UserProfile,
  UserDetails,
  UserName,
  UserEmail,
  Avatar,
  HeaderWrapper,
} from "./Header.styles";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useUser, useClerk } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../api/userApi";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "../../theme/Theme";

// Dropdown Component
const Dropdown = ({
  isOpen,
  onClose,
  position,
  onLogoutClick,
}) => {
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dropdownStyles = {
    position: "absolute",
    top: position.top + 50,
    left: position.left - 140,
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    width: "180px",
    padding: "10px 0",
    cursor: "pointer",
  };

  const listStyles = {
    fontFamily: "DM Sans",
    fontSize: "16px",
    fontWeight: "500",
    color: theme.colors.textgray,
    listStyle: "none",
    padding: "0 20px",
  };

  const listItemStyles = {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 0",
    "&:hover": {
      color: theme.colors.primary,
    },
  };

  return ReactDOM.createPortal(
    <div ref={dropdownRef} style={dropdownStyles}>
      <ul style={listStyles}>
        <li
          style={listItemStyles}
          onClick={() => {
            navigate("/admin/profile");
            onClose();
          }}
        >
          <CgProfile /> My Profile
        </li>
        <li style={listItemStyles} onClick={onLogoutClick}>
          <RiLogoutBoxLine /> Logout
        </li>
      </ul>
    </div>,
    document.body
  );
};

const Header = ({ toggleMobileSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState({ top: 0, left: 0 });
  const { isSignedIn, user, isLoaded } = useUser();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine title based on current path
  const getTitleFromPath = (pathname) => {
    const path = pathname.toLowerCase();
    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("faq")) return "FAQ's";
    if (path.includes("learning")) return "Learning Module";
    if (path.includes("profile")) return "Profile ";
    if (path.includes("users")) return "Users";
    if (path.includes("supportquery")) return "Support Query";
    if (path.includes("flashcard")) return "Flashcard";
    if (path.includes("notification")) return "Notifications";
    if (path.includes("manage-mfa")) return "Manage MFA";
    if (path.includes("real-world-scenario")) return "Real World Scenarios";
    if (path.includes("challenges")) return "Challenges";
    if (path.includes("userProfile")) return "User Profile";
    if (path.includes("user-feedback")) return "User Feedback";
    if (path.includes("settingspage")) return "Settings";
    if (path.includes("tiyqbcodingquestions")) return "Coding Questions";
    if (path.includes("payment-history")) return "Payment History";
    // Add more routes as needed
    return "Dashboard"; // Default title
  };

  // State for title with proper initial value
  const [title, setTitle] = useState(() => getTitleFromPath(location.pathname));

  // Reset title when location changes
  useEffect(() => {
    setTitle(getTitleFromPath(location.pathname));
  }, [location.pathname]);

  const handleAvatarClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setAvatarPosition({ top: rect.top + window.scrollY, left: rect.left });
    setIsProfileOpen((prevState) => !prevState);
  };

  // Complete logout handler
  const handleCompleteLogout = async () => {
    await signOut();
    setTitle("Dashboard"); // Explicitly reset title
    navigate("/sign-in");
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isSignedIn || !isLoaded || !user) return;
      try {
        const userData = await getUserByClerkId(user?.id);
        setUserAvatar(userData.data.clerkUserData.imageUrl);
        setUserName(userData.data.user.user_name);
        setUserEmail(userData.data.user.user_email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [isSignedIn, isLoaded, user]);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div className="hamburger-icon" onClick={toggleMobileSidebar}>
            <FaBars />
          </div>
          <Title>{title}</Title>
        </div>

        <HeaderRight>
          <UserProfile>
            <UserDetails>
              <UserName>{userName}</UserName>
              <UserEmail>{userEmail}</UserEmail>
            </UserDetails>
            <div style={{ position: "relative" }} className="dropdown-container">
              <Avatar
                src={userAvatar || Logo}
                alt="Profile"
                onClick={handleAvatarClick}
              />
              <Dropdown
                isOpen={isProfileOpen}
                position={avatarPosition}
                onClose={() => setIsProfileOpen(false)}
                onLogoutClick={() => setIsLogoutModalOpen(true)}
              />
            </div>
          </UserProfile>
        </HeaderRight>
      </HeaderContainer>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="User-Header-modal-overlay">
          <div className="User-Header-modal-content">
            <h3>Are you sure you want to Logout?</h3>
            <div className="User-Header-modal-buttons">
              <button
                className="User-Header-cancel-btn"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="User-Header-logout-btn"
                onClick={handleCompleteLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </HeaderWrapper>
  );
};

export default Header;