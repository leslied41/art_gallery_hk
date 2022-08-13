import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AppProvider } from "../context/GlobalSettings";
import sanityClient from "../../client.js";

export default function Layout({ children }) {
  const router = useRouter();
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

  return (
    <>
      <div className={router.locale}>
        <AppProvider data={settingsData}>
          <MainNavigation />
          <main className={styles.layout}>{children}</main>
          <Footer />
        </AppProvider>
      </div>
    </>
  );
}
