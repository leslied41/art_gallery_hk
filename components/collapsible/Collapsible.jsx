import styles from "./Collapsible.module.css";
import { useRef, useEffect, useState } from "react";

const Collapsible = ({ showCard, loaded, children, delay }) => {
  const collapsibleEl = useRef();
  const [scrollHeight, setscrollHeight] = useState();

  useEffect(() => {
    if (delay) {
      setTimeout(() => {
        setscrollHeight(collapsibleEl.current.scrollHeight);
      }, 500);
    }
    if (!delay) {
      setscrollHeight(collapsibleEl.current.scrollHeight);
    }
  }, [showCard, loaded]);
  return (
    <>
      <div
        className={styles.collapsible}
        ref={collapsibleEl}
        style={
          showCard
            ? scrollHeight
              ? { height: `${scrollHeight}px` }
              : { height: `${collapsibleEl.current.scrollHeight}px` }
            : { height: "0px" }
        }
      >
        {children}
      </div>
    </>
  );
};
export default Collapsible;
