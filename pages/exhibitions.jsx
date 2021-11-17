import ReactPlayer from "react-player";
import styles from "../styles/exhibitions.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ExpoImageList from "../components/dropDownCard/ExpoImageList";

export default function Exhibition({
  exPageData,
  currentExpoData,
  futureExpoData,
  pastExpoData,
}) {
  const router = useRouter();
  const { briefSection } = exPageData[0];
  console.log(futureExpoData);

  return (
    <>
      <main>
        <div className="section mt-158">
          <StaticCard data={briefSection} />
        </div>
        <div className="section mt-118">
          <DropDownCard title={router.locale == "en" ? "Current" : "現在"}>
            <ExpoImageList data={currentExpoData} />
          </DropDownCard>
        </div>
        <div className="section mt-28">
          <DropDownCard title={router.locale == "en" ? "Forthcoming" : "未來"}>
            <ExpoImageList data={futureExpoData} />
          </DropDownCard>
        </div>
        <div className="section mt-28">
          <DropDownCard title={router.locale == "en" ? "Past" : "往期"}>
            <ExpoImageList data={pastExpoData} />
          </DropDownCard>
        </div>
        {/* <div className="section">
          <div>
            <ReactPlayer
              controls={true}
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            />
          </div>
        </div> */}
      </main>
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  const exPageData = await sanityClient.fetch(
    `*[_type=='pages'&&name=='Exhibitions']{briefSection}`
  );
  const currentExpoData = await sanityClient.fetch(
    `*[_type=='exhibition'&& exhibition_status=='Current']`
  );
  const futureExpoData = await sanityClient.fetch(
    `*[_type=='exhibition'&& exhibition_status=='Future']`
  );
  const pastExpoData = await sanityClient.fetch(
    `*[_type=='exhibition'&& exhibition_status=='Past']`
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
      pastExpoData,

      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
  //}
};
