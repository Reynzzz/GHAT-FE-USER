import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute() {
  const userType = useSelector((state) => state.userType);
  const isLogging = userType.isLogging;
  // console.log(userType.userType, "blalblla");
  return isLogging && userType.userType !== "" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectRoute;
