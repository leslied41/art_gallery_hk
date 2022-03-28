import styles from "./PureWords.module.css";
import { useRouter } from "next/router";
import Collapsible from "../collapsible/Collapsible";
import { useContext } from "react";
import { dropDownContext } from "./DropDownCard";
import { usePortableText } from "../usehooks/usePortableText";

const PureWords = ({ data, handleClick }) => {
  const router = useRouter();

  const { content, content_cn } = data;
  const { showCard } = useContext(dropDownContext);
  const portableText = usePortableText(
    router.locale === "en" ? content : content_cn
  );
  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <Collapsible showCard={showCard}>
            <div className="mt-28">
              <span className="h3">{portableText}</span>
            </div>
          </Collapsible>
        </div>
      </div>
    </>
  );
};
export default PureWords;
