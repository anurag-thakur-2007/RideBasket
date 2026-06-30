import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BasketCard = ({ basket, onJoin }) => {
  const navigate = useNavigate();

  return (
    // ✅ Update 1 & 15: Added group animations, translate transitions, and smooth pointer cursors
    <div className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">

      {/* ✅ Update 2: Refactored header layout padding and color weights */}
      <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">

        <div>
          {/* ✅ Update 3: Shifted creator label values to a strong text-xl slate-900 look */}
          <h2 className="text-xl font-bold text-slate-900">
            {basket.creatorId?.name}
          </h2>

          {/* ✅ Update 13: Inserted professional descriptor anchor below the user name */}
          <p className="text-xs text-slate-400 mt-1">
            Ride Organizer
          </p>

          {/* ✅ Update 4: Applied standard text transformation to ensure capitalized gender layout rules */}
          <p className="text-sm text-slate-500 capitalize mt-1">
            {basket.creatorId?.gender}
          </p>
        </div>

        {/* ✅ Update 5: Upgraded cab item badge frame with micro border values and clear scaling colors */}
        <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 border border-blue-100 shadow-sm">
          {basket.cabType}
        </span>

      </div>

      {/* ✅ Update 6: Increased core padding margins inside the route section container */}
      <div className="px-6 py-6">

        {/* ✅ Update 14: Swapped link separation gaps to gap-3 spacing scales */}
        <div className="flex items-center gap-3">

          <FaMapMarkerAlt className="text-green-600 shrink-0" />

          {/* ✅ Update 7: Formatted locations with tracking headers instead of raw inline structures */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Pickup
            </p>
            <span className="font-semibold text-slate-800">
              {basket.pickupPoint}
            </span>
          </div>

        </div>

        <div className="ml-2 my-2 h-6 border-l-2 border-dashed border-slate-300"></div>

        {/* ✅ Update 14: Swapped separation gaps to gap-3 spacing scales */}
        <div className="flex items-center gap-3">

          <FaMapMarkerAlt className="text-red-600 shrink-0" />

          {/* ✅ Update 7: Formatted destination values with tracking headers */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Destination
            </p>
            <span className="font-semibold text-slate-800">
              {basket.destination}
            </span>
          </div>

        </div>

      </div>

      {/* ✅ Update 8: Desktop expansion layout rules transforming data fields to 4 columns side-by-side */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 px-6 pb-6">

        <div className="flex items-center gap-3 text-slate-600">
          <FaCalendarAlt className="text-slate-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Date</p>
            <span className="text-sm font-semibold text-slate-800">
              {new Date(basket.travelDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <FaClock className="text-slate-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Time</p>
            <span className="text-sm font-semibold text-slate-800">{basket.travelTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <FaUsers className="text-slate-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Seats</p>
            <span className="text-sm font-semibold text-slate-800">
              {basket.availableSeats} Seats Left
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-semibold text-green-600">
          <FaRupeeSign className="text-green-500 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Cost</p>
            <span className="text-sm font-semibold text-slate-800 block">
              ₹{basket.approxCostPerPerson}
            </span>
          </div>
        </div>

      </div>

      {/* ✅ Update 10: Fixed divider partition values with custom horizontal slate bars */}
      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-5 bg-slate-50/50">

        {/* ✅ Update 11: Muted rose thematic color shifts for join criteria parameters */}
        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100/60 tracking-wide capitalize">
          {basket.joinPreference}
        </span>

        {/* ✅ Update 12: Action buttons updated with hover shadow transitions and font calibrations */}
        <button
          onClick={() => navigate(`/basket/${basket._id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 font-semibold shadow-sm transition-all duration-200 hover:shadow-md active:scale-98"
        >
          View Details
        </button>

      </div>

    </div>
  );
};

export default BasketCard;