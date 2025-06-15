import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { getUserByClerkId } from "../api/userApi";
import { useClerk } from "@clerk/clerk-react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/Lottie/loading_animation.json";

const ProtectedRoute = ({ Component, roles }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const { signOut } = useClerk();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("ProtectedRoute useEffect isSignedIn:", isSignedIn, "user:", user, "isLoaded:", isLoaded);
        // console.log("component", Component, "roles", roles);
        if (!isSignedIn || !user || !isLoaded) {
          setRedirectPath(null);
          // console.log("Not signed in");
          setLoading(true);
          return;
        }

        const userResponse = await getUserByClerkId(user.id);
        const userRole = userResponse.data.user.user_role;
        console.log("userRole jbjashgjh", userResponse.data.user.subscription_status);
        // console.log("userRole", userRole, "roles", roles, "roles && !roles.includes(userRole)", roles.length > 0 && !roles.includes(userRole));
        if (roles.length > 0 && !roles.includes(userRole)) {
          // console.log("Not authorized");
          localStorage.clear();
          if (userRole === "admin") {
            setRedirectPath("/admin");
          } else if (userRole === "user") {
            console.log("userResponse.data.user.subscription_status", userResponse.data.user.subscription_status);
            if(userResponse.data.user.subscription_status === "active"){
              setRedirectPath("/user");
            }else{
              setRedirectPath("/subscription");
            }
            
          } else {
            await signOut();
            setRedirectPath("/login");
          }
          return;
        } else {
          // console.log("Authorized");


          setAuthorized(true);

        }

        // Clear redirect path if authorized
        setRedirectPath(null);
      } catch (err) {
        // console.error("Error:", err);
        setRedirectPath("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isSignedIn, user, roles, , isLoaded, signOut]);

  if (loading) {
    // console.log("loading");
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <Lottie
      className="Lottie"
      animationData={loadingAnimation}
      loop={true}
      style={{ width: "100%", height: "100%" }}
    />
  </div>
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }
  if (authorized) {
    return <Component />;
  }

  // Only render component when authorized
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <Lottie
      className="Lottie"
      animationData={loadingAnimation}
      loop={true}
      style={{ width: "100%", height: "100%" }}
    />
  </div>

};

export default ProtectedRoute;