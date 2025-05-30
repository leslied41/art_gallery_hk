import React from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import MobileHeader from "./MobileHeader";
import PcHeader from "./PcHeader";

function Header() {
  const router = useRouter();

  return (
    <header>
      <div className={styles.mobile}>
        <MobileHeader />
      </div>
      <div className={styles.pc}>
        <PcHeader />
      </div>
    </header>
  );
}

export default Header;
