import React from "react";
import { useContext, useState } from "react";

export const settingsContext = React.createContext({});

export const AppProvider = ({ children, data }) => {
  const [popup_path, setpopup_path] = useState("");
  return (
    <settingsContext.Provider
      value={{ settings: data, popup: [popup_path, setpopup_path] }}
    >
      {children}
    </settingsContext.Provider>
  );
};

export const useGlobalSettings = () => {
  return useContext(settingsContext);
};
