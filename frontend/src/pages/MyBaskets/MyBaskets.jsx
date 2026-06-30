import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import BasketCard from "../../components/basket/BasketCard";
import { getMyBaskets } from "../../services/basketService";

const MyBaskets = () => {
  const [baskets, setBaskets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBaskets();
  }, []);

  const fetchMyBaskets = async () => {
    try {
      const data = await getMyBaskets();

      setBaskets(data.baskets);
    } catch (error) {
      toast.error("Failed to load baskets.");
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
        My Baskets
      </h1>

      {baskets.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🚕</div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            No Baskets Created
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            You haven't created any ride baskets yet. Create one to share your journey!
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">

          {baskets.map((basket) => (
            <BasketCard
              key={basket._id}
              basket={basket}
            />
          ))}

        </div>
      )}

    </div>
  );
};

export default MyBaskets;