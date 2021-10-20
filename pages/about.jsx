import styles from "../styles/about.module.css";
import FoundersInfo from "../components/about/FoundersInfo";
import { useState, useEffect } from "react";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";
import AppointmentForm from "../components/appointmentForm/AppointmentForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }) => {
  const data = await sanityClient.fetch(
    `*[_type=='about']{founder,briefSection,visitUsSection,connectSection,terminologySection,missionStatementSection}`
  );

  if (!data || !data.length) {
    return {
      props: {
        data: [],
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } else {
    return {
      props: { data, ...(await serverSideTranslations(locale, ["common"])) },
    };
  }
};

export default function About({ data }) {
  const [isFoundersShown, setIsFoundersShown] = useState(false);
  const displayFounders = () => {
    setIsFoundersShown(!isFoundersShown);
  };
  const {
    founder,
    briefSection,
    visitUsSection,
    connectSection,
    terminologySection,
    missionStatementSection,
  } = data[0];

  // const { body } = aboutInfo[0];
  return (
    <>
      <main>
        {/* first part */}
        <div className="section">
          <StaticCard data={briefSection} />
        </div>
        {/* dropDownCard */}
        <div className="section">
          <DropDownCard data={terminologySection} />
        </div>
        <div className="section">
          <DropDownCard data={missionStatementSection} />
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
        <div className="section" id="visitUsLocation">
          {<StaticCard data={visitUsSection} form={AppointmentForm} />}
        </div>
        {/* fourth part */}
        <div className="section">{<StaticCard data={connectSection} />}</div>
      </main>
    </>
  );
}
