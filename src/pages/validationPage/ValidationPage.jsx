import React, { useEffect } from 'react';
import { useUser, useSession } from '@clerk/clerk-react';
import { getUserByClerkId, getUserBySessionId } from '../../api/userApi';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import verifying from "../../assets/Lottie/Animation - verification.json";
import verifyingText from "../../assets/Lottie/Animation - verifyingText.json";
import { Container } from './Validation.styles';

export default function ValidationPage() {
  const { isSignedIn, user, isLoaded, sessionId } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useSession();
  useEffect(() => {
    const apiCaller = async () => {
      console.log("location", location);
      console.log("isSignedIn", isSignedIn, "user", user, "isLoaded", isLoaded, "sessionId", sessionId);
      // if (isSignedIn && isLoaded && user) {
      //   console.log("User:", user, "Session ID:", sessionId);

      try {

        if (user) {
          const data = await getUserByClerkId(user.id);
          console.log("hehe", user, session);
          localStorage.setItem("sessionId", JSON.stringify(session.id));
          if (data.data.user.user_role === "user") {
            if (data.data.user.profile_status === true) {

              navigate("/user", { state: session.id });
            } else {
              navigate("/personalInfo");
            }
          } else if (data.data.user.user_role === "admin") {

            navigate("/admin");
          }
        }
        console.log("location", location.state);
        const clerId = await getUserBySessionId({ sessionId: location.state.sessionId });
        // console.log(clerId);
        const data = await getUserByClerkId(clerId.userId);
        console.log("hehe", data.data);
        localStorage.setItem("sessionId", JSON.stringify(location.state.sessionId));
        if (data.data.user.user_role === "user") {
          if (data.data.user.profile_status === true) {

            navigate("/user", { state: location.state.sessionId });
          } else {
            navigate("/personalInfo");
          }
        } else if (data.data.user.user_role === "admin") {

          navigate("/admin");
        }
        // console.log(data.data.user.user_role ,"mslksk");

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    // };

    // Only call the API if the user is signed in and loaded
    // if (isSignedIn && isLoaded) {
    apiCaller();
    // }

  }, [user, isSignedIn, isLoaded]); // Add dependencies to re-run the effect when values change

  // Optional: Show a loading indicator while the user data is being loaded
  if (!isLoaded || !isSignedIn || !sessionId) {
    return <Container >
      <Lottie
        className="Lottie"
        animationData={verifying}
        loop={true}
        style={{ width: "90%", height: "20%" }}
      />
      <Lottie
        className="Lottie"
        animationData={verifyingText}
        loop={true}
        style={{ width: "40%", height: "20%" }}
      />
    </Container>;
  }

  return <></>;
}
