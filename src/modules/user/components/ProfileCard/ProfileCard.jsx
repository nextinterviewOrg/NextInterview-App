import React, { useState, useRef, useEffect } from "react";
import { ProfileCardWrapper } from "./ProfileCard.styles";
import { Clerk } from "@clerk/clerk-js";
import { useUser, useClerk } from "@clerk/clerk-react";
import {
  createUserProfile,
  getUserByClerkId,
  getUserQuestionariesByUserId,
  updateUser,
} from "../../../../api/userApi";
import { Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Phone } from "@mui/icons-material";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const ProfileCard = () => {
  const clerk = new Clerk(
    "pk_test_bW9kZXN0LW11ZGZpc2gtMTguY2xlcmsuYWNjb3VudHMuZGV2JA"
  );
  const [profileFile, setProfileFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState("");
  const [linkedInError, setLinkedInError] = useState("");
  const [emailError, setEmailError] = useState("");
  const imageInputRef = useRef(null);
  const { signOut } = useClerk();
  const navigate = useNavigate();

  // Initialize Clerk
  useEffect(() => {
    const loaderFunction = async () => {
      await clerk.load();
    };
    loaderFunction();
  }, []);

  // Fetch user data
  useEffect(() => {
    const apiCaller = async () => {
      if (!isLoaded || !user) return;

      try {
        setLoading(true);
        const response = await getUserByClerkId(user.id);
        setUserId(response.data.user._id);

        const questionariesResponse = await getUserQuestionariesByUserId(
          response.data.user._id
        );

        setFormData({
          username: response.data.user.user_name || "",
          email: response.data.user.user_email || "",
          linkedIn: response.data.user.user_linkedin_profile_link || "",
          phone: response.data.user.user_phone_number || "",
          experience: questionariesResponse.data?.data_experience_response || "",
          profilePhoto: response.data.clerkUserData?.imageUrl || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    apiCaller();
  }, [isLoaded, user]); // Add dependencies here

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "linkedIn") {
      if (!value.startsWith("https://www.linkedin.com") && value !== "") {
        setLinkedInError("LinkedIn URL must start with https://www.linkedin.com");
      } else {
        setLinkedInError("");
      }
    }
    // Restrict userName: only alphabets and spaces
    if (name === "username" && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Only alphabets and spaces are allowed.",
      }));
      return;
    }

    if (name === "email") {
      // very simple RFC-style test.  Adjust if you need stricter rules
      const valid = /^\S+@\S+\.\S+$/.test(value);
      setEmailError(valid || value === "" ? "" : "Enter a valid e-mail address");
    }

    // Restrict phoneNumber: only digits
    if (name === "phoneNumber" && !/^[0-9]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Only numbers are allowed.",
      }));
      return;
    }


    setFormData({ ...formData, [name]: value });
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setProfileFile(file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (linkedInError) {
      message.error("Please fix the LinkedIn URL before saving");
      window.location.reload();
      return;
    }

    try {
      setLoading(true);
      const formDataSub = new FormData();
      formDataSub.append("clerk_id", user.id);
      formDataSub.append("user_name", formData.username);

      if (profileFile) {
        formDataSub.append("user_profile_pic", profileFile);
      }

      formDataSub.append("user_Phone_number", formData.phone);
      formDataSub.append("user_email", formData.email);

      await updateUser(formDataSub);
      await createUserProfile({
        user_linkedin_profile_link: formData.linkedIn,
        data_experience_response: formData.experience,
        user_id: userId,
      });
      message.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      message.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const handlelogout = async () => {
    await signOut();
    navigate("/login");
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={{ margin: "10px", background: "transparent", color: "#2290ac", border: "1px solid #2290ac", borderRadius: "5px", padding: "10px 30px", marginBottom: "10px", cursor: "pointer" }} onClick={handlelogout}>
          Logout
        </button>
      </div>
      <ProfileCardWrapper>
        <div className="profile-container">
          <div className="profile-header">
            <h2 className="profile-title">Basic Info</h2>

            {/* Profile Photo Section */}
            <div className="profile-photo-section">
              <h3 className="profile-photo-title">Profile Photo</h3>
              <img
                src={formData.profilePhoto}
                alt="Profile"
                className="profile-photo"
              />
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
                disabled={loading}
              />
              <button
                className="change-photo-btn"
                onClick={handleImageClick}
                disabled={loading}
              >
                Change photo
              </button>
            </div>
          </div>
          {/* Form Fields */}
          <div className="profile-content">
            <div className="form-fields">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="example@domain.com"
                    readOnly
                    onFocus={(e) => {
                      alert("Please contact Support to change your registered email address.");
                      e.target.blur();
                    }}
                  />
                  {emailError && <div className="error-message">{emailError}</div>}
                </div>
              </div>

              <div className="form-group"

              >
                <label>LinkedIn Profile Link</label>
                <div className="input-container">
                  <input
                    type="text"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="https://www.linkedin.com/in/your-profile"
                  />
                  {linkedInError && <div className="error-message">{linkedInError}</div>}
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <PhoneInput
                    className="phone-input"
                  international
                  defaultCountry="IN"
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value })}
                  disabled={loading}
                  onFocus={(e) => {
                    alert("Please contact Support to change your registered phone number.");
                    e.target.blur();
                  }}
                />
              </div>

              <div className="form-group">
                <label>Years Of Experience In Data Science</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              {/* Save Button */}
              <div className="save-btn-container">
                <button
                  className="save-btn"
                  onClick={handleSave}
                  disabled={loading || !!linkedInError || !!emailError}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProfileCardWrapper>
    </>
  );
};

export default ProfileCard;