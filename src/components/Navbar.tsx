import React, { useEffect, useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLogin") === "1");
  }, []);

  const handleLogout = () => {
    // remove only what you use (safe)
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    setIsLoggedIn(false);
    navigate("/login"); // your login route
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="w-full px-4 py-3 flex items-center justify-between bg-white shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-purple-700">Find Me</span>
      </div>

      {/* Center: Search */}
      <div className="flex items-center w-full max-w-md bg-purple-50 rounded-full px-4 py-2 mx-6">
        <FaSearch className="text-purple-500 mr-3" />
        <input
          type="text"
          placeholder="Find a country, city or university"
          className="w-full bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-5 text-sm font-medium text-purple-900">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 rounded-full border border-purple-600 text-purple-700 hover:bg-purple-50 transition"
          >
            Login
          </button>
        )}

        <div className="flex items-center space-x-2 cursor-pointer">
          <FaBars className="text-lg" />
          <span>Menu</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
