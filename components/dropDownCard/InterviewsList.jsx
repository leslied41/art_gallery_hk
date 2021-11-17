import styles from "./InterviewsList.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useRouter } from "next/router";
import Collapsible from "../collapsible/Collapsible";
import { useContext } from "react";
import { dropDownContext } from "./DropDownCard";

const InterviewsList = ({ data }) => {
  const { showCard } = useContext(dropDownContext);
  console.log(data);
  const router = useRouter();

  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <Collapsible showCard={showCard}>
            <div className="mt-28">
              {data.map((interview) => {
                const {
                  _id,
                  title,
                  title_cn,
                  content,
                  content_cn,
                  interview_brief,
                  interview_brief_cn,
                } = interview;
                return (
                  <div key={_id}>
                    <p className="h3">
                      {router.locale == "en" ? title : title_cn}
                      <span className="h4">
                        <BlockContent
                          blocks={
                            router.locale === "en"
                              ? interview_brief
                              : interview_brief_cn
                          }
                          projectId="z3dq9mvc"
                          dataset="production"
                        />
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </Collapsible>
        </div>
      </div>
    </>
  );
};
export default InterviewsList;
