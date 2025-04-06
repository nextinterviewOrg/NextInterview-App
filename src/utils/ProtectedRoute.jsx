import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserByClerkId, getUserBySessionId } from "../api/userApi";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, roles = [] }) => {
  const { isSignedIn, user, isLoaded, sessionId } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoaded) {
          return; // Wait for Clerk to load
        }

        if (!isSignedIn) {
          setError("Not signed in");
          return;
        }

        const sessions = await user?.getSessions();
        const sessionVar = sessionId || 
          (sessions && sessions.length > 0 ? sessions[0].id : null) || 
          JSON.parse(localStorage.getItem("sessionId"));

        if (!sessionVar) {
          setError("No session found");
          return;
        }

        // Fetch user ID based on session ID
        const userId = await getUserBySessionId({ sessionId: sessionVar });
        if (!userId?.userId) {
          setError("Invalid user data");
          return;
        }

        // Fetch user data based on user ID
        const userResponse = await getUserByClerkId(userId.userId);
        if (!userResponse || !userResponse.data) {
          setError("User not found");
          return;
        }

        // Extract user data from the response
        const userData = userResponse.data.user;
        setUserData(userData);

        // Check role-based access
        if (roles.length > 0) {
          // Check if the user has the required role
          const userRole = userData.user_role || "user";
          if (!roles.includes(userRole)) {
            setError("Unauthorized access");
            return;
          }
        }

        setError(null);
      } catch (err) {
        console.error("Error in ProtectedRoute:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded, isSignedIn, user, sessionId, roles]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  if (error) {
    // Store the attempted URL for redirect after login
    localStorage.setItem("redirectUrl", location.pathname);
    
    if (error === "Unauthorized access") {
      return <Navigate to="/unauthorized" replace />;
    }
    
    return <Navigate to="/login" replace />;
  }

  return <Component userData={userData} />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string)
};

export default ProtectedRoute;
