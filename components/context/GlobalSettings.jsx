import React from "react";
import { useContext } from "react";

export const settingsContext = React.createContext({});

export const AppProvider = ({ children, data }) => {
  return (
    <settingsContext.Provider value={data}>{children}</settingsContext.Provider>
  );
};

export const useGlobalSettings = () => {
  return useContext(settingsContext);
};
