import styles from "../styles/about.module.css";
import { useState, useEffect } from "react";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";
import AppointmentForm from "../components/appointment_form/AppointmentForm";
import router, { useRouter } from "next/router";
import PureWords from "../components/dropDownCard/PureWords";
import Heads from "../components/head/Heads.jsx";
import ControlBtn from "../components/popup_control/ControlBtn";

export const getStaticProps = async ({ locale }) => {
  const data = await sanityClient.fetch(
    `*[_type=='pages'&&name=='Study_About'][0]{briefSection, collapsable_first,collapsable_second,collapsable_third,seo}`
  );
  const settings_data = await sanityClient.fetch(
    `*[_type=='settings']{orgnizationName,orgnizationName_cn,logo,phone,email,social[]->,abbreviation,exhibitions,news,about,artists,landing,exhibitions_mobile,news_mobile,about_mobile,artists_mobile,landing_mobile,cursor_font_size,link_font_size,mobile_link_font_size,hero_exhibition_link,site_name,site_name_cn,vimeo_link,shop_link}`
  );
  return {
    props: { data, settings_data },
    revalidate: 10,
  };
};

export default function Study_About({ data, settings_data }) {
  const router = useRouter();
  const {
    briefSection,
    collapsable_first,
    collapsable_second,
    collapsable_third,
    seo,
  } = data;
  return (
    <>
      <ControlBtn />
      <Heads
        seo={seo}
        name={router.locale == "en" ? "About" : "关于"}
        settings_data={settings_data}
      />
      <main className="mb-145 layout ">
        <div className={router.locale}>
          {briefSection && (
            <div className="section study-mt-145">
              <StaticCard data={briefSection} />
            </div>
          )}
          {/* dropDownCard */}
          {!collapsable_first.hidden && (
            <div className="section study-mt-145">
              <DropDownCard
                title={
                  router.locale == "en"
                    ? collapsable_first.name
                    : collapsable_first.name_cn
                }
              >
                <PureWords data={collapsable_first} />
              </DropDownCard>
            </div>
          )}
          {!collapsable_second.hidden && (
            <div className="section mt-30">
              <DropDownCard
                title={
                  router.locale == "en"
                    ? collapsable_second.name
                    : collapsable_second.name_cn
                }
              >
                <PureWords data={collapsable_second} />
              </DropDownCard>
            </div>
          )}
          {!collapsable_third.hidden && (
            <div className="section mt-30 ">
              <DropDownCard
                title={
                  router.locale == "en"
                    ? collapsable_third.name
                    : collapsable_third.name_cn
                }
              >
                <PureWords data={collapsable_third} />
              </DropDownCard>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
Study_About.getLayout = function getLayout(page) {
  return <>{page}</>;
};
