import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BasketForm from "../../components/basket/BasketForm";
import { createBasket } from "../../services/basketService";

const CreateBasket = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreateBasket = async (formData) => {
    try {
      setLoading(true);

      const data = await createBasket(formData);

      toast.success(
        data.message || "Basket created successfully."
      );

      navigate("/home");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create basket."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ Replace max-w-5xl with w-full to prevent layout clipping and allow uniform full-width alignment
    <div className="w-full">

      <BasketForm
        onSubmit={handleCreateBasket}
        loading={loading}
      />

    </div>
  );
};

export default CreateBasket;