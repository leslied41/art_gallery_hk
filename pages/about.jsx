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
  //const [isFoundersShown, setIsFoundersShown] = useState(false);
  // const displayFounders = () => {
  //   setIsFoundersShown(!isFoundersShown);
  // };
  const {
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
        <div className="section mt-158">
          <StaticCard data={briefSection} />
        </div>
        {/* dropDownCard */}
        <div className="section mt-118">
          <DropDownCard
            data={terminologySection}
            title={"Terminology"}
            purewords={true}
          />
        </div>
        <div className="section mt-28">
          <DropDownCard
            data={missionStatementSection}
            title={"Mission Statement"}
            purewords={true}
          />
        </div>

        {/* third part */}
        <div className="section mt-176" id="visitUsLocation">
          {<StaticCard data={visitUsSection} form={AppointmentForm} />}
        </div>
        {/* fourth part */}
        <div className="section mt-140">
          {<StaticCard data={connectSection} />}
        </div>
      </main>
    </>
  );
}
