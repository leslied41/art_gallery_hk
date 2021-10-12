import styles from "../styles/about.module.css";
import FoundersInfo from "../components/about/FoundersInfo";
import VisitUs from "../components/about/VisitUs";
import { useState, useEffect } from "react";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";

export default function About({ data }) {
  const [isFoundersShown, setIsFoundersShown] = useState(false);
  const displayFounders = () => {
    setIsFoundersShown(!isFoundersShown);
  };
  const {
    id,
    name,
    founder,
    aboutSection,
    visitUsSection,
    connectSection,
    terminologySection,
    missionStatementSection,
  } = data[0];

  // const { body } = aboutInfo[0];
  return (
    <>
      <main className={styles.main}>
        {/* first part */}
        <div className="section">
          <StaticCard data={aboutSection} />
        </div>
        {/* second part */}
        {/* <div className="section">
          <div className={styles.foundersBtn} onClick={displayFounders}>
            <span className="h2">Founders +</span>
          </div>
          {isFoundersShown || <hr className="hr" />}
          {isFoundersShown && <FoundersInfo founder={founder} />}
        </div> */}
        {/* third part */}
        <div className="section">{<VisitUs visitUs={visitUsSection} />}</div>
        {/* fourth part */}
        <div className="section">{<StaticCard data={connectSection} />}</div>
        {/* dropDownCard */}
        <div className="section">
          <DropDownCard data={terminologySection} />
        </div>
        <div className="section">
          <DropDownCard data={missionStatementSection} />
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const data = await sanityClient.fetch(
    `*[_type=='about']{founder,aboutSection,visitUsSection,connectSection,terminologySection,missionStatementSection}`
  );

  if (!data || !data.length) {
    return {
      props: { data: [] },
    };
  } else {
    return {
      props: { data },
    };
  }
};
