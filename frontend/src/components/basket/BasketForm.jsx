import { useState } from "react";
import { toast } from "react-toastify";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { LOCATIONS } from "../../data/locations"; // STEP 1: Imported LOCATIONS

const BasketForm = ({
  initialValues = {},
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    pickupPoint: initialValues.pickupPoint || "",
    destination: initialValues.destination || "",
    travelDate: initialValues.travelDate || "",
    travelTime: initialValues.travelTime || "",
    cabType: initialValues.cabType || "Not Decided Yet",
    totalSeats: initialValues.totalSeats || "",
    requiredPassengers: initialValues.requiredPassengers || "",
    approxCostPerPerson: initialValues.approxCostPerPerson || "",
    joinPreference: initialValues.joinPreference || "Anyone",
    notes: initialValues.notes || "",
    maleFriends: initialValues.maleFriends || 0,
    femaleFriends: initialValues.femaleFriends || 0,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.pickupPoint ||
      !formData.destination ||
      !formData.travelDate ||
      !formData.travelTime ||
      !formData.totalSeats ||
      !formData.requiredPassengers ||
      !formData.approxCostPerPerson
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (
      Number(formData.requiredPassengers) >
      Number(formData.totalSeats)
    ) {
      toast.error("Required passengers cannot exceed total seats.");
      return;
    }

    // STEP 4: Added validation for matching pickup and destination points
    if (formData.pickupPoint === formData.destination) {
      toast.error("Pickup and Destination cannot be the same.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 lg:p-12 space-y-8"
    >
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Create Basket
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {/* STEP 2: Replaced Pickup Point Input with Select */}
        <Select
          label="Pickup Point"
          name="pickupPoint"
          value={formData.pickupPoint}
          onChange={handleChange}
        >
          <option value="">Select Pickup Point</option>
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </Select>

        {/* STEP 3: Replaced Destination Input with Select */}
        <Select
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
        >
          <option value="">Select Destination</option>
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </Select>

        <Input
          label="Travel Date"
          type="date"
          name="travelDate"
          value={formData.travelDate}
          onChange={handleChange}
          required
        />

        <Input
          label="Travel Time"
          type="time"
          name="travelTime"
          value={formData.travelTime}
          onChange={handleChange}
          required
        />

        <Select
          label="Cab Type"
          name="cabType"
          value={formData.cabType}
          onChange={handleChange}
        >
          <option>Not Decided Yet</option>
          <option>Swift Dzire</option>
          <option>Ertiga</option>
          <option>Eeco</option>
          <option>Innova</option>
          <option>Auto</option>
          <option>Other</option>
        </Select>

        <Input
          label="Total Seats"
          type="number"
          name="totalSeats"
          value={formData.totalSeats}
          onChange={handleChange}
          placeholder="4"
          required
        />

        <Input
          label="Passengers Needed"
          type="number"
          name="requiredPassengers"
          value={formData.requiredPassengers}
          onChange={handleChange}
          placeholder="3"
          required
        />

        <Input
          label="Male Friends Already Travelling"
          type="number"
          name="maleFriends"
          value={formData.maleFriends}
          onChange={handleChange}
          min="0"
        />

        <Input
          label="Female Friends Already Travelling"
          type="number"
          name="femaleFriends"
          value={formData.femaleFriends}
          onChange={handleChange}
          min="0"
        />
        
        <Input
          label="Approximate Cost Per Person (₹)"
          type="number"
          name="approxCostPerPerson"
          value={formData.approxCostPerPerson}
          onChange={handleChange}
          placeholder="250"
          required
        />

        <Select
          label="Join Preference"
          name="joinPreference"
          value={formData.joinPreference}
          onChange={handleChange}
        >
          <option>Anyone</option>
          <option>Boys Only</option>
          <option>Girls Only</option>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          Additional Notes
        </label>
        <textarea
          name="notes"
          rows="4"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional instructions..."
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-base outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 resize-none bg-white"
        />
      </div>

      <div className="pt-4">
        <Button type="submit" loading={loading} className="w-full">
          Create Basket
        </Button>
      </div>
    </form>
  );
};

export default BasketForm;