import React, { useState, useEffect } from "react";
import ResetPassword from "./ResetPassword/ResetPassword";
import {
  ProfileContainer,
  SectionTitle,
  ProfilePhoto,
  UploadButton,
  FormGroup,
  Label,
  InputField,
  SaveButton,
  ResetButtonWrapper,
  ResetButton,
  Header,
  LogoutButton,
} from "./ProfileInfo.styles";
import { GoPerson } from "react-icons/go";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId, updateUser } from "../../../../api/userApi";
import { useClerk } from "@clerk/clerk-react";
import { message } from "antd";
import { Spin } from "antd";

const ProfileInfo = () => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const [profileFile, setProfileFile] = useState(null);
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoaded || !user) return;
      
      try {
        setLoading(true);
        const response = await getUserByClerkId(user.id);
        if (response.data) {
          setProfilePhoto(response.data.clerkUserData?.imageUrl || "");
          setUserName(response.data.user?.user_name || "");
          setEmail(response.data.user?.user_email || "");
          setPhone(response.data.user?.user_phone_number || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        message.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoaded, user]); // Add dependencies here

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    setProfileFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("clerk_id", user.id);
      formData.append("user_name", userName);
      if (profileFile) {
        formData.append("user_profile_pic", profileFile);
      }
      formData.append("user_Phone_number", phone);
      formData.append("user_email", email);

      await updateUser(formData);
      message.success("Profile updated successfully!");
      window.location.reload();
      
      // Refresh the data after update
      const response = await getUserByClerkId(user.id);
      if (response.data) {
        setProfilePhoto(response.data.clerkUserData?.imageUrl || "");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordClick = () => {
    setShowResetPassword(true);
  };

  const handleCloseResetPassword = () => {
    setShowResetPassword(false);
  };

  const handleLogout = () => {
    // Perform logout actions here (e.g., clearing session, redirecting)
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Header>
        <LogoutButton
          onClick={() => {
            signOut();
            handleLogout();
          }}
        >
          Logout
        </LogoutButton>
      </Header>
      <ProfileContainer>
        <SectionTitle>Basic Info</SectionTitle>
        <ProfilePhoto>
          <div className="profilePic">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="uploadedProfilePic"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <GoPerson size={50} className="profileicon" />
            )}
          </div>

          <UploadButton>
            <label>
              {profilePhoto ? "Change photo" : "Upload photo"}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={loading}
              />
            </label>
          </UploadButton>
        </ProfilePhoto>
        <FormGroup>
          <Label>Full Name</Label>
          <InputField
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email ID</Label>
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number</Label>
          <InputField
            type="tel"
            value={phone}
            onChange={(e) => {
              if (/^[0-9]*$/.test(e.target.value)) {
                setPhone(e.target.value);
              }
            }}
            maxLength={10}
            disabled={loading}
          />
        </FormGroup>
        <ResetButtonWrapper>
          <ResetButton onClick={handleResetPasswordClick} disabled={loading}>
            Reset password
          </ResetButton>
          <SaveButton onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </SaveButton>
        </ResetButtonWrapper>
      </ProfileContainer>
      {showResetPassword && (
        <ResetPassword onClose={handleCloseResetPassword} />
      )}
    </>
  );
};

export default ProfileInfo;