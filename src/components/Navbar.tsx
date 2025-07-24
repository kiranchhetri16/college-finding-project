import React from "react";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <header className="w-full px-4 py-3 flex items-center justify-between bg-white shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        {/* <img src="/logo.svg" alt="studee logo" className="h-6" /> */}
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

      {/* Right: Icons & Actions */}
      <div className="flex items-center space-x-5 text-sm font-medium text-purple-900">
        
        <div className="flex items-center space-x-1">
          <FaUser className="text-lg" />
          <span>Account</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaBars className="text-lg" />
          <span>Menu</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
