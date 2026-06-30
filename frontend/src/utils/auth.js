import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export const saveAuth = (token, user = null) => {
  localStorage.setItem(TOKEN_KEY, token);

  if (!user) {
    try {
      user = jwtDecode(token);
    } catch {
      user = null;
    }
  }

  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("user");
};

export const getStoredAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  const storedUser = localStorage.getItem("user");

  if (!token) {
    return {
      token: "",
      user: null,
    };
  }

  return {
    token,
    user: storedUser ? JSON.parse(storedUser) : null,
  };
};