import styles from "../styles/about.module.css";
import { useState, useEffect } from "react";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";
import AppointmentForm from "../components/appointment_form/AppointmentForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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
    },terminologySection,missionStatementSection,seo}`
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
      revalidate: 1,
    };
  }
};

export default function About({ data }) {
  const router = useRouter();
  const { settings, popup } = useGlobalSettings();
  const [popup_path, setpopup_path] = popup;
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
  } = data[0];
  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "About" : "关于"} />
      <main>
        {/* first part */}
        <div className="section mt-145">
          <StaticCard data={briefSection} />
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
        <div className="section mt-145" id="visitUsLocation">
          {<StaticCard data={visitUsSection} form={AppointmentForm} />}
        </div>
        {/* fourth part */}
        <div className="section mt-145">
          {<StaticCard data={connectSection} />}
        </div>
        {/* fifth part */}
        <div className="section mt-145 mb-145">
          <AuthorCard />
        </div>
      </main>
    </>
  );
}
