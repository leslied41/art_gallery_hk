import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import sanityClient from "../../client.js";
import StaticCard from "../../components/staticCard/StaticCard";
import DropDownCard from "../../components/dropDownCard/DropDownCard.jsx";
import ArtistBio from "../../components/dropDownCard/ArtistBio.jsx";
import ArtistWorksImageList from "../../components/dropDownCard/ArtistWorksImageList.jsx";
import ExpoList from "../../components/artists_artist_exhibition_list/ExpoList.jsx";
import InterviewsList from "../../components/dropDownCard/InterviewsList";
import Heads from "../../components/head/Heads.jsx";
import { usePathHistory } from "../../components/context/PathHistory.jsx";
import useSort from "../../components/usehooks/useSort.js";
import {
  artist_page_data,
  artist_data,
  work_images_data,
  interviews_data,
} from "../../groq";

export default function Artist({
  artistData,
  workImages,
  interviewsData,
  artistPageData,
}) {
  const [showCard, setshowCard] = useState(false);
  const router = useRouter();
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;
  const scrollTo = useRef();
  const { artist_dropdown, seo, press_list_reorder } = artistPageData || {};
  const { name, name_cn, works_collapsed } = artistData[0] || {};
  const handleClick = () => {
    setshowCard(!showCard);
  };

  const sorted_interviewsData = useSort(interviewsData, press_list_reorder);

  const filtered_workImages = workImages.filter((item) => {
    if (item.image) {
      return item;
    }
  });

  useEffect(() => {
    scrollTo.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);

  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? name : name_cn} />
      <div className="mb-145">
        <div className="section mt-145">
          <StaticCard
            data={artistData[0]}
            fowardref={scrollTo}
            Component="h1"
          />
        </div>
        <div className="section mt-145">
          <DropDownCard
            Component="h2"
            title={
              router.locale == "en"
                ? artist_dropdown?.first_name
                : artist_dropdown?.first_name_cn
            }
          >
            <ArtistBio data={artistData[0]} />
          </DropDownCard>
        </div>
        {filtered_workImages && filtered_workImages.length != 0 && (
          <div className="section mt-30">
            <DropDownCard
              Component="h2"
              title={
                router.locale == "en"
                  ? artist_dropdown?.second_name
                  : artist_dropdown?.second_name_cn
              }
            >
              <ArtistWorksImageList
                data={filtered_workImages}
                works_collapsed={works_collapsed}
              />
            </DropDownCard>
          </div>
        )}

        {artistData[0].cv && (
          <div className="section mt-30">
            <DropDownCard
              Component="h2"
              title={
                router.locale == "en"
                  ? artist_dropdown?.third_name
                  : artist_dropdown?.third_name_cn
              }
            >
              <ExpoList data={artistData[0]} />
            </DropDownCard>
          </div>
        )}

        {sorted_interviewsData && sorted_interviewsData.length != 0 && (
          <div className="section mt-30 ">
            <DropDownCard
              Component="h2"
              title={
                router.locale == "en"
                  ? artist_dropdown?.fourth_name
                  : artist_dropdown?.fourth_name_cn
              }
            >
              <InterviewsList data={sorted_interviewsData} />
            </DropDownCard>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale, params }) => {
  const artistPageDataPromise = sanityClient.fetch(artist_page_data);
  const artistDataPromise = sanityClient.fetch(artist_data(params.slug));
  const workImagesPromise = sanityClient.fetch(work_images_data(params.slug));
  const interviewsDataPromise = sanityClient.fetch(
    interviews_data(params.slug)
  );

  const [artistPageData, artistData, workImages, interviewsData] =
    await Promise.all([
      artistPageDataPromise,
      artistDataPromise,
      workImagesPromise,
      interviewsDataPromise,
    ]);

  return {
    props: {
      workImages,
      artistData,
      interviewsData,
      artistPageData,
    },
  };
};