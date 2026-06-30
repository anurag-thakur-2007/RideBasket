import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaInbox,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const getLinkClass = (path) => {
    return `flex items-center gap-2 min-h-[44px] w-full md:w-auto px-3 rounded-xl transition-all font-medium ${
      isActive(path)
        ? "bg-white/15 text-white"
        : "text-blue-100 hover:bg-white/10 hover:text-white"
    }`;
  };

  const getMobileLinkClass = (path) => {
    return `flex items-center gap-3 min-h-[44px] w-full px-4 py-2 rounded-xl transition-all font-medium ${
      isActive(path)
        ? "text-blue-600 bg-blue-50"
        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 shadow-md border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="flex items-center justify-between h-16 min-w-0">
          
          <Link to="/home" className="flex items-center gap-3 shrink-0 min-w-0">
            <img
              src={logo}
              alt="RideBasket"
              className="h-12 w-12 object-contain"
            />
            <div className="leading-tight">
              <h1 className="text-2xl font-bold text-white">RideBasket</h1>
              <p className="text-xs text-blue-100 hidden sm:block">VIT Ride Sharing</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 lg:gap-3 min-w-0 shrink">
            <Link to="/home" className={getLinkClass("/home")}>
              <FaHome className="shrink-0" />
              Home
            </Link>

            {isAuthenticated && (
              <>
                <Link to="/create-basket" className={getLinkClass("/create-basket")}>
                  <FaPlusCircle className="shrink-0" />
                  Create
                </Link>

                <Link to="/my-baskets" className={getLinkClass("/my-baskets")}>
                  <FaClipboardList className="shrink-0" />
                  My Baskets
                </Link>

                <Link to="/my-requests" className={getLinkClass("/my-requests")}>
                  <FaInbox className="shrink-0" />
                  Requests
                </Link>

                <Link to="/profile" className={`${getLinkClass("/profile")} gap-2.5`}>
                  <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-semibold text-sm shrink-0 shadow-sm">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="truncate text-white hidden lg:block">
                    {user?.name || "Profile"}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 min-h-[44px] px-3 text-white hover:bg-red-500/20 hover:text-white rounded-xl transition-colors font-medium shrink-0"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to="/login" className={getLinkClass("/login")}>
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-50 transition shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white text-2xl focus:outline-none hover:bg-white/10 rounded-xl transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 sm:px-5 py-5 space-y-1 flex flex-col w-full">
            
            <Link 
              to="/home" 
              onClick={() => setMobileMenuOpen(false)} 
              className={getMobileLinkClass("/home")}
            >
              <FaHome className="text-lg" />
              Home
            </Link>

            {isAuthenticated && (
              <>
                <Link 
                  to="/create-basket" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={getMobileLinkClass("/create-basket")}
                >
                  <FaPlusCircle className="text-lg" />
                  Create
                </Link>

                <Link 
                  to="/my-baskets" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={getMobileLinkClass("/my-baskets")}
                >
                  <FaClipboardList className="text-lg" />
                  My Baskets
                </Link>

                <Link 
                  to="/my-requests" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={getMobileLinkClass("/my-requests")}
                >
                  <FaInbox className="text-lg" />
                  Requests
                </Link>

                <Link 
                  to="/profile" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`${getMobileLinkClass("/profile")} min-w-0`}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs shrink-0">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="truncate">{user?.name || "Profile"}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 min-h-[44px] px-4 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium mt-2 pt-2 border-t border-slate-200 w-full text-left rounded-xl"
                >
                  <FaSignOutAlt className="text-lg" />
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <div className="pt-2 border-t border-slate-200 flex flex-col gap-3">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={getMobileLinkClass("/login")}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition text-center shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;