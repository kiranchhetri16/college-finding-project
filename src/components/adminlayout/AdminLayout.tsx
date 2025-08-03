import { useState, useEffect, useRef, type ReactNode } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Logo, SidebarCollapsed } from "../../assets/images/index";

interface Props {
  children?: ReactNode;
}

interface MenuItem {
  id: string;
  name: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    label: "Dashboard",
    icon: "ri-dashboard-fill",
    path: "",
  },
  {
    id: "clientSettings",
    name: "User Management",
    label: "User Management",
    icon: "ri-account-circle-line",
    path: "/admin/manage-user",
  },
  {
    id: "moduleSettings",
    name: "Program",
    label: "Module Settings",
    icon: "ri-settings-3-line",
    path: "/admin/addprogram",
  },
  {
    id: "identityPermission",
    name: "Manage Appointment",
    label: "Appointment",
    icon: "ri-user-settings-line",
    path: "/admin/manage-appointment",
  },
];

const AdminLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleButton = () => {
    setShowProfile(!showProfile);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) setOpenDropdown(null);
  };

  const handleClick = (item: MenuItem) => {
    if (item.children) {
      if (!isCollapsed) {
        setOpenDropdown(openDropdown === item.id ? null : item.id);
      }
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  useEffect(() => {
    const loginState = localStorage.getItem("isLogin");
    setIsLoggedIn(!!loginState);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("isLogin");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <div
        className={`relative h-screen p-4 border border-[#F1F5F9] transition-all duration-200 bg-[#FFFFFF] ${
          isCollapsed ? "w-[80px]" : "w-[224px]"
        }`}
      >
        <div className="flex flex-col relative">
          <div className="flex items-center justify-between ">
            <div className="w-[80px]">
              <img src={Logo} className="w-full object-contain" alt="Logo" />
            </div>
            <img
              src={SidebarCollapsed}
              alt="Toggle"
              className="md:hidden block cursor-pointer absolute -right-5"
              onClick={toggleSidebar}
            />
            <div
              className="md:block hidden border border-[#E4E4E7] rounded-r-lg py-2 cursor-pointer hover:border-[#433D71] hover:text-[#433D71] transition-all duration-300 absolute -right-5 top-90"
              onClick={toggleSidebar}
            >
              <i className="ri-arrow-left-wide-line text-base"></i>
            </div>
          </div>

          <ul className="flex flex-col gap-[5px] mt-4">
            {menuItems.map((item) => {
              const isItemActive = isActive(item.path);

              return (
                <li key={item.id} className="flex flex-col relative group">
                  <div
                    onClick={() => handleClick(item)}
                    className={`flex justify-between items-center px-2 py-[6px] rounded-[4px] cursor-pointer hover:bg-gray-200 ${
                      isItemActive ? "bg-gray-300" : ""
                    }`}
                  >
                    <div className="flex gap-2 items-center text-sm font-semibold text-[#475569]">
                      <i className={`${item.icon} text-base`}></i>
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed && item.children && (
                      <i
                        className={`ri-arrow-${
                          openDropdown === item.id ? "down" : "right"
                        }-s-line text-base text-[#475569]`}
                      ></i>
                    )}
                  </div>

                  {isCollapsed && (
                    <span className="absolute -right-25 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                      {item.label}
                    </span>
                  )}

                  {!isCollapsed &&
                    openDropdown === item.id &&
                    item.children && (
                      <ul className="ml-8 mt-1 flex flex-col gap-1">
                        {item.children.map((subItem) => (
                          <li
                            key={subItem.id}
                            onClick={() => navigate(subItem.path)}
                            className={`flex gap-2 items-center text-sm font-medium text-[#475569] px-2 py-[6px] rounded-[4px] cursor-pointer hover:bg-gray-200 ${
                              isActive(subItem.path) ? "bg-gray-300" : ""
                            }`}
                          >
                            <i className={`${subItem.icon} text-base`}></i>
                            {subItem.label}
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col relative">
        <div className="flex justify-end h-[50px] px-10 items-center  cursor-pointer">
          <div
            className="relative flex justify-center items-center h-[30px] w-[30px] border border-[#675DA933] rounded-full"
            onClick={toggleButton}
          >
            <i className="ri-user-3-fill text-lg text-[#433D71]"></i>
          </div>
        </div>

        {showProfile && (
          <div
            ref={profileRef}
            className="absolute top-10 right-5 bg-white shadow-md rounded-md p-2 z-50 w-fit"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-normal font-inter text-[#52525B]">
                Name
              </h2>
              <div
                className="flex gap-[6px] text-base font-inter font-normal text-[#52525B] cursor-pointer"
                onClick={handleLogout}
              >
                Logout{" "}
                <span>
                  <i className="ri-logout-box-r-line text-base"></i>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main content render: either children or nested route */}
        <div className="flex-1 overflow-auto p-4">{children || <Outlet />}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
