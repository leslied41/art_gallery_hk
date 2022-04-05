import styles from "../styles/about.module.css";
import { useState, useEffect, useRef } from "react";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";
import AppointmentForm from "../components/appointment_form/AppointmentForm";
import router, { useRouter } from "next/router";
import PureWords from "../components/dropDownCard/PureWords";
import Heads from "../components/head/Heads.jsx";
import { useGlobalSettings } from "../components/context/GlobalSettings";
import AuthorCard from "../components/designer_card/AuthorCard";

export const getStaticProps = async ({ locale }) => {
  const data = await sanityClient.fetch(
    `*[_type=='pages'&&name=='About']{briefSection,visitUsSection,connectSection{name,
    name_cn,
    description,
    description_cn,
    phone,
    social[]->,
    email,
    font_size,
    hidden
    },terminologySection,missionStatementSection,seo,authorCard}`
  );
  const settings_data = await sanityClient.fetch(
    `*[_type=='settings']{orgnizationName,orgnizationName_cn,address,phone,email,social[]->,businessHours,abbreviation,exhibitions,news,about,artists,landing}`
  );

  if (!data || !data.length) {
    return {
      props: {
        data: [],
      },
    };
  } else {
    return {
      props: { data, settings_data },
      revalidate: 10,
    };
  }
};

export default function About({ data, settings_data }) {
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
  //console.log(router.asPath);
  const {
    briefSection,
    visitUsSection,
    connectSection,
    terminologySection,
    missionStatementSection,
    seo,
    authorCard,
  } = data[0];
  console.log(connectSection);
  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "About" : "關於我們"} />
      <main className="mt-145 mb-145">
        {/* first part */}
        <div className="section ">
          <StaticCard data={briefSection} fowardref={scrollTo} />
        </div>
        {/* dropDownCard */}
        {!terminologySection.hidden && (
          <div className="section mt-145">
            <DropDownCard
              title={
                router.locale == "en"
                  ? terminologySection.name
                  : terminologySection.name_cn
              }
            >
              <PureWords data={terminologySection} />
            </DropDownCard>
          </div>
        )}
        {!missionStatementSection.hidden && (
          <div className="section mt-30">
            <DropDownCard
              title={
                router.locale == "en"
                  ? missionStatementSection.name
                  : missionStatementSection.name_cn
              }
            >
              <PureWords data={missionStatementSection} />
            </DropDownCard>
          </div>
        )}

        {/* third part */}
        {!visitUsSection.hidden && (
          <div className="section mt-145" id="visitUsLocation">
            {<StaticCard data={visitUsSection} form={true} />}
          </div>
        )}
        {/* fourth part */}
        {!connectSection.hidden && (
          <div className="section mt-145">
            {<StaticCard data={connectSection} />}
          </div>
        )}
        {/* fifth part */}
        {!authorCard?.hidden && (
          <div className="section mt-145">
            <AuthorCard />
          </div>
        )}
      </main>
    </>
  );
}
