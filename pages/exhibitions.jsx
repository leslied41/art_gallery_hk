import ReactPlayer from "react-player";
import styles from "../styles/exhibitions.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";
import { useState, useEffect } from "react";

export default function Exhibition({ data }) {
  const { briefSection, currentSection } = data[0];
  return (
    <>
      <main>
        <div className="section">
          <StaticCard data={briefSection} />
        </div>
        <div className="section">
          <DropDownCard data={currentSection} />
        </div>
        <div className="section">
          <div>
            <ReactPlayer
              controls={true}
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            />
          </div>
        </div>
      </main>
    </>
  );
}
export const getStaticProps = async ({ locale }) => {
  const data = await sanityClient.fetch(
    `*[_type=='exhibitions']{briefSection,currentSection}`
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
