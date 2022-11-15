import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import sanityClient from "../client.js";
import StaticCard from "../components/staticCard/StaticCard";
import ArtistList from "../components/artists_artist_list/ArtistList";
import Heads from "../components/head/Heads.jsx";
import { usePathHistory } from "../components/context/PathHistory";
import { artists_page_data, artists_data } from "../groq";
import styles from "../styles/artists.module.css";

export default function Artists({ data, artistsData }) {
  const scrollTo = useRef();
  const router = useRouter();
  const { popup } = usePathHistory();
  const { briefSection, seo, artists_list_reorder } = data[0];
  const [popup_path, setpopup_path] = popup;

  useEffect(() => {
    scrollTo.current.scrollIntoView();
  }, []);

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);
  return (
    <>
      <Heads seo={seo} name={router.locale == "en" ? "Artists" : "藝術家"} />
      <div>
        <div className="section">
          <div className={styles.gap}>
            <StaticCard
              data={briefSection}
              fowardref={scrollTo}
              Component="h1"
            />
          </div>
        </div>
        <div className="section ">
          <div className={styles.gap}>
            <ArtistList
              artistsData={artistsData}
              artists_list_reorder={artists_list_reorder}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const dataPromise = sanityClient.fetch(artists_page_data);
  const artistsDataPromise = sanityClient.fetch(artists_data);

  const [data, artistsData] = await Promise.all([
    dataPromise,
    artistsDataPromise,
  ]);

  return {
    props: {
      data,
      artistsData,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}
