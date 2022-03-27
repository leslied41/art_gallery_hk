import S_header from "./S_header";
import Footer from "../layout/Footer";
import styles from "./S_layout.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import S_mobile_header from "./S_mobile_header";
import { useGlobalSettings } from "../context/GlobalSettings";

const S_layout = ({ children }) => {
  const { settings } = useGlobalSettings();
  const { vimeo_link, shop_link } = settings[0];

  const router = useRouter();
  // const [isMobile, setisMobile] = useState();
  // useEffect(() => {
  //   if (window.innerWidth < 768) {
  //     setisMobile(true);
  //   } else if (window.innerWidth >= 768) {
  //     setisMobile(false);
  //   }
  //   window.addEventListener("resize", () => {
  //     if (window.innerWidth < 768) {
  //       setisMobile(true);
  //       //console.log(isMobile);
  //     } else if (window.innerWidth >= 768) {
  //       setisMobile(false);
  //       //console.log(isMobile);
  //     }
  //   });
  // }, []);
  return (
    <>
      <div className={router.locale}>
        {/* {!isMobile && (
          <S_header vimeo_link={vimeo_link} shop_link={shop_link} />
        )}
        {isMobile && (
          <S_mobile_header vimeo_link={vimeo_link} shop_link={shop_link} />
        )} */}
        <div className={styles.pc}>
          <S_header vimeo_link={vimeo_link} shop_link={shop_link} />
        </div>
        <div className={styles.mobile}>
          <S_mobile_header vimeo_link={vimeo_link} shop_link={shop_link} />
        </div>
        {children}
      </div>
    </>
  );
};

export default S_layout;
