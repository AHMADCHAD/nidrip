import React, { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "../firebase/AuthService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    // Unsubscribe to the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // This function is still useful for optimistic UI updates if needed,
  // but onAuthStateChanged is the source of truth.
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    signOut(); // Call the signOut function from AuthService
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};