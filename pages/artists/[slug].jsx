import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import sanityClient from "../../client.js";
import StaticCard from "../../components/staticCard/StaticCard";
import DropDownCard from "../../components/dropDownCard/DropDownCard.jsx";
import { useRouter } from "next/router";
import { useState } from "react";
import ArtistBio from "../../components/dropDownCard/ArtistBio.jsx";
import ArtistWorksImageList from "../../components/dropDownCard/ArtistWorksImageList.jsx";
import ExpoList from "../../components/artists_artist_exhibition_list/ExpoList.jsx";
import InterviewsList from "../../components/dropDownCard/InterviewsList";

export default function Artist({
  artistData,
  workImages,
  exposData,
  interviewsData,
}) {
  //console.log(interviewsData);
  const newArray = exposData.map((item) => {
    return item.exhibition;
  });
  const filteredArray = newArray.filter((item) => item.length !== 0);
  const flatArray = [].concat.apply([], filteredArray);
  const arrayObject = flatArray.map((item) => JSON.stringify(item));
  const mergedArray_json = [];
  arrayObject.forEach((item) => {
    if (!mergedArray_json.includes(item)) {
      mergedArray_json.push(item);
    }
  });
  const mergedArray = mergedArray_json.map((item) => [JSON.parse(item)]);
  const [showCard, setshowCard] = useState(false);
  const handleClick = () => {
    setshowCard(!showCard);
  };
  const router = useRouter();
  //console.log(artistData);
  return (
    <>
      <main>
        <div className="section mt-158">
          <StaticCard data={artistData[0]} />
        </div>
        <div className="section mt-49">
          <DropDownCard title={router.locale == "en" ? "Bio" : "傳記"}>
            <ArtistBio data={artistData[0]} />
          </DropDownCard>
        </div>
        <div className="section mt-28">
          <DropDownCard title={router.locale == "en" ? "Works" : "作品"}>
            <ArtistWorksImageList data={workImages} />
          </DropDownCard>
        </div>

        <div className="section mt-28">
          <DropDownCard title={router.locale == "en" ? "Exhibitions" : "展覽"}>
            <ExpoList data={mergedArray} />
          </DropDownCard>
        </div>

        <div className="section mt-28">
          <DropDownCard title={router.locale == "en" ? "Interviews" : "專訪"}>
            <InterviewsList data={interviewsData} />
          </DropDownCard>
        </div>
      </main>
    </>
  );
}
export async function getStaticProps({ locale, params }) {
  const artistData = await sanityClient.fetch(
    `*[slug.current=='${params.slug}']`
  );
  const workImages = await sanityClient.fetch(
    `*[_type=='work'&& references(*[slug.current=='${params.slug}']{_id}[0]._id)]{image,image_parameter,'metadata':image.asset->{metadata}}`
  );
  // this is to fetch all the expos that one certain artis has ever participated.
  const exposData = await sanityClient.fetch(
    `*[_type=='work'&& references(*[slug.current=='${params.slug}']{_id}[0]._id)]{_id,'exhibition':*[_type=='exhibition'&&references(^._id)]{name_exo,name_exo_cn,date,date_cn,slug}}`
  );
  const interviewsData = await sanityClient.fetch(
    `*[_type=='interviews'&& references(*[slug.current=='${params.slug}']{_id}[0]._id)]`
  );
  console.log(exposData);
  return {
    props: {
      workImages,
      artistData,
      exposData,
      interviewsData,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
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
