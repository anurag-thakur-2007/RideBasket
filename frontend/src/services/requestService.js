import api from "./api";

// ======================================
// Join Basket
// ======================================

export const joinBasket = async (joinData) => {
  const response = await api.post(
    "/requests/join",
    joinData
  );

  return response.data;
};

// ======================================
// My Requests
// ======================================

export const getMyRequests = async () => {
  const response = await api.get(
    "/requests/my"
  );

  return response.data;
};

// ======================================
// Pending Requests
// ======================================

export const getPendingRequests = async () => {
  const response = await api.get(
    "/requests/pending"
  );

  return response.data;
};

// ======================================
// Accept Request
// ======================================

export const acceptRequest = async (
  requestId
) => {
  const response = await api.put(
    `/requests/accept/${requestId}`
  );

  return response.data;
};

// ======================================
// Reject Request
// ======================================

export const rejectRequest = async (
  requestId
) => {
  const response = await api.put(
    `/requests/reject/${requestId}`
  );

  return response.data;
};

// ======================================
// WhatsApp Click
// ======================================

export const markWhatsappClicked = async (
  requestId
) => {
  const response = await api.post(
    `/requests/whatsapp-click/${requestId}`
  );

  return response.data;
};