import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import Links from "../links/Links";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import PcHeader from "./PcHeader";

function Header() {
  const router = useRouter();
  // const linksEl = useRef();
  // const titleEl = useRef();

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
      {/* <div className={styles.links} ref={linksEl}>
        <Links lan="true" />
      </div>
      <div className={styles.title} ref={titleEl}>
        <Link href="/" exact>
          <span>{router.locale == "en" ? "PHD Group" : "PHD集團"}</span>
        </Link>
      </div> */}
      {isMobile && <MobileHeader />}
      {!isMobile && <PcHeader />}
    </>
  );
}

export default Header;
