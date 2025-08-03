import { useState, useEffect, useRef } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { Logo } from "../../assets/images/index";

interface Props {
  children: React.ReactNode;
}

const UserLayout: React.FC<Props> = ({ children }) => {
  const Menus = [
    { id: 1, name: "Book Appointment", path: "/appointment" },
    { id: 2, name: "Find programs", path: "/cart" },
    { id: 3, name: "Guides", path: "/guide" },
  ];

  const [user, setUser] = useState<{ fullname: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.clear(); // Or remove only specific keys if needed
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/login"; // redirect to login page after logout
  };

  return (
    <div className="flex flex-col gap-4 px-[64px] m-auto max-w-[1440px]">
      {/* Header */}
      <div className="flex px-5 py-2.5 items-center bg-[#fff] w-full gap-[40px] justify-between">
        {/* Logo */}
        <div className="w-[100px] h-[60px]">
          <img className="w-full h-full object-contain" src={Logo} alt="logo" />
        </div>

        {/* Menu */}
        <ul className="flex items-center gap-4">
          {Menus.map((item) => (
            <li key={item.id} className="text-base leading-6">
              <a
                href={item.path}
                className="decoration-0 text-gray-700 hover:text-purple-600"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md bg-purple-50 rounded-full px-4 py-2 mx-6">
          <FaSearch className="text-purple-500 mr-3" />
          <input
            type="text"
            placeholder="Find a country, city or university"
            className="w-full bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Account Section with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-1 cursor-pointer select-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUser className="text-lg" />
            <span>{user?.fullname || "Account"}</span>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-md z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default UserLayout;
