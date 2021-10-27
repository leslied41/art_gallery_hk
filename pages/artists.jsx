import Slider from "../components/slider/Slider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StaticCard from "../components/staticCard/StaticCard";
import sanityClient from "../client.js";
import ArtistList from "../components/artistList/ArtistList";

export default function Artists({ data, artistsData, worksImages }) {
  const { briefSection } = data[0];
  //console.log(artistsData);
  return (
    <>
      <main>
        <div className="section mt-158">
          <StaticCard data={briefSection} />
        </div>
        <div className="section mt-118">
          <ArtistList artistsData={artistsData} worksImages={worksImages} />
        </div>
      </main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const data = await sanityClient.fetch(
    `*[_type=='artists_page']{briefSection}`
  );
  const worksImages = await sanityClient.fetch(
    `*[_type=='work']{image,author[]->{name,slug}}`
  );
  const artistsData = await sanityClient.fetch(`*[_type=='artist']`);
  return {
    props: {
      worksImages,
      data,
      artistsData,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
