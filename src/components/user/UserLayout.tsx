import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Logo } from "../../assets/images/index";
import { useNavigate, Link, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

type StoredUser = {
  fullname?: string;
  name?: string;
  email?: string;
  id?: number;
};

const UserLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const Menus = [
    { id: 1, name: "Book Appointment", path: "/appointment" },
    { id: 2, name: "Find programs", path: "/cart" },
    { id: 3, name: "Guides", path: "/guide" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // navbar search state
  const [navQuery, setNavQuery] = useState("");

  // ✅ helper: read q from URL
  const urlQ = (() => {
    const params = new URLSearchParams(location.search);
    return (params.get("q") || "").trim();
  })();

  // ✅ sync input with URL query (so /cart?q=nepal shows in input)
  useEffect(() => {
    setNavQuery(urlQ);
  }, [urlQ]);

  // Load login + user info
  useEffect(() => {
    const login = localStorage.getItem("isLogin") === "1";
    setIsLoggedIn(login);

    const storedUserStr = localStorage.getItem("user");
    const nameStr = localStorage.getItem("name");
    const emailStr = localStorage.getItem("email");

    let parsedUser: StoredUser | null = null;

    if (storedUserStr) {
      try {
        parsedUser = JSON.parse(storedUserStr);
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }

    const displayName =
      parsedUser?.fullname ||
      parsedUser?.name ||
      parsedUser?.email ||
      nameStr ||
      emailStr ||
      "";

    setUser({
      ...parsedUser,
      name: displayName || parsedUser?.name,
      email: parsedUser?.email || emailStr || undefined,
      fullname: parsedUser?.fullname || (displayName ? displayName : undefined),
    });
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

    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    setUser(null);
    setIsLoggedIn(false);
    setDropdownOpen(false);
    setMobileMenuOpen(false);

    window.location.href = "/login";
  };

  const handleLogin = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.location.href = "/login";
  };

  // ✅ Search
  const submitNavSearch = () => {
    const q = navQuery.trim();
    if (!q) return;

    setMobileSearchOpen(false);
    setMobileMenuOpen(false);

    navigate(`/cart?q=${encodeURIComponent(q)}`);
  };

  // ✅ Clear/reset
  const clearNavSearch = () => {
    setNavQuery("");
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);

    // remove query from url => show all
    navigate("/cart");
  };

  // ✅ input change handler (auto reset if empty)
  const handleNavInputChange = (val: string) => {
    setNavQuery(val);

    // if user clears input and currently is in /cart?q=..., reset
    if (val.trim() === "" && urlQ) {
      clearNavSearch();
    }
  };

  // ✅ button should show "Clear" when search is active (urlQ exists)
  const isSearchActive = Boolean(urlQ);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto px-4 md:px-8 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              to={"/"}
              className="w-[90px] h-[50px] md:w-[100px] md:h-[60px]"
            >
              <img
                className="w-full h-full object-contain"
                src={Logo}
                alt="logo"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            {Menus.map((item) => (
              <li key={item.id} className="text-base leading-6">
                <a href={item.path} className="text-gray-700 hover:text-purple-600">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center w-full max-w-md bg-purple-50 rounded-full px-4 py-2 mx-6">
            <FaSearch className="text-purple-500 mr-3" />
            <input
              type="text"
              value={navQuery}
              onChange={(e) => handleNavInputChange(e.target.value)}
              placeholder="Search college, city, faculty, country..."
              className="w-full bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  isSearchActive ? clearNavSearch() : submitNavSearch();
                }
              }}
            />

            {/* ✅ Toggle button Search/Clear */}
            {isSearchActive ? (
              <button
                type="button"
                onClick={clearNavSearch}
                className="ml-2 text-sm px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100"
              >
                Clear
              </button>
            ) : (
              <button
                type="button"
                onClick={submitNavSearch}
                className="ml-2 text-sm px-3 py-1 rounded-full bg-purple-600 text-white hover:bg-purple-700"
              >
                Search
              </button>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setMobileSearchOpen((p) => !p)}
              aria-label="Toggle Search"
            >
              <FaSearch />
            </button>

            {/* Account */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center gap-2 cursor-pointer select-none p-2 rounded hover:bg-gray-100"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <FaUser className="text-lg" />
                <span className="hidden sm:inline text-sm font-medium">
                  {isLoggedIn ? user?.fullname || user?.email || "Account" : "Account"}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-md z-50">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setMobileMenuOpen((p) => !p)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex items-center w-full bg-purple-50 rounded-full px-4 py-2">
              <FaSearch className="text-purple-500 mr-3" />
              <input
                type="text"
                value={navQuery}
                onChange={(e) => handleNavInputChange(e.target.value)}
                placeholder="Search college, city, faculty, country..."
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    isSearchActive ? clearNavSearch() : submitNavSearch();
                  }
                }}
              />

              {isSearchActive ? (
                <button
                  type="button"
                  onClick={clearNavSearch}
                  className="ml-2 text-xs px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  Clear
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitNavSearch}
                  className="ml-2 text-xs px-3 py-1 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                >
                  Go
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3">
            <ul className="flex flex-col gap-3">
              {Menus.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className="block py-2 text-gray-700 hover:text-purple-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-[88px] md:pt-[96px]">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
