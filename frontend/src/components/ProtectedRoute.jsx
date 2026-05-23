import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (user.role === "penjual") {
      return <Navigate to="/penjual/dashboard" replace />;
    }

    if (user.role === "pembeli") {
      return <Navigate to="/pembeli/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;