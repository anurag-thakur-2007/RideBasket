import Basket from "../models/Basket.js";
import Request from "../models/Request.js";
import User from "../models/User.js";

// ======================================
// Join Basket
// ======================================

export const joinBasket = async (req, res) => {
  try {
    const { basketId, passengers } = req.body;

    if (!basketId || !passengers || passengers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Basket and passengers are required.",
      });
    }

    const basket = await Basket.findById(basketId);

    if (!basket) {
      return res.status(404).json({
        success: false,
        message: "Basket not found.",
      });
    }

    if (basket.status !== "Open") {
      return res.status(400).json({
        success: false,
        message: "Basket is closed.",
      });
    }

    if (basket.creatorId.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot join your own basket.",
      });
    }

    // FIX: Check for ANY existing request (Pending or Accepted) to prevent duplicates
    const existingRequest = await Request.findOne({
      basketId,
      requesterId: req.user._id,
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You have already interacting with this basket (Pending or Accepted).",
      });
    }

    // FIX: Updated logic to match the new definition of requiredPassengers
    const availableSeats = basket.requiredPassengers;

    if (passengers.length > availableSeats) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available.",
      });
    }

    const request = await Request.create({
      basketId,
      requesterId: req.user._id,
      passengers,
    });

    basket.joinRequests += 1;
    await basket.save();

    const creator = await User.findById(basket.creatorId).select(
      "name phone"
    );

    res.status(201).json({
      success: true,
      message: "Join request sent successfully.",
      request,
      creator,
      basket: {
        pickupPoint: basket.pickupPoint,
        destination: basket.destination,
        travelDate: basket.travelDate,
        travelTime: basket.travelTime,
      },
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
// My Requests
// ======================================

export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      requesterId: req.user._id,
    })
      .populate("basketId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
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
// Pending Requests for Creator
// ======================================

export const getPendingRequests = async (req, res) => {
  try {
    const baskets = await Basket.find({
      creatorId: req.user._id,
    });

    const basketIds = baskets.map((basket) => basket._id);

    const requests = await Request.find({
      basketId: {
        $in: basketIds,
      },
      status: "Pending",
    })
      .populate("basketId")
      .populate("requesterId", "name phone gender")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
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
// WhatsApp Click
// ======================================

export const markWhatsappClicked = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    if (!request.contactedOnWhatsapp) {
      request.contactedOnWhatsapp = true;
      await request.save();

      const basket = await Basket.findById(request.basketId);

      if (basket) {
        basket.whatsappClicks += 1;
        await basket.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "WhatsApp click recorded.",
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
// Accept Request
// ======================================

export const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `Request is already ${request.status.toLowerCase()}.`,
      });
    }

    const basket = await Basket.findById(request.basketId);

    if (!basket) {
      return res.status(404).json({
        success: false,
        message: "Basket not found.",
      });
    }

    if (basket.creatorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to accept requests for this basket.",
      });
    }

    // FIX: Updated logic to match the new definition of requiredPassengers
    const availableSeats = basket.requiredPassengers;

    if (request.passengers.length > availableSeats) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available.",
      });
    }

    // Update request status
    request.status = "Accepted";

    // Update basket data
    basket.confirmedPassengers += request.passengers.length;
    basket.requiredPassengers -= request.passengers.length;
    basket.acceptedRequests += 1;

    // Count male/female passengers from the request
    request.passengers.forEach((passenger) => {
      if (passenger.gender && passenger.gender.toLowerCase() === "male") {
        basket.confirmedMaleCount = (basket.confirmedMaleCount || 0) + 1;
      } else if (passenger.gender && passenger.gender.toLowerCase() === "female") {
        basket.confirmedFemaleCount = (basket.confirmedFemaleCount || 0) + 1;
      }
    });

    // Close the basket if it reaches or exceeds required passenger capacity
    if (basket.requiredPassengers <= 0) {
      basket.status = "Closed";
    }

    // Save changes to database
    await request.save();
    await basket.save();

    return res.status(200).json({
      success: true,
      message: "Request accepted successfully.",
      request,
      basket,
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
// Reject Request
// ======================================

export const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `Request is already ${request.status.toLowerCase()}.`,
      });
    }

    const basket = await Basket.findById(request.basketId);

    if (!basket) {
      return res.status(404).json({
        success: false,
        message: "Basket not found.",
      });
    }

    if (basket.creatorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to reject requests for this basket.",
      });
    }

    // Update request status
    request.status = "Rejected";
    await request.save();

    return res.status(200).json({
      success: true,
      message: "Request rejected successfully.",
      request,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};