import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Logo from "../../assets/Logo.png";
import PropTypes from "prop-types";
import {
  HeaderContainer,
  Title,
  HeaderRight,
  IconWrapper,
  Icon,
  UserProfile,
  UserDetails,
  UserName,
  UserEmail,
  Avatar,
  UserHeaderWrapper,
  ModalContainer,
  ModalCard,
  CloseIcon,
  Overlay,
} from "./UserHeader.styles";
import { PiLineVertical } from "react-icons/pi";
import { BsBell } from "react-icons/bs";
import { MdOutlineInfo } from "react-icons/md";
import { UserButton } from "@clerk/clerk-react";
import { data, useNavigate, useParams } from "react-router-dom";
import theme from "../../theme/Theme";
import { list } from "firebase/storage";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import RaiseQuery from "../../modules/user/components/UserFaqComponent/RaiseQuery";
// import SupportQuery from "../../modules/admin/pages/SupportQuery/SupportQuery";
import SupportQuery from "../../modules/user/components/SupportQuery/SupportQuery";
import { useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import { getUserByClerkId } from "../../api/userApi";
import { getNotificationByUser } from "../../api/notificationApi";
import { IoClose } from "react-icons/io5";
import notification from "../../assets/BellIcon.svg";

// **Logout Confirmation Modal Component**

// **Dropdown Component**
const Dropdown = ({
  isOpen,
  onClose,
  position,
  onOpenQueryModal,
  onLogoutClick,
}) => {
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose(); // Close dropdown if clicking outside
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
    top: position.top + 50, // Adjust position below the avatar
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
  const listyles = {
    FontFace: "DM Sans",
    fontSize: "16px",
    fontWeight: "500",
    color: theme.colors.textgray,
    listStyle: "none",
    padding: "0 20px",
  };
  const listLIStyles = {
    marginBottom: "8px",
  };

  return ReactDOM.createPortal(
    <div ref={dropdownRef} style={dropdownStyles}>
      <ul style={listyles}>
        <li
          style={listLIStyles}
          onClick={() => {
            navigate("/user/userprofile");
            onClose();
          }}
        >
          {" "}
          <CgProfile /> My Profile
        </li>
        {/* <li style={listLIStyles} onClick={() => { alert("Customer Support clicked"); onClose(); }}> <MdOutlineSupportAgent /> Customer Support</li> */}
        <li
          style={listLIStyles}
          onClick={() => {
            navigate("/user/userfaq");
            onClose();
          }}
        >
          {" "}
          <CgProfile /> FAQ's
        </li>
        <li
          style={listLIStyles}
          onClick={() => {
            onOpenQueryModal();
            onClose();
          }}
        >
          {" "}
          <CgProfile /> Raise a Query
        </li>
        <li style={listLIStyles} onClick={onLogoutClick}>
          <RiLogoutBoxLine /> Logout
        </li>
      </ul>
    </div>,
    document.body
  );
};

// **Main Header Component**
const UserHeader = ({ title }) => {
  const [issopen, setIssopen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState({ top: 0, left: 0 });
  const [isRaiseQueryOpen, setIsRaiseQueryOpen] = useState(false); // State for RaiseQuery modal
  const { isSignedIn, user, isLoaded } = useUser();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { signOut } = useClerk();
  const [userAvatar, setUserAvatar] = useState("");
  const navigate = useNavigate();

  const [notificationCount, setNotificationCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notify = [];
  const { userId } = useParams();
  const handleNotifyClick = async () => {
    setLoading(true);
    const cleanedUserId = user.id.replace(/^user_/, ""); // Remove 'user_' prefix
    const userData = await getUserByClerkId(user.id);
    const notifications = await getNotificationByUser(userData.data?.user?._id);
    setNotificationCount(notifications.data);
    setLoading(false);
    setIsNotificationOpen(!isNotificationOpen);
  };
  const handleNotifyClickk = () => {
    setIssopen(true);
  };

  const [notificationPosition, setNotificationPosition] = useState({
    top: 0,
    left: 0,
  });

  // const handleNotifyClick = async (event) => {
  //   setLoading(true);
  //   const cleanedUserId = user.id.replace(/^user_/, "");
  //   const userData = await getUserByClerkId(user.id);
  //   const notifications = await getNotificationByUser(userData.data?.user?._id);
  //   setNotificationCount(notifications.data);
  //   setLoading(false);

  //   // Get the position of the bell icon
  //   const rect = event.target.getBoundingClientRect();
  //   setNotificationPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });

  //   setIsNotificationOpen(!isNotificationOpen);
  // };

  const handleClose = () => {
    setIssopen(false);
  };

  // Function to close the modal when clicking outside of it
  const handleOutsideClickk = (e) => {
    if (e.target.id === "modal-overlay") {
      handleClose();
    }
  };

  const handleAvatarClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setAvatarPosition({ top: rect.top + window.scrollY, left: rect.left });
    setIsProfileOpen((prevState) => !prevState); // Toggle the dropdown menu
  };

  const handleLogout = () => {
    // Perform logout actions here (e.g., clearing session, redirecting)
    setIsLogoutModalOpen(false);
  };
  useEffect(() => {
    const apiCaller = async () => {
      if (!isSignedIn || !isLoaded || !user) return;
      const userData = await getUserByClerkId(user.id);
      setUserAvatar(userData.data.clerkUserData.imageUrl);
      setUserName(userData.data.user.user_name);
      setUserEmail(userData.data.user.user_email);
    };
    apiCaller();
  }, [navigate, isSignedIn, isLoaded, user]);

  const NotificationDropdown = ({ notifications, onClose }) => {
    const [localNotifications, setLocalNotifications] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);

    useEffect(() => {
      setLocalNotifications([...notifications].reverse()); // Latest notifications on top
    }, [notifications]);

    const handleCloseNotification = (index) => {
      setLocalNotifications((prevNotifications) => {
        const newNotifications = prevNotifications.filter(
          (_, i) => i !== index
        );
        return newNotifications;
      });

      // setNotificationCount((prevCount) => prevCount.slice(0, index).concat(prevCount.slice(index + 1)));
    };

    return (
      <div
        ref={dropdownRef}
        style={{
          position: "absolute",
          top: "70px",
          right: "14%",
          background: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          width: "400px",
          cursor: "pointer",
          maxHeight: "400px",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {localNotifications.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "400px",
              height: "400px",
            }}
          >
            <img src={notification} alt="notification" />
            <p style={{ fontSize: "16px" }}>No New Notifications</p>
          </div>
        ) : (
          localNotifications.map((notification, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 16px",
                border: "1px solid #ddd",
                position: "relative",
                margin: "10px",
                borderRadius: "20px",
              }}
            >
              <p style={{ margin: "0", fontSize: "14px", width: "90%" }}>
                {notification.message}
              </p>
              <span
                onClick={() => handleCloseNotification(index)}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                &times;
              </span>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <>
      <UserHeaderWrapper>
        <HeaderContainer>
          <div style={{ marginLeft: "60px" }}>
            <Title>{title}</Title> {/* Dynamic title with fallback */}
          </div>
          <HeaderRight>
            <IconWrapper>
              <Icon style={{ position: "relative" }}>
                <BsBell
                  onClick={handleNotifyClick}
                  title="Notifications"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                />

                {notificationCount.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-3px",
                      right: "-3px",
                      background: "red",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                      borderRadius: "50%",
                      width: "14px",
                      height: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></span>
                )}
              </Icon>

              {issopen &&
                ReactDOM.createPortal(
                  <Overlay id="modal-overlay" onClick={handleOutsideClickk}>
                    <ModalContainer>
                      <ModalCard>
                        <CloseIcon onClick={handleClose}>
                          <IoClose />
                        </CloseIcon>
                        <h3>Notifications</h3>
                        {notify.length > 0 ? (
                          notify.map((notification, index) => (
                            <p key={index}>{notification}</p>
                          ))
                        ) : (
                          <p>No notifications found</p>
                        )}
                      </ModalCard>
                    </ModalContainer>
                  </Overlay>,
                  document.body
                )}

              <Icon>
                <PiLineVertical title="Vertical Line" />
              </Icon>
              <Icon>
                <MdOutlineInfo
                  title="Information"
                  onClick={() => navigate("/user/userfaq")}
                />
              </Icon>
            </IconWrapper>
            <UserProfile>
              <UserDetails>
                <UserName>{userName}</UserName>
                <UserEmail>{userEmail}</UserEmail>
              </UserDetails>
              <div
                style={{ position: "relative" }}
                className="dropdown-container"
              >
                <Avatar
                  src={userAvatar ? userAvatar : Logo}
                  alt="Profile"
                  onClick={handleAvatarClick}
                />
                <Dropdown
                  isOpen={isProfileOpen}
                  position={avatarPosition}
                  onClose={() => setIsProfileOpen(false)}
                  onLogoutClick={() => {
                    setIsLogoutModalOpen(true);
                    // setIsProfileOpen(false);
                  }}
                  onOpenQueryModal={() => setIsRaiseQueryOpen(true)} // Open RaiseQuery modal
                />
              </div>
              {/* <UserButton afterSignOutUrl="/" /> */}
            </UserProfile>
          </HeaderRight>
        </HeaderContainer>

        {isLogoutModalOpen && (
          <div className="User-Header-modal-overlay">
            <div className="User-Header-modal-content">
              <h3>Are you sure, you want to Logout?</h3>
              <div className="User-Header-modal-buttons">
                <button
                  className="User-Header-cancel-btn"
                  onClick={() => setIsLogoutModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="User-Header-logout-btn"
                  onClick={() => {
                    signOut();
                    navigate("/login");
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {isNotificationOpen && (
          <NotificationDropdown
            notifications={notificationCount}
            onClose={() => setIsNotificationOpen(false)}
          />
        )}

        <SupportQuery
          isOpen={isRaiseQueryOpen}
          onClose={() => setIsRaiseQueryOpen(false)}
        />
      </UserHeaderWrapper>
    </>
  );
};

UserHeader.propTypes = {
  title: PropTypes.string.isRequired, // Enforces a dynamic title
};

export default UserHeader;
