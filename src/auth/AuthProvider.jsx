//usa el useContext para poder manejar un estado global

import React, { useContext,createContext, useState,useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
