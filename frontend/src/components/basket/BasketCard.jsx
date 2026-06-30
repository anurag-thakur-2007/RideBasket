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
    <div className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
      <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {basket.creatorId?.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ride Organizer
          </p>
          <p className="text-sm text-slate-500 capitalize mt-1">
            {basket.creatorId?.gender}
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 border border-blue-100 shadow-sm">
          {basket.cabType}
        </span>
      </div>

      <div className="px-6 py-6">
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-green-600 shrink-0" />
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

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-red-600 shrink-0" />
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

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 px-6 pb-6">
        <div className="flex items-center gap-3 text-slate-600">
          <FaCalendarAlt className="text-slate-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Date</p>
            <span className="text-sm font-semibold text-slate-800">
              {new Date(basket.travelDate).toLocaleDateString("en-GB", {
                timeZone: "UTC",
              })}
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

      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-5 bg-slate-50/50">
        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100/60 tracking-wide capitalize">
          {basket.joinPreference}
        </span>
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