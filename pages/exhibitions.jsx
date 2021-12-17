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
  const { briefSection, exhis_dropdown } = exPageData[0];

  return (
    <>
      <main>
        <div className="section mt-145">
          <StaticCard data={briefSection} />
        </div>
        <div className="section mt-145">
          <DropDownCard
            title={
              router.locale == "en"
                ? exhis_dropdown?.first_name
                : exhis_dropdown?.first_name_cn
            }
          >
            <ExpoImageList data={currentExpoData} />
          </DropDownCard>
        </div>
        <div className="section mt-30">
          <DropDownCard
            title={
              router.locale == "en"
                ? exhis_dropdown?.second_name
                : exhis_dropdown?.second_name_cn
            }
          >
            <ExpoImageList data={futureExpoData} />
          </DropDownCard>
        </div>
        <div className="section mt-30">
          <DropDownCard
            title={
              router.locale == "en"
                ? exhis_dropdown?.third_name
                : exhis_dropdown?.third_name_cn
            }
          >
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
    `*[_type=='pages'&&name=='Exhibitions']{briefSection,exhis_dropdown}`
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
