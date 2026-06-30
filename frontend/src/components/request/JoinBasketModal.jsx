import { useState } from "react";
import { toast } from "react-toastify";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const JoinBasketModal = ({
  user,
  loading,
  onSubmit,
  onClose,
}) => {
  const [passengers, setPassengers] = useState([
    {
      name: user.name,
      gender: user.gender,
      isRequester: true,
    },
  ]);

  const addPassenger = () => {
    setPassengers((prev) => [
      ...prev,
      {
        name: "",
        gender: "",
        isRequester: false,
      },
    ]);
  };

  const removePassenger = (index) => {
    if (index === 0) return;

    setPassengers((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = [...passengers];

    updated[index][field] = value;

    setPassengers(updated);
  };

  const handleSubmit = () => {
    for (const passenger of passengers) {
      if (
        !passenger.name ||
        !passenger.gender
      ) {
        toast.error(
          "Please fill all passenger details."
        );

        return;
      }
    }

    onSubmit(passengers);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-bold">
              Join Basket
            </h2>

            <p className="text-slate-500 mt-1">
              Tell us who is travelling.
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl text-slate-500 hover:text-red-500"
          >
            ×
          </button>

        </div>

        <div className="space-y-6">

          {passengers.map(
            (passenger, index) => (
              <div
                key={index}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between items-center mb-4">

                  <h3 className="font-semibold text-lg">

                    {index === 0
                      ? "You"
                      : `Friend ${index}`}

                  </h3>

                  {index !== 0 && (
                    <button
                      onClick={() =>
                        removePassenger(index)
                      }
                      className="text-red-600 font-medium"
                    >
                      Remove
                    </button>
                  )}

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <Input
                    label="Name"
                    value={passenger.name}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    disabled={
                      passenger.isRequester
                    }
                  />

                  <Select
                    label="Gender"
                    value={passenger.gender}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "gender",
                        e.target.value
                      )
                    }
                    disabled={
                      passenger.isRequester
                    }
                  >
                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                  </Select>

                </div>

              </div>
            )
          )}
                    <button
            type="button"
            onClick={addPassenger}
            className="w-full border-2 border-dashed border-blue-300 text-blue-600 rounded-2xl py-3 hover:bg-blue-50 transition font-semibold"
          >
            + Add Friend
          </button>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <Button
            type="button"
            onClick={onClose}
            className="bg-slate-200 text-slate-700 hover:bg-slate-300"
          >
            Cancel
          </Button>

          <Button
            type="button"
            loading={loading}
            onClick={handleSubmit}
          >
            Send Request & Chat
          </Button>

        </div>

      </div>

    </div>
  );
};

export default JoinBasketModal;