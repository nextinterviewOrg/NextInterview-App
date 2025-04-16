import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Unauthorized from "../components/Unauthorized/Unauthorized";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { getUserByClerkId } from "../api/userApi";

// Usage: <Route element={<ProtectedRoute roles={["admin"]} />}>
//           <Route path="..." element={<... />} />
//        </Route>

const ProtectedRoute = ({ roles = [] }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      let role = user?.publicMetadata?.user_role || user?.unsafeMetadata?.user_role;
      if (role) {
        setUserRole(role);
        setChecked(true);
        return;
      }
      try {
        const backendUser = await getUserByClerkId(user.id);
        role = backendUser?.data?.user?.user_role;
        setUserRole(role);
      } catch {
        setUserRole(null);
      }
      setChecked(true);
    };
    fetchRole();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || !checked) return null;

  if (!isSignedIn) {
    localStorage.setItem("redirectUrl", location.pathname);
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0) {
    if (!userRole) return <Unauthorized />;
    if (!roles.includes(userRole)) return <Unauthorized />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string)
};

export default ProtectedRoute;