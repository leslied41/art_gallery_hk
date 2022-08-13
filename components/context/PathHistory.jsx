import React from "react";
import { useContext, useState } from "react";

export const pathHistoryContext = React.createContext({});

export const PathHistoryProvider = ({ children }) => {
  const [popup_path, setpopup_path] = useState("");
  const [showimg, setshowimg] = useState(false);
  const [over_footer, setover_footer] = useState(false);
  return (
    <pathHistoryContext.Provider
      value={{
        popup: [popup_path, setpopup_path],
        showimg: showimg,
        setshowimg: setshowimg,
        over_footer: over_footer,
        setover_footer: setover_footer,
      }}
    >
      {children}
    </pathHistoryContext.Provider>
  );
};

export const usepathHistory = () => {
  return useContext(pathHistoryContext);
};
