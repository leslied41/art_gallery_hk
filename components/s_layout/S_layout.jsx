import React, { useEffect, useState } from "react";
import sanityClient from "../../client.js";
import S_header from "./S_header";
import styles from "./S_layout.module.css";
import { useRouter } from "next/router";
import S_mobile_header from "./S_mobile_header";

const S_layout = ({ children }) => {
  const [settingsData, setSettingsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const settings_data = await sanityClient.fetch(
        `*[_type=='settings']{orgnizationName,orgnizationName_cn,logo,phone,email,social[]->,abbreviation,exhibitions,news,about,artists,landing,exhibitions_mobile,news_mobile,about_mobile,artists_mobile,landing_mobile,cursor_font_size,link_font_size,mobile_link_font_size,hero_exhibition_link,site_name,site_name_cn,vimeo_link,shop_link}`
      );
      setSettingsData(settings_data);
    };
    fetchData();
  }, []);
  const { vimeo_link, shop_link } = settingsData[0] ?? {};

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
