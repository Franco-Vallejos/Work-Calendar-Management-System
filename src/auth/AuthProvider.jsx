import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {}
});

  
  export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          {children}
      </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);