import styles from "./PureWords.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useRouter } from "next/router";
import Collapsible from "../collapsible/Collapsible";

const PureWords = ({ data, handleClick, showCard }) => {
  const router = useRouter();

  const { content, content_cn, name, name_cn } = data;

  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <div className="title">
            <span className="h2" onClick={handleClick}>
              {router.locale === "en" ? name : name_cn} {showCard ? "-" : "+"}
            </span>
          </div>

          <Collapsible showCard={showCard}>
            <div className="mt-28">
              <span className="h3">
                <BlockContent
                  blocks={router.locale === "en" ? content : content_cn}
                  projectId="z3dq9mvc"
                  dataset="production"
                />
              </span>
            </div>
          </Collapsible>

          <div>
            <hr className="hr-bottom" />
          </div>
        </div>
      </div>
    </>
  );
};
export default PureWords;
