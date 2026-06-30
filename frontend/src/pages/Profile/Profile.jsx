import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../context/AuthContext";
import { getProfile } from "../../services/authService";

import {
  FaUser,
  FaPhone,
  FaVenusMars,
  FaSignOutAlt,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setUser(data.user);
    } catch (error) {
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully.");

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden transition-all duration-300">
        
        {/* Header - Premium Gradient */}
        <div className="bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 text-white p-8 sm:p-10 text-center relative overflow-hidden">
          {/* Subtle background decorative shapes */}
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 rounded-full bg-blue-300/10 blur-xl pointer-events-none" />

          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/40 text-white flex items-center justify-center mx-auto mb-4 shadow-inner relative z-10 transition-transform duration-300 hover:scale-105">
            <FaUser size={42} />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight relative z-10">
            {user?.name}
          </h1>

          <p className="mt-2 text-blue-100 font-semibold text-sm tracking-wider uppercase relative z-10">
            RideBasket Member
          </p>
        </div>

        {/* Details Section */}
        <div className="p-6 sm:p-10 space-y-8">
          
          <div className="grid gap-6">
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100/60 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <FaUser className="text-blue-600 text-lg" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Full Name
                </p>
                <p className="font-extrabold text-slate-800 text-base mt-0.5">
                  {user?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100/60 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <FaPhone className="text-green-600 text-lg" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Phone Number
                </p>
                <p className="font-extrabold text-slate-800 text-base mt-0.5">
                  {user?.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100/60 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                <FaVenusMars className="text-pink-600 text-lg" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  Gender
                </p>
                <p className="font-extrabold text-slate-800 text-base mt-0.5">
                  {user?.gender}
                </p>
              </div>
            </div>
          </div>

          {/* Statistics (V2 Placeholder) */}
          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-lg font-extrabold text-slate-900 mb-4 tracking-tight">
              Ride Statistics
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-5 text-center">
                <p className="text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-2 py-1 inline-block">
                  Coming Soon
                </p>
                <p className="text-slate-500 font-semibold text-xs mt-3 uppercase tracking-wider">
                  Baskets Created
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-5 text-center">
                <p className="text-sm font-bold text-green-600 bg-green-50 border border-green-100 rounded-lg px-2 py-1 inline-block">
                  Coming Soon
                </p>
                <p className="text-slate-500 font-semibold text-xs mt-3 uppercase tracking-wider">
                  Rides Joined
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-98"
            >
              <FaSignOutAlt />
              Logout from Account
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;