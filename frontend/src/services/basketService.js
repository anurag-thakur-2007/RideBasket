import api from "./api";

export const getAllBaskets = async () => {
  const response = await api.get("/baskets");

  return response.data;
};

export const createBasket = async (basketData) => {
  const response = await api.post(
    "/baskets",
    basketData
  );

  return response.data;
};

export const getBasketById = async (basketId) => {
  const response = await api.get(
    `/baskets/${basketId}`
  );

  return response.data;
};

export const getMyBaskets = async () => {
  const response = await api.get("/baskets/my");

  return response.data;
};