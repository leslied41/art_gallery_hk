import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StaticCard from "../components/staticCard/StaticCard";
import sanityClient from "../client.js";
import ArtistList from "../components/artists_artist_list/ArtistList";
import styles from "../styles/artists.module.css";

export default function Artists({ data, artistsData, worksImages }) {
  const { briefSection } = data[0];
  //console.log(artistsData);
  return (
    <>
      <main>
        <div className="section">
          <div className={styles.gap}>
            <StaticCard data={briefSection} />
          </div>
        </div>
        <div className="section ">
          <div className={styles.gap}>
            <ArtistList artistsData={artistsData} />
          </div>
        </div>
      </main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const data = await sanityClient.fetch(
    `*[_type=='pages'&&name=='Artists']{briefSection}`
  );
  // const worksImages = await sanityClient.fetch(
  //   `*[_type=='work']{image,author[]->{name,slug}}`
  // );
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
