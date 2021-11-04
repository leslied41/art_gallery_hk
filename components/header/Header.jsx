import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import Links from "../links/Links";
import Link from "next/link";
import image0 from "../../public/images/image0.png";
import { useTranslation } from "next-i18next";
import MobileHeader from "./MobileHeader";
import PcHeader from "./PcHeader";

function Header() {
  const [isMobile, setisMobile] = useState();
  useEffect(() => {
    if (window.innerWidth < 414) {
      setisMobile(true);
    } else if (window.innerWidth >= 414) {
      setisMobile(false);
    }
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 414) {
        setisMobile(true);
        //console.log(isMobile);
      } else if (window.innerWidth >= 414) {
        setisMobile(false);
        //console.log(isMobile);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 414) {
          setisMobile(true);
        } else if (window.innerWidth >= 414) {
          setisMobile(false);
        }
      });
    };
  }, []);

  return (
    <>
      {isMobile && <MobileHeader />}
      {!isMobile && <PcHeader />}
    </>
  );
}

export default Header;
