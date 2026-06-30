import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import BasketCard from "../../components/basket/BasketCard";
import Loader from "../../components/common/Loader";

import { getAllBaskets } from "../../services/basketService";
import { LOCATIONS } from "../../data/locations";

const Home = () => {
  const { user } = useAuth();

  // All state declarations consolidated here
  const [baskets, setBaskets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBaskets, setFilteredBaskets] = useState([]);

  const [filters, setFilters] = useState({
    pickupPoint: "",
    destination: "",
    travelDate: "",
    gender: "",
  });

  useEffect(() => {
    fetchBaskets();
  }, []);

  const fetchBaskets = async () => {
    try {
      setLoading(true);
      const data = await getAllBaskets();

      setBaskets(data.baskets);
      setFilteredBaskets(data.baskets);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load baskets."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const applyFilters = () => {
    let result = [...baskets];

    if (filters.pickupPoint) {
      result = result.filter(
        (basket) => basket.pickupPoint === filters.pickupPoint
      );
    }

    if (filters.destination) {
      result = result.filter(
        (basket) => basket.destination === filters.destination
      );
    }

    if (filters.travelDate) {
      result = result.filter(
        (basket) =>
          new Date(basket.travelDate).toISOString().split("T")[0] ===
          filters.travelDate
      );
    }

    switch (filters.gender) {
      case "1girl":
        result = result.filter((basket) => basket.confirmedFemaleCount >= 1);
        break;
      case "2girls":
        result = result.filter((basket) => basket.confirmedFemaleCount >= 2);
        break;
      case "1boy":
        result = result.filter((basket) => basket.confirmedMaleCount >= 1);
        break;
      case "2boys":
        result = result.filter((basket) => basket.confirmedMaleCount >= 2);
        break;
      default:
        break;
    }

    setFilteredBaskets(result);
  };

  const clearFilters = () => {
    setFilters({
      pickupPoint: "",
      destination: "",
      travelDate: "",
      gender: "",
    });
    setFilteredBaskets(baskets);
  };

  const handleJoin = (basket) => {
    toast.info(`Joining ${basket.creatorId.name}'s basket`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-4">
      
      {/* ✅ Update 1 & 10: Hero Section rewritten with a wide gradient, professional stacked hierarchy, and no emojis */}
      <div className="bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm relative text-white flex flex-col items-start overflow-hidden">
        {/* Ambient lighting blobs in hero */}
        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[250px] h-[250px] rounded-full bg-blue-300/10 blur-[80px] pointer-events-none" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight relative z-10">
          Welcome back, <br />
          <span className="text-blue-100">{user?.name}</span>
        </h1>
        <p className="mt-4 text-blue-50 text-base md:text-lg max-w-xl font-medium relative z-10 leading-relaxed">
          Find students travelling on the same route and save on cab costs. Share a ride today!
        </p>
        <Link
          to="/create-basket"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-sm hover:bg-blue-50 hover:shadow-md transition-all active:scale-95 relative z-10"
        >
          <FaPlus />
          Create Basket
        </Link>
      </div>

      {/* Search Card styling overhaul with a clean border layer and 2xl heading scales */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">Find Your Ride</h2>

        {/* Grid layout for search inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <select
            name="pickupPoint"
            value={filters.pickupPoint}
            onChange={handleFilterChange}
            className="w-full min-w-0 min-h-[44px] h-12 sm:h-14 rounded-2xl border border-slate-300 bg-white px-4 sm:px-5 text-base outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Pickup Point</option>
            {LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            name="destination"
            value={filters.destination}
            onChange={handleFilterChange}
            className="w-full min-w-0 min-h-[44px] h-12 sm:h-14 rounded-2xl border border-slate-300 bg-white px-4 sm:px-5 text-base outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Destination</option>
            {LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="travelDate"
            value={filters.travelDate}
            onChange={handleFilterChange}
            className="w-full min-w-0 min-h-[44px] h-12 sm:h-14 rounded-2xl border border-slate-300 bg-white px-4 sm:px-5 text-base outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />

          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="w-full min-w-0 min-h-[44px] h-12 sm:h-14 rounded-2xl border border-slate-300 bg-white px-4 sm:px-5 text-base outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Gender Preference</option>
            <option value="1girl">At least 1 Girl</option>
            <option value="2girls">At least 2 Girls</option>
            <option value="1boy">At least 1 Boy</option>
            <option value="2boys">At least 2 Boys</option>
          </select>
        </div>

        {/* Action Handlers */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={applyFilters}
            className="w-full sm:w-auto min-h-[44px] h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 flex items-center justify-center gap-2 font-bold shadow-md transition-all active:scale-95"
          >
            <FaSearch />
            Search Rides
          </button>
          <button
            onClick={clearFilters}
            className="w-full sm:w-auto min-h-[44px] h-12 sm:h-14 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl px-8 font-bold transition-all active:scale-95"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* ✅ Update 6: Refactored Results header wrapper to standard 3xl bold variant */}
      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-3xl font-bold text-slate-900">Available Rides</h2>
        <p className="text-slate-500 font-medium text-sm">
          Showing {filteredBaskets.length} {filteredBaskets.length === 1 ? 'ride' : 'rides'}
        </p>
      </div>

      {/* Conditional Ride Listing */}
      {filteredBaskets.length === 0 ? (
        /* ✅ Update 8: Premium empty layout container utilizing taxi emojis, bold texts and explicit CTA redirections */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 md:p-16 text-center flex flex-col items-center">
          <div className="text-7xl">🚕</div>
          <h2 className="text-3xl font-semibold mt-5">No Baskets Available</h2>
          <p className="text-base text-slate-500 mt-2">
            Be the first one to create a basket.
          </p>
          <Link
            to="/create-basket"
            className="inline-flex mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Create Basket
          </Link>
        </div>
      ) : (
        /* ✅ Update 7: Wide grid expansion rules (grid-cols-1 lg:grid-cols-2) ensuring wide desktop layout scale formatting */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredBaskets.map((basket) => (
            <BasketCard
              key={basket._id}
              basket={basket}
              onJoin={handleJoin}
            />
          ))}
        </div>
      )}

      {/* ✅ Update 9: Extended desktop anchor spacing coordinates paired with micro-interaction scaling states */}
      <Link
        to="/create-basket"
        className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-xl sm:text-2xl shadow-xl transition-all hover:scale-105 active:scale-95 z-40"
        aria-label="Create basket"
      >
        <FaPlus />
      </Link>
    </div>
  );
};

export default Home;