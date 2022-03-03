import styles from "./PureWords.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useRouter } from "next/router";
import Collapsible from "../collapsible/Collapsible";
import { useContext } from "react";
import { dropDownContext } from "./DropDownCard";

const serializers = {
  marks: {
    link: ({ children, mark }) =>
      mark.blank ? (
        <a href={mark.href} target="_blank" rel="noopener noreferer">
          {children}
        </a>
      ) : (
        <a href={mark.href}>{children}</a>
      ),
  },
};

const PureWords = ({ data, handleClick }) => {
  const router = useRouter();

  const { content, content_cn } = data;
  const { showCard } = useContext(dropDownContext);
  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <Collapsible showCard={showCard}>
            <div className="mt-28">
              <span className="h3">
                <BlockContent
                  blocks={router.locale === "en" ? content : content_cn}
                  serializers={serializers}
                  projectId="z3dq9mvc"
                  dataset="production"
                />
              </span>
            </div>
          </Collapsible>
        </div>
      </div>
    </>
  );
};
export default PureWords;
