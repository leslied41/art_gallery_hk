import ReactPlayer from "react-player";
import styles from "../styles/exhibitions.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";
import { useState, useEffect } from "react";

export default function Exhibition({
  exPageData,
  currentExpoData,
  futureExpoData,
}) {
  const { briefSection } = exPageData[0];
  //console.log(expoData);
  return (
    <>
      <main>
        <div className="section">
          <StaticCard data={briefSection} />
        </div>
        <div className="section">
          <DropDownCard data={currentExpoData} />
        </div>
        <div className="section">
          <DropDownCard data={futureExpoData} />
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
  const exPageData = await sanityClient.fetch(
    `*[_type=='exhibitions']{briefSection}`
  );
  const currentExpoData = await sanityClient.fetch(
    `*[_type=='exhibition'&& exhibition_status=='Current']`
  );
  const futureExpoData = await sanityClient.fetch(
    `*[_type=='exhibition'&& exhibition_status=='Future']`
  );
  // if (!currentExpoData || !currentExpoData.length) {
  //   return {
  //     props: {
  //       data: [],
  //       ...(await serverSideTranslations(locale, ["common"])),
  //     },
  //   };
  // } else {
  return {
    props: {
      exPageData,
      currentExpoData,
      futureExpoData,

      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
  //}
};
