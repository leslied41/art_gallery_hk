import styles from "./InterviewsList.module.css";
import Collapsible from "../collapsible/Collapsible";
import { useContext } from "react";
import { dropDownContext } from "./DropDownCard";
import { SingleInterview } from "./SingleInterview";

const InterviewsList = ({ data }) => {
  const { showCard } = useContext(dropDownContext);
  //console.log(data);

  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <Collapsible showCard={showCard}>
            <div className="mt-30">
              {data.map((interview) => {
                return <SingleInterview interview={interview} />;
              })}
            </div>
          </Collapsible>
        </div>
      </div>
    </>
  );
};
export default InterviewsList;
