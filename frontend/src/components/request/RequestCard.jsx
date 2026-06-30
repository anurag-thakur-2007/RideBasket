import { toast } from "react-toastify";
import {
  FaCheck,
  FaTimes,
  FaMale,
  FaFemale,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

import {
  acceptRequest,
  rejectRequest,
} from "../../services/requestService";

const RequestCard = ({
  request,
  onActionComplete,
}) => {
  const handleAccept = async () => {
    try {
      const data = await acceptRequest(
        request._id
      );

      toast.success(data.message);

      if (onActionComplete) {
        onActionComplete();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to accept request."
      );
    }
  };

  const handleReject = async () => {
    try {
      const data = await rejectRequest(
        request._id
      );

      toast.success(data.message);

      if (onActionComplete) {
        onActionComplete();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reject request."
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden transition-all duration-300">

      {/* Header - Premium Gradient */}
      <div className="bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 text-white px-8 py-5 flex justify-between items-center relative overflow-hidden">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            {request.requesterId.name}
          </h2>
          <p className="text-xs text-blue-100/90 font-medium mt-0.5">
            {request.requesterId.phone}
          </p>
        </div>
        <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-white border border-white/20">
          Request Pending
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">

        {/* Route Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-green-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">Pickup</p>
              <span className="font-semibold text-slate-800 text-sm">{request.basketId.pickupPoint}</span>
            </div>
          </div>

          <div className="ml-2.5 my-2.5 border-l-2 border-dashed h-6 border-slate-200"></div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-red-600 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">Destination</p>
              <span className="font-semibold text-slate-800 text-sm">{request.basketId.destination}</span>
            </div>
          </div>
        </div>

        {/* Date Time info */}
        <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <FaCalendarAlt className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">
              {new Date(request.basketId.travelDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <FaClock className="text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">
              {request.basketId.travelTime}
            </span>
          </div>
        </div>

        {/* Passengers list */}
        <div>
          <h3 className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-3">
            Requester Passengers ({request.passengers.length})
          </h3>

          <div className="grid gap-2">
            {request.passengers.map((passenger, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-slate-50 border border-slate-100/50 rounded-xl px-4 py-3 text-sm"
              >
                <span className="font-semibold text-slate-700">
                  {passenger.name}
                </span>

                <span className="flex items-center gap-1.5 font-bold text-slate-600">
                  {passenger.gender === "Male" ? (
                    <FaMale className="text-blue-500" />
                  ) : (
                    <FaFemale className="text-pink-500" />
                  )}
                  {passenger.gender}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleAccept}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            <FaCheck />
            Accept Request
          </button>

          <button
            onClick={handleReject}
            className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            <FaTimes />
            Reject
          </button>
        </div>

      </div>

    </div>
  );
};

export default RequestCard;