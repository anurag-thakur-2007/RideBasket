import { createContext, useEffect, useState } from "react";
import { getStoredAuth, saveAuth, clearAuth } from "../utils/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => getStoredAuth());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (token, user) => {
    saveAuth(token, user);

    setAuth({
      token,
      user,
    });
  };

  const logout = () => {
    clearAuth();

    setAuth({
      token: "",
      user: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        user: auth.user,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(auth.token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;