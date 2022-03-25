import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import MobileHeader from "./MobileHeader";
import PcHeader from "./PcHeader";

function Header() {
  const router = useRouter();

  // const [isMobile, setisMobile] = useState();
  // useLayoutEffect(() => {
  //   if (window.innerWidth < 768) {
  //     setisMobile(true);
  //   } else if (window.innerWidth >= 768) {
  //     setisMobile(false);
  //   }
  //   window.addEventListener("resize", () => {
  //     if (window.innerWidth < 768) {
  //       setisMobile(true);
  //     } else if (window.innerWidth >= 768) {
  //       setisMobile(false);
  //     }
  //   });
  // }, []);

  return (
    <>
      {/* {isMobile && <MobileHeader />}
      {!isMobile && <PcHeader />} */}
      <div className={styles.mobile}>
        <MobileHeader />
      </div>
      <div className={styles.pc}>
        <PcHeader />
      </div>
    </>
  );
}

export default Header;
