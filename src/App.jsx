import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/dashboard/UserDashboard";
import UserSchedelu from "./pages/schedelu/UserSchedelu";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import UserTeacher from "./pages/teacher/UserTeacher";
import NotFound from "./pages/404/NotFound";
import Header from "./components/Header/Header";
import SideBar from "./components/Sidebar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import ProtectRoute from "./routes/ProtectRoute";
import AdminSchedelu from "./pages/schedelu/AdminSchedelu";
import AdminTeacher from "./pages/teacher/AdminTeacher";
import UserSettings from "./pages/settings/UserSettings";
import AdminSettings from "./pages/settings/AdminSettings";
import UserAbsenSchedule from "./pages/schedelu/UserAbsenSchedule";
import { useEffect } from "react";
import { setIsLogging, setUserType} from "./store/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ValidasiGuruJaga from "./pages/settings/ValidasiGuruJaga";
import CryptoJS from "crypto-js";  // Import CryptoJS
const Layout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-[290px] ml-0 overflow-x-hidden">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
function App() {
  const userType = useSelector((state) => state.userType);
  const dispatch = useDispatch();
  console.log(userType);
  
  useEffect(() => {
    const secretKey = "secret-key";
    
    // Fetch and decrypt the access token and user type from localStorage
    const isLogging = localStorage.getItem("access_token");
    const encryptedUserRole = localStorage.getItem("user");

    console.log(isLogging,'hjdawda');
    
    // Decrypt the data if it exists
    // const isLogging = encryptedAccessToken ? CryptoJS.AES.decrypt(encryptedAccessToken, secretKey).toString(CryptoJS.enc.Utf8) : null;
    const user = encryptedUserRole ? CryptoJS.AES.decrypt(encryptedUserRole, secretKey).toString(CryptoJS.enc.Utf8) : null;
   console.log(user,'dawdwa');
   console.log(isLogging);
   

    if (isLogging && user) {
      dispatch(setIsLogging(true));
      dispatch(setUserType(user));
   
    }
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {userType.isLogging && (
            <Route path="/" element={<Login />} />
          )}
          {userType.isLogging && (
            <Route element={<Layout />}>
              <Route element={<ProtectRoute />}>
                {userType.userType === "admin" && userType.userCategory === "Pengajar" ? (
                  <>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/schedelu" element={<AdminSchedelu />} />
                    <Route path="/teacher" element={<AdminTeacher />} />
                    <Route path="/validasi" element={<ValidasiGuruJaga />} />
                    <Route path="/settings" element={<AdminSettings />} />
                  </>
                ) : (
                  <></>
                )}

                {userType.userType === "User" && userType.userCategory === "Pengajar" ? (
                  <>
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/schedelu" element={<UserSchedelu />} />
                    <Route path="/teacher" element={<UserTeacher />} />
                    <Route path="/settings" element={<UserSettings />} />
                    <Route path="/absen" element={<UserAbsenSchedule />} />
                  </>
                ) : (
                  <></>
                )}

                {userType.userType === "User" && userType.userCategory === "Pengajar Dan Guru Jaga" ? (
                  <>
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/schedelu" element={<UserSchedelu />} />
                    <Route path="/teacher" element={<UserTeacher />} />
                    <Route path="/validasi" element={<ValidasiGuruJaga />} />
                    <Route path="/absen" element={<UserAbsenSchedule />} />
                  </>
                ) : (
                  <></>
                )}
              </Route>
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
