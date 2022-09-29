import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import sanityClient from "../client.js";
import DropDownCard from "../components/dropDownCard/DropDownCard.jsx";
import StaticCard from "../components/staticCard/StaticCard";
import ExpoImageList from "../components/dropDownCard/ExpoImageList";
import Heads from "../components/head/Heads.jsx";
import { usePathHistory } from "../components/context/PathHistory";
import {
  exhibitions_page_data,
  current_exhibitions_data,
  future_exhibitions_data,
  past_exhibitions_data,
} from "../groq";

export default function Exhibition({
  exPageData,
  currentExpoData,
  futureExpoData,
  pastExpoData,
}) {
  const router = useRouter();
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;
  const scrollTo = useRef();
  const { briefSection, exhis_dropdown, seo } = exPageData[0];

  useEffect(() => {
    scrollTo.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);

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
      </main>
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  const exPageData = await sanityClient.fetch(exhibitions_page_data);
  const currentExpoData = await sanityClient.fetch(current_exhibitions_data);
  const futureExpoData = await sanityClient.fetch(future_exhibitions_data);
  const pastExpoData = await sanityClient.fetch(past_exhibitions_data);
  return {
    props: {
      exPageData,
      currentExpoData,
      futureExpoData,
      pastExpoData,
    },
    revalidate: 10,
  };
};
