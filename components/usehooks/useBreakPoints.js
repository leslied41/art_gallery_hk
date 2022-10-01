import { useState, useEffect } from "react";

export const useBreakPoints = () => {
  const [isMobile, setisMobile] = useState();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setisMobile(true);
    } else if (window.innerWidth >= 768) {
      setisMobile(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setisMobile(true);
      } else if (window.innerWidth >= 768) {
        setisMobile(false);
      }
    });
  }, []);
  return { isMobile };
};
