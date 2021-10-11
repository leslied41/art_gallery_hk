import styles from "../styles/about.module.css";
import FoundersInfo from "../components/about/FoundersInfo";
import VisitUs from "../components/about/VisitUs";
import Connect from "../components/about/Connect";
import { useState, useEffect } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";

export default function About({ data }) {
  const [isFoundersShown, setIsFoundersShown] = useState(false);
  const displayFounders = () => {
    setIsFoundersShown(!isFoundersShown);
  };
  const {
    id,
    name,
    founder,
    aboutDescription,
    visitUs,
    connect,
    terminology,
    missionStatement,
  } = data[0];

  // const { body } = aboutInfo[0];
  return (
    <>
      <main className={styles.main}>
        {/* first part */}
        <div className="section">
          <div className="twoColumn-11">
            <div className="col"></div>
            <div className="col">
              <div className={styles.title}>
                <span className="h1">About</span>
              </div>
              <div className={styles.description}>
                <span className="h3">
                  {
                    <BlockContent
                      blocks={aboutDescription}
                      projectId="z3dq9mvc"
                      dataset="production"
                    />
                  }
                </span>
              </div>
              <div className={styles.foundersBtn} onClick={displayFounders}>
                <span className="h2">Founders +</span>
              </div>
              {isFoundersShown || <hr className="hr" />}
            </div>
          </div>
        </div>
        {/* second part */}
        <div className="section">
          {isFoundersShown && <FoundersInfo founder={founder} />}
        </div>
        {/* third part */}
        <div className="section">{<VisitUs visitUs={visitUs} />}</div>
        {/* fourth part */}
        <div className="section">{<Connect connect={connect} />}</div>
        {/* dropDownCard */}
        <div className="section">
          <DropDownCard data={terminology} />
        </div>
        <div className="section">
          <DropDownCard data={missionStatement} />
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const data = await sanityClient.fetch(
    `*[_type=='about']{id,name,founder,aboutDescription,visitUs,connect,terminology,missionStatement}`
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
