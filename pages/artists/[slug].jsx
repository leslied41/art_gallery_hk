import sanityClient from "../../client.js";
import StaticCard from "../../components/staticCard/StaticCard";
import DropDownCard from "../../components/dropDownCard/DropDownCard.jsx";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import ArtistBio from "../../components/dropDownCard/ArtistBio.jsx";
import ArtistWorksImageList from "../../components/dropDownCard/ArtistWorksImageList.jsx";
import ExpoList from "../../components/artists_artist_exhibition_list/ExpoList.jsx";
import InterviewsList from "../../components/dropDownCard/InterviewsList";
import Heads from "../../components/head/Heads.jsx";
import { useGlobalSettings } from "../../components/context/GlobalSettings.jsx";

export default function Artist({
  artistData,
  workImages,
  interviewsData,
  artistPageData,
}) {
  const filtered_workImages = workImages.filter((item) => {
    if (item.image) {
      return item;
    }
  });
  // const newArray = exposData.map((item) => {
  //   return item.exhibition;
  // });
  // const filteredArray = newArray.filter((item) => item.length !== 0);
  // const flatArray = [].concat.apply([], filteredArray);
  // const arrayObject = flatArray.map((item) => JSON.stringify(item));
  // const mergedArray_json = [];
  // arrayObject.forEach((item) => {
  //   if (!mergedArray_json.includes(item)) {
  //     mergedArray_json.push(item);
  //   }
  // });
  // const mergedArray = mergedArray_json.map((item) => [JSON.parse(item)]);
  const [showCard, setshowCard] = useState(false);
  const handleClick = () => {
    setshowCard(!showCard);
  };
  const router = useRouter();
  //console.log(router.asPath);
  const { artist_dropdown, seo } = artistPageData || {};
  const { name, name_cn } = artistData[0] || {};
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
  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? name : name_cn} />
      <main className="mb-145">
        <div className="section mt-145">
          <StaticCard data={artistData[0]} fowardref={scrollTo} />
        </div>
        <div className="section mt-145">
          <DropDownCard
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
              title={
                router.locale == "en"
                  ? artist_dropdown?.second_name
                  : artist_dropdown?.second_name_cn
              }
            >
              <ArtistWorksImageList data={filtered_workImages} />
            </DropDownCard>
          </div>
        )}

        {artistData[0].cv && (
          <div className="section mt-30">
            <DropDownCard
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

        {interviewsData && interviewsData.length != 0 && (
          <div className="section mt-30 ">
            <DropDownCard
              title={
                router.locale == "en"
                  ? artist_dropdown?.fourth_name
                  : artist_dropdown?.fourth_name_cn
              }
            >
              <InterviewsList data={interviewsData} />
            </DropDownCard>
          </div>
        )}
      </main>
    </>
  );
}
export async function getStaticProps({ locale, params }) {
  const artistPageData = await sanityClient.fetch(
    `*[_type=='pages'&&name=='Artist'][0]{artist_dropdown,seo}`
  );
  const artistData = await sanityClient.fetch(
    `*[slug.current=='${params.slug}']{
  ...,
  "PDF": cv_pdf.asset->url
}`
  );
  const workImages = await sanityClient.fetch(
    `*[_type=='work'&& references(*[slug.current=='${params.slug}']{_id}[0]._id)]{image,image_parameter,'metadata':image.asset->{metadata}}`
  );
  // this is to fetch all the expos that one certain artis has ever participated.
  // const exposData = await sanityClient.fetch(
  //   `*[_type=='work'&& references(*[slug.current=='${params.slug}']{_id}[0]._id)]{_id,'exhibition':*[_type=='exhibition'&&references(^._id)]{name_exo,name_exo_cn,date,date_cn,slug}}`
  // );
  const interviewsData = await sanityClient.fetch(
    `*[_type=='interviews'&& references(*[slug.current=='${params.slug}']{_id}[0]._id)]`
  );
  //console.log(exposData);
  return {
    props: {
      workImages,
      artistData,
      interviewsData,
      artistPageData,
    },
    revalidate: 10,
  };
}
export async function getStaticPaths() {
  const artistsData = await sanityClient.fetch(`*[_type=='artist']`);
  const path_en = artistsData.map((artist) => {
    return { params: { slug: artist.slug.current }, locale: "en" };
  });
  const path_tc = artistsData.map((artist) => {
    return { params: { slug: artist.slug.current }, locale: "tc" };
  });
  const paths = path_en.concat(path_tc);
  //for the automatically created paths, different locales path were not created, it is essential to add
  //different locale path. Otherwise, this localiztion will not work.

  return {
    paths,
    fallback: false,
  };
}
