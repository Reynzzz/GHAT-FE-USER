import { useEffect } from "react";
import Icons from "feather-icons-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  toggleUsertype,
} from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { sideLinks } from "../../data/sideLinks";
import Logo from "../Logo";
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon

const SideBar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const { userType } = useSelector((state) => state.userType);
  const { userCategory } = useSelector((state) => state.userType);
  // console.log(userCategory, 'user category');

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        dispatch(closeSidebar()); // Close sidebar if in mobile view
      } else {
        dispatch(openSidebar()); // Open sidebar if in desktop view
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const handleClick = () => {
    if (window.innerWidth <= 640) {
      dispatch(toggleSidebar());
      localStorage.setItem("sidebarOpen", String(!isOpen)); // Save sidebar status in localStorage
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    dispatch(toggleUsertype());
    window.location.reload();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-20 h-full w-72 bg-blue-500 sm:w-72 max-sm:w-8/12 grid grid-rows-12 grid-flow-col px-2 sm:pt-10">
          <div className="flex w-full justify-end pr-1 pt-1 max-sm:row-span-1 sm:hidden">
            <div className="hover:cursor-pointer" onClick={handleClick}>
              <Icons icon="x" size={32} strokeWidth={3} color="white" />
            </div>
          </div>
          <div className="flex flex-col items-center max-sm:row-span-3 sm:row-span-4">
            <Logo
              imageProps="max-sm:h-32 h-[120px]  pb-2"
              h1Props="text-xl font-bold text-center text-white"
              h4Props="text-sm italic font-semibold text-center text-yellow-200"
            />
          </div>
          {sideLinks
            .filter((link) => link.userType.includes(userType))
            .filter((link) => link.userCategory.includes(userCategory))
            .map((link) => (
              <NavLink
                to={link.to}
                key={link.to}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "btn btn-ghost flex justify-start text-white font-bold bg-green-400 hover:bg-green-400"
                      : "btn btn-ghost flex justify-start text-white font-bold"
                  }`
                }
                onClick={handleClick}
              >
                <Icons icon={link.icon} />
                <div className="text-lg">{link.label}</div>
              </NavLink>
            ))}
          <div className="p-4 mt-auto cursor-pointer flex items-center" onClick={handleLogout}>
            <button className="flex items-center ml-1 text-white font-bold text-lg">
              <FaSignOutAlt size={25} className="mr-2" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
