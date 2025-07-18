import React, { useState } from "react";
import { ProfileUserWrapper } from "./ProfileUser.styles";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserSubscriptionInfo from "../../components/UserSubscriptionInfo/UserSubscriptionInfo";
import UserPastInterviews from "../../components/UserPastInterviews/UserPastInterviews";
import { useUser } from "@clerk/clerk-react";
import { updatePassword } from "../../../../api/userApi";
import { message } from "antd";
import { PiEyeLight } from "react-icons/pi";
import { IoEyeOffOutline } from "react-icons/io5";

export default function ProfileUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { isSignedIn, user, isLoaded } = useUser();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleClose = () => {
    setIsOpen(false);
    // Optionally clear fields: setPasswords({oldPassword:'', newPassword:'', confirmPassword:''});
  };

  const handleResetPassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      message.error("New password and confirm password do not match!");
      return;
    }

    try {
      const response = await updatePassword({
        clerk_id: user.id,
        oldPassword: passwords.oldPassword,
        newPassword: passwords.confirmPassword,
      });

      if (response.success) {
        message.success("Password reset successfully!");
        handleClose();
      } else {
        // Show alert ONLY for incorrect old password
        if (
          response.message &&
          response.message.toLowerCase().includes("old password")
        ) {
          alert("Old password is incorrect.");
        } else {
          message.error(response.message || "Password reset failed.");
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      // If backend sends "Old password is incorrect" through error response
      if (errorMessage.toLowerCase().includes("old password")) {
        alert("Old password is incorrect.");
      } else {
        message.error(errorMessage);
      }
    }
  };


  return (
    <ProfileUserWrapper>
      <ProfileCard />
      <UserSubscriptionInfo />
      <UserPastInterviews />
      <div className="password-reset-container">
        <button
          className="password-reset-button"
          onClick={() => setIsOpen(true)}
        >
          Reset Password
        </button>
      </div>
      {isOpen && (
        <div className="password-reset-modal-overlay">
          <div className="password-reset-modal-content">
            <div className="password-reset-modal-content-details">
              <button
                className="password-reset-close-modal"
                onClick={handleClose}
              >
                &times;
              </button>

              <h2 className="password-reset-modal-title">Reset Password?</h2>
              <p className="password-reset-modal-subtext">
                Password must be alphanumeric and contain at least 8 characters.
              </p>

              <label className="password-reset-modal-label">Old Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleInputChange}
                  className="password-reset-modal-input"
                />
                <div
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "gray",
                  }}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <PiEyeLight /> : <IoEyeOffOutline />}
                </div>
              </div>


              <label className="password-reset-modal-label">New Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                  className="password-reset-modal-input"
                />
                <div
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "gray",
                  }}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <PiEyeLight /> : <IoEyeOffOutline />}
                </div>
              </div>


              <label className="password-reset-modal-label">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your new password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleInputChange}
                  className="password-reset-modal-input"
                />
                <div
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "gray",
                  }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <PiEyeLight /> : <IoEyeOffOutline />}
                </div>
              </div>


              <button
                className="password-reset-modal-reset-btn"
                onClick={handleResetPassword}
                disabled={
                  passwords.newPassword === "" &&
                  passwords.confirmPassword === "" &&
                  passwords.oldPassword === ""
                }
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </ProfileUserWrapper>
  );
}
