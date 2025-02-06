import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  // Redirect after a timeout
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeout);
    }
    if (localStorage.getItem("access_token")) {
      const timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-900">
      <div className="window-animation">
        <div className="loading-text text-center">
          <h2 className="mb-4 text-2xl font-bold dark:text-gray-50">Loading...</h2>
        </div>
        <div className="window-frame"></div>
      </div>
    </div>
  );
};

export default NotFound;
