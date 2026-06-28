import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    isRequester: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const requestSchema = new mongoose.Schema(
  {
    basketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Basket",
      required: true,
    },

    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    passengers: {
      type: [passengerSchema],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one passenger is required.",
      },
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },

    contactedOnWhatsapp: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;