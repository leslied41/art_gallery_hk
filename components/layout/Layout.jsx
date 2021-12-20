import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <div className={router.locale}>
        <MainNavigation />
        <main className={styles.layout}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
