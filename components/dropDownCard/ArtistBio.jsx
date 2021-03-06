import { useRouter } from "next/router";
import styles from "./ArtistBio.module.css";
import Image from "next/image";
import Collapsible from "../collapsible/Collapsible";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { dropDownContext } from "./DropDownCard";
import sanityClient from "../../client.js";
import imageUrlBuilder from "@sanity/image-url";
import { usePortableText } from "../usehooks/usePortableText";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const ArtistBio = ({ data }) => {
  const { showCard, setshowCard } = useContext(dropDownContext);
  const { bio, bio_cn, profile, bio_collapsed } = data;
  //console.log(profile);
  const router = useRouter();
  //console.log(bio_collapsed);
  const [mobile, setmobile] = useState();
  useEffect(() => {
    if (!bio_collapsed) {
      setshowCard(false);
    }
    if (bio_collapsed) {
      setshowCard(true);
    }

    if (window.innerWidth > 760) {
      setmobile(false);
    }
    if (window.innerWidth <= 760) {
      setmobile(true);
    }
    window.addEventListener("resize", () => {
      //console.log(window.innerWidth);
      if (window.innerWidth > 760) {
        setmobile(false);
      }
      if (window.innerWidth <= 760) {
        setmobile(true);
      }
    });
  }, []);

  return (
    <>
      <Collapsible showCard={showCard}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className="mt-30" style={{ display: "block", width: "100%" }}>
              {profile && (
                <Image
                  src={urlFor(profile.asset).url()}
                  alt={"profile"}
                  width={654}
                  height={437}
                  layout="responsive"
                  className={styles.profileImg}
                />
              )}
            </div>
          </div>
          <div className={styles.col}>
            <div className="mt-28 h3">
              {usePortableText(router.locale == "en" ? bio : bio_cn)}
            </div>
          </div>
        </div>
      </Collapsible>
    </>
  );
};
export default ArtistBio;
