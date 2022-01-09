import ReactPlayer from "react-player";
import styles from "../styles/exhibitions.module.css";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ExpoImageList from "../components/dropDownCard/ExpoImageList";
import Heads from "../components/head/Heads.jsx";
import { useGlobalSettings } from "../components/context/GlobalSettings";

export default function Exhibition({
  exPageData,
  currentExpoData,
  futureExpoData,
  pastExpoData,
}) {
  const router = useRouter();
  const { settings, popup } = useGlobalSettings();
  const [popup_path, setpopup_path] = popup;
  const scrollTo = useRef();

  useEffect(() => {
    scrollTo.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);
  //console.log(popup_path);
  const { briefSection, exhis_dropdown, seo } = exPageData[0];

  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "Exhibitions" : "展出"} />
      <main>
        <div className="section mt-145">
          <StaticCard data={briefSection} fowardref={scrollTo} />
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
        <div className="section mt-30 mb-145">
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
    `*[_type=='pages'&&name=='Exhibitions']{briefSection,exhis_dropdown,seo}`
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
    },
    revalidate: 10,
  };
  //}
};
