import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaClock,
  FaFemale,
  FaMale,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaUsers,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi"; // Added FiArrowLeft

import useAuth from "../../hooks/useAuth";

import {
  getBasketById,
} from "../../services/basketService";

import {
  joinBasket,
  markWhatsappClicked,
} from "../../services/requestService";

import JoinBasketModal from "../../components/request/JoinBasketModal";

const BasketDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialized navigate hook

  const [basket, setBasket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBasket();
  }, []);

  const fetchBasket = async () => {
    try {
      const data = await getBasketById(id);
      setBasket(data.basket);
    } catch (error) {
      toast.error("Basket not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (passengers) => {
    try {
      setJoining(true);

      const data = await joinBasket({
        basketId: basket._id,
        passengers,
      });

      toast.success(data.message);
      setShowModal(false);

      await markWhatsappClicked(data.request._id);

      const phone = data.creator.phone;
      const message = `Hi ${data.creator.name},\n\nI have sent a RideBasket request.\n\nRoute:\n${data.basket.pickupPoint} ➜ ${data.basket.destination}\n\nTravel Time:\n${new Date(
        data.basket.travelDate
      ).toLocaleDateString()} ${data.basket.travelTime}\n\nLet's discuss the ride.`;

      window.open(
        `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to join basket."
      );
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-xl font-medium text-slate-600">Loading...</div>;
  }

  if (!basket) {
    return <div className="text-center py-20 text-xl font-medium text-slate-600">Basket not found.</div>;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
        
        {/* Dynamic Back Button Stack */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow-md active:scale-95"
          >
            <FiArrowLeft className="text-lg" />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Main Details Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Header section layout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                Ride Organizer
              </p>
              <h1 className="text-3xl font-bold text-slate-900 mt-1">
                {basket.creatorId.name}
              </h1>
              <p className="text-sm text-slate-500 capitalize mt-1">
                {basket.creatorId.gender}
              </p>
            </div>
            
            <span className="self-start sm:self-center rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 border border-blue-100 shadow-sm">
              {basket.cabType || "Innova"}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-10">

            {/* Route timeline presentation */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-600 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Pickup</p>
                  <span className="font-semibold text-slate-800">{basket.pickupPoint}</span>
                </div>
              </div>

              <div className="ml-2 my-2 h-8 border-l-2 border-dashed border-slate-300"></div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-600 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Destination</p>
                  <span className="font-semibold text-slate-800">{basket.destination}</span>
                </div>
              </div>
            </div>

            {/* Core info metadata board split */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-2 border-y border-slate-100/80">
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
                  <span className="text-sm font-semibold text-slate-800">{basket.availableSeats} Seats Left</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-green-600">
                <FaRupeeSign className="text-green-500 shrink-0" />
                <div>
                  <span className="text-base font-bold text-slate-900 block leading-tight">
                    ₹{basket.approxCostPerPerson}
                  </span>
                  <p className="text-xs text-slate-500 font-normal">per person</p>
                </div>
              </div>
            </div>

            {/* Confirmed Passenger Breakdown boards */}
            <div>
              <h3 className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-3">
                Confirmed Passengers
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                  <FaMale className="text-blue-500 text-lg shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Male</p>
                    <p className="text-xl font-bold text-slate-800">{basket.confirmedMaleCount}</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                  <FaFemale className="text-rose-500 text-lg shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Female</p>
                    <p className="text-xl font-bold text-slate-800">{basket.confirmedFemaleCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cohesive Preference badge alignment */}
            <div>
              <h3 className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-2">
                Join Preference
              </h3>
              <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100/60 tracking-wide capitalize">
                {basket.joinPreference}
              </span>
            </div>

            {/* Context Notes Section Panel */}
            <div>
              <h3 className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-2">
                Notes
              </h3>
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {basket.notes || "No additional notes from organizer."}
                </p>
              </div>
            </div>

            {/* Interactive functional bottom CTA action */}
            {basket.creatorId._id !== user._id && (
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 text-base font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
              >
                Join Basket
              </button>
            )}

          </div>
        </div>
      </div>

      {showModal && (
        <JoinBasketModal
          user={user}
          basket={basket}
          loading={joining}
          onSubmit={handleJoin}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default BasketDetails;