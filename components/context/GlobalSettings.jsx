import React from "react";
import { useContext, useState } from "react";

export const settingsContext = React.createContext({});

export const AppProvider = ({ children, data }) => {
  const [popup_path, setpopup_path] = useState("");
  const [showimg, setshowimg] = useState(false);
  const [over_footer, setover_footer] = useState(false);

  return (
    <settingsContext.Provider
      value={{
        settings: data,
        popup: [popup_path, setpopup_path],
        showimg: showimg,
        setshowimg: setshowimg,
        over_footer: over_footer,
        setover_footer: setover_footer,
      }}
    >
      {children}
    </settingsContext.Provider>
  );
};

export const useGlobalSettings = () => {
  return useContext(settingsContext);
};
