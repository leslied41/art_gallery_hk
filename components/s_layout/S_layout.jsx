import S_header from "./S_header";
import Footer from "../layout/Footer";
import styles from "./S_layout.module.css";
import { useRouter } from "next/router";

const S_layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <div className={router.locale}>
        <S_header />
        {children}
      </div>
    </>
  );
};

export default S_layout;
