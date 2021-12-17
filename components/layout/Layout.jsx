import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <MainNavigation />
      <main className={styles.layout}>{children}</main>
      <Footer />
    </>
  );
}
