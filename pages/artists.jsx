import Slider from "../components/slider/Slider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StaticCard from "../components/staticCard/StaticCard";
import sanityClient from "../client.js";
import ArtistList from "../components/artistList/ArtistList";

export default function Artists({ data, artistsData }) {
  const { briefSection } = data[0];
  //console.log(artistsData);
  return (
    <>
      <main>
        <div className="section mt-158">
          <StaticCard data={briefSection} />
        </div>
        <div className="section mt-118">
          <ArtistList data={artistsData} />
        </div>
      </main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const data = await sanityClient.fetch(
    `*[_type=='artists_page']{briefSection}`
  );
  const artistsData = await sanityClient.fetch(`*[_type=='artist']`);
  return {
    props: {
      data,
      artistsData,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
