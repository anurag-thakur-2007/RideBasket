import Basket from "../models/Basket.js";

// ======================================
// Create Basket
// ======================================

export const createBasket = async (req, res) => {
  try {
    const {
      city,
      pickupPoint,
      destination,
      travelDate,
      travelTime,
      cabType,
      totalSeats,
      requiredPassengers,
      approxCostPerPerson,
      joinPreference,
      notes,
    } = req.body;

    // Validate required fields
    if (
      !city ||
      !pickupPoint ||
      !destination ||
      !travelDate ||
      !travelTime ||
      !cabType ||
      !totalSeats ||
      !requiredPassengers ||
      !approxCostPerPerson
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Creator gender count
    let confirmedMaleCount = 0;
    let confirmedFemaleCount = 0;

    if (req.user.gender === "Male") {
      confirmedMaleCount = 1;
    } else {
      confirmedFemaleCount = 1;
    }

    // Create Basket
    const basket = await Basket.create({
      creatorId: req.user._id,
      city,
      pickupPoint,
      destination,
      travelDate,
      travelTime,
      cabType,
      totalSeats,
      requiredPassengers,
      confirmedPassengers: 1,
      confirmedMaleCount,
      confirmedFemaleCount,
      approxCostPerPerson,
      joinPreference,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Basket created successfully.",
      basket,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Search Baskets
// ======================================

export const getBaskets = async (req, res) => {
  try {
    const baskets = await Basket.find({
      status: "Open",
    })
      .populate("creatorId", "name gender")
      .sort({ createdAt: -1 });

    const updatedBaskets = baskets.map((basket) => ({
      ...basket._doc,
      availableSeats:
        basket.requiredPassengers - basket.confirmedPassengers,
    }));

    res.status(200).json({
      success: true,
      count: updatedBaskets.length,
      baskets: updatedBaskets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};