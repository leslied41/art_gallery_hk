import Links from "../links/Links";
import styles from "./MainNavigation.module.css";
export default function MainNavigation() {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.nav}>
          <Links />
        </div>
      </div>
    </>
  );
}
