import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { getUserByClerkId, getUserBySessionId } from "../../api/userApi";
import { useLocation, useNavigate } from "react-router-dom";
import Validation from "../../assets/validating.gif";

export default function ValidationPage() {
  const { isSignedIn, user, isLoaded, sessionId } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const clerId = await getUserBySessionId({
          sessionId: location.state.sessionId,
        });
        const data = await getUserByClerkId(clerId.userId);
        localStorage.setItem(
          "sessionId",
          JSON.stringify(location.state.sessionId)
        );
        if (data.data.user.user_role === "user") {
          if (data.data.user.profile_status === true) {
            navigate("/user", { state: location.state.sessionId });
          } else {
            navigate("/personalInfo");
          }
        } else if (data.data.user.user_role === "admin") {
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    // };

    // Only call the API if the user is signed in and loaded
    // if (isSignedIn && isLoaded) {
    apiCaller();
    // }
  }, []); // Add dependencies to re-run the effect when values change

  // Optional: Show a loading indicator while the user data is being loaded
  if (!isLoaded || !isSignedIn) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        Validating...
        <img
          src={Validation}
          alt="loading"
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  return <></>;
}
