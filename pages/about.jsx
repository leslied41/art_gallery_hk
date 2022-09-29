import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";
import PureWords from "../components/dropDownCard/PureWords";
import Heads from "../components/head/Heads.jsx";
import { usePathHistory } from "../components/context/PathHistory";
import AuthorCard from "../components/designer_card/AuthorCard";
import { about_page_data } from "../groq";

export const getStaticProps = async ({ locale }) => {
  const data = await sanityClient.fetch(about_page_data);

  if (!data || !data.length) {
    return {
      props: {
        data: [],
      },
    };
  } else {
    return {
      props: { data },
      revalidate: 10,
    };
  }
};

export default function About({ data }) {
  const router = useRouter();
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;
  const scrollTo = useRef();
  const {
    briefSection,
    visitUsSection,
    connectSection,
    terminologySection,
    missionStatementSection,
    seo,
    authorCard,
  } = data[0];

  useEffect(() => {
    scrollTo.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);

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
