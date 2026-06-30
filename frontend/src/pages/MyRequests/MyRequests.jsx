import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import RequestCard from "../../components/request/RequestCard";
import { getPendingRequests } from "../../services/requestService";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getPendingRequests();

      setRequests(data.requests);
    } catch (error) {
      toast.error("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Pending Requests
      </h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">📩</div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            No Pending Requests
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            You don't have any pending requests to join your ride baskets.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {requests.map((request) => (
            <RequestCard
    key={request._id}
    request={request}
    onActionComplete={fetchRequests}
/>
          ))}

        </div>
      )}

    </div>
  );
};

export default MyRequests;