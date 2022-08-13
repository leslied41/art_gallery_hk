import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AppProvider } from "../context/GlobalSettings";
import { useSettings } from "../usehooks/useSettings";

export default function Layout({ children, settings_data }) {
  const router = useRouter();
  const { settings, isError, isLoading } = useSettings();

  return (
    <>
      <div className={router.locale}>
        <AppProvider data={settings ? settings : settings_data}>
          <MainNavigation />
          <main className={styles.layout}>{children}</main>
          <Footer />
        </AppProvider>
      </div>
    </>
  );
}
