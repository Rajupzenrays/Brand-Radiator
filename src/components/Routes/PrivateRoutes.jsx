//@ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  let location = useLocation();
  let navigate = useNavigate();
  let isLoggedIn = window.localStorage.getItem("isLoggedIn");
//   userDetails = JSON.parse(userDetails);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  console.log();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}
export default PrivateRoute;
