import Basket from "../models/Basket.js";

// ======================================
// Create Basket
// ======================================

export const createBasket = async (req, res) => {
  try {
    const {
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
      maleFriends = 0,
      femaleFriends = 0,
    } = req.body;

    // Validate required fields
    if (
      !pickupPoint ||
      !destination ||
      !travelDate ||
      !travelTime ||
      !totalSeats ||
      !requiredPassengers ||
      !approxCostPerPerson
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Creator + friends gender count calculation
    let confirmedMaleCount =
      req.user.gender === "Male"
        ? 1 + Number(maleFriends)
        : Number(maleFriends);

    let confirmedFemaleCount =
      req.user.gender === "Female"
        ? 1 + Number(femaleFriends)
        : Number(femaleFriends);

    const confirmedPassengers =
      confirmedMaleCount +
      confirmedFemaleCount;

    // Create Basket
    const basket = await Basket.create({
      creatorId: req.user._id,
      pickupPoint,
      destination,
      travelDate,
      travelTime,
      cabType,
      totalSeats,
      requiredPassengers,
      confirmedPassengers,
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
      availableSeats: basket.requiredPassengers,
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

// ======================================
// Get Basket By ID
// ======================================

export const getBasketById = async (req, res) => {
  try {
    const { id } = req.params;

    const basket = await Basket.findById(id)
      .populate("creatorId", "name phone gender");

    if (!basket) {
      return res.status(404).json({
        success: false,
        message: "Basket not found.",
      });
    }

    const updatedBasket = {
      ...basket._doc,
      availableSeats: basket.requiredPassengers,
    };

    return res.status(200).json({
      success: true,
      basket: updatedBasket,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Get My Baskets
// ======================================

export const getMyBaskets = async (req, res) => {
  try {
    const baskets = await Basket.find({
      creatorId: req.user._id,
    })
      .sort({ createdAt: -1 });

    const updatedBaskets = baskets.map((basket) => ({
      ...basket._doc,
      availableSeats: basket.requiredPassengers,
    }));

    return res.status(200).json({
      success: true,
      count: updatedBaskets.length,
      baskets: updatedBaskets,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};