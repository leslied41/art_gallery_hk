import S_header from "./S_header";
import Footer from "../layout/Footer";
import styles from "./s_layout.module.css";

const S_layout = ({ children }) => {
  return (
    <>
      <S_header />
      {children}
    </>
  );
};

export default S_layout;
