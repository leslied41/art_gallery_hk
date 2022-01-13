import S_header from "./S_header";
import Footer from "../layout/Footer";
import styles from "./S_layout.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import S_mobile_header from "./S_mobile_header";

const S_layout = ({ children }) => {
  const router = useRouter();
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
        //console.log(isMobile);
      } else if (window.innerWidth >= 768) {
        setisMobile(false);
        //console.log(isMobile);
      }
    });
  }, []);
  return (
    <>
      <div className={router.locale}>
        {!isMobile && <S_header />}
        {isMobile && <S_mobile_header />}
        {children}
      </div>
    </>
  );
};

export default S_layout;
