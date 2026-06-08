import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { RoleId } from "../../types/auth.types";

interface PrivateRouteProps {
  allowedRoles?: RoleId[];
}

export function PrivateRoute({ allowedRoles }: PrivateRouteProps) {

  const { isAuth, role, dashboardPath } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (role === null || !allowedRoles.includes(role))) {
    return <Navigate to={dashboardPath} replace />;
  }

  return <Outlet />;
}