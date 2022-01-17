import styles from "./InterviewsList.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useRouter } from "next/router";
import Collapsible from "../collapsible/Collapsible";
import { useContext } from "react";
import { dropDownContext } from "./DropDownCard";

const PressList = ({ data }) => {
  const { showCard } = useContext(dropDownContext);

  const router = useRouter();

  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <Collapsible showCard={showCard}>
            <div className="mt-30">
              {data.map((release, index) => {
                const { release_name, release_lead, release_link } = release;
                return (
                  <div key={index} className="mt-30">
                    <a
                      href={release_link ? release_link : null}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="h2">
                        {release_name}
                        <span
                          style={{ display: "inline-block", width: "1em" }}
                        ></span>
                        <span className="h3">{release_lead + `...`}</span>
                      </div>
                    </a>
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
export default PressList;
