import React, { useEffect, useState } from "react";
import S_header from "./S_header";
import styles from "./S_layout.module.css";
import { useRouter } from "next/router";
import S_mobile_header from "./S_mobile_header";
import { useSettings } from "../usehooks/useSettings";

const S_layout = ({ children }) => {
  const { settings, isError, isLoading } = useSettings();
  const { vimeo_link, shop_link } = settings?.[0] ?? {};
  const router = useRouter();

  return (
    <>
      <div className={router.locale}>
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
