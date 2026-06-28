import mongoose from "mongoose";

const basketSchema = new mongoose.Schema(
  {
    // Basket Creator
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Location Details
    city: {
      type: String,
      required: true,
      trim: true,
    },

    pickupPoint: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    // Travel Details
    travelDate: {
      type: Date,
      required: true,
    },

    travelTime: {
      type: String,
      required: true,
    },

    // Vehicle Details
    cabType: {
      type: String,
      enum: [
        "Swift Dzire",
        "Ertiga",
        "Eeco",
        "Innova",
        "Auto",
        "Other",
      ],
      required: true,
    },

    // Seating Details
    totalSeats: {
      type: Number,
      required: true,
      min: 2,
      max: 12,
    },

    // Creator decides how many passengers they want
    requiredPassengers: {
      type: Number,
      required: true,
      min: 1,
    },

    // Creator is counted automatically
    confirmedPassengers: {
      type: Number,
      default: 1,
    },

    confirmedMaleCount: {
      type: Number,
      default: 0,
    },

    confirmedFemaleCount: {
      type: Number,
      default: 0,
    },

    // Approximate Cost
    approxCostPerPerson: {
      type: Number,
      required: true,
      min: 0,
    },

    // Joining Preference
    joinPreference: {
      type: String,
      enum: ["Anyone", "Boys Only", "Girls Only"],
      default: "Anyone",
    },

    // Additional Notes
    notes: {
      type: String,
      default: "",
      maxlength: 300,
      trim: true,
    },

    // Basket Status
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },

    // Analytics
    views: {
      type: Number,
      default: 0,
    },

    whatsappClicks: {
      type: Number,
      default: 0,
    },

    joinRequests: {
      type: Number,
      default: 0,
    },

    acceptedRequests: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Basket = mongoose.model("Basket", basketSchema);

export default Basket;