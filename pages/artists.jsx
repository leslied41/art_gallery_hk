import StaticCard from "../components/staticCard/StaticCard";
import sanityClient from "../client.js";
import ArtistList from "../components/artists_artist_list/ArtistList";
import styles from "../styles/artists.module.css";
import Heads from "../components/head/Heads.jsx";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useGlobalSettings } from "../components/context/GlobalSettings";
import useScrollTo from "../components/scrollto/ScrollTo";

export default function Artists({ data, artistsData, worksImages }) {
  const { briefSection, seo } = data[0];
  const scrollTo = useRef();
  const router = useRouter();
  const { settings, popup } = useGlobalSettings();
  const [popup_path, setpopup_path] = popup;

  useEffect(() => {
    scrollTo.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);
  console.log(popup_path);
  //console.log(artistsData);
  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "Artists" : "藝術家"} />
      <main>
        <div className="section">
          <div className={styles.gap}>
            <StaticCard data={briefSection} fowardref={scrollTo} />
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
    `*[_type=='pages'&&name=='Artists']{briefSection,seo}`
  );
  // const worksImages = await sanityClient.fetch(
  //   `*[_type=='work']{image,author[]->{name,slug}}`
  // );
  const artistsData = await sanityClient.fetch(`*[_type=='artist']`);
  return {
    props: {
      data,
      artistsData,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}
