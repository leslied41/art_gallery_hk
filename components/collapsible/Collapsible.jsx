import styles from "./Collapsible.module.css";
import { useRef, useEffect, useState } from "react";

const Collapsible = ({ showCard, loaded, children }) => {
  const collapsibleEl = useRef();
  const [scrollHeight, setscrollHeight] = useState();

  useEffect(() => {
    setscrollHeight(collapsibleEl.current.scrollHeight);
  }, [loaded, showCard]);
  return (
    <>
      <div
        className={styles.collapsible}
        ref={collapsibleEl}
        style={
          showCard
            ? scrollHeight
              ? { height: `${scrollHeight + 100}px` }
              : { height: `${collapsibleEl.current.scrollHeight + 100}px` }
            : { height: "0px" }
        }
      >
        {children}
      </div>
    </>
  );
};
export default Collapsible;
