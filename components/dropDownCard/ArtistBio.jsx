import { useRouter } from "next/router";
import styles from "./ArtistBio.module.css";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import Image from "next/image";
import Collapsible from "../collapsible/Collapsible";
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}
const ArtistBio = ({ data, handleClick, showCard, title }) => {
  const { bio, bio_cn, profile } = data;
  const router = useRouter();
  console.log(router.locale);

  return (
    <>
      <div className="twoColumn-11">
        <div className={styles.col}>
          {showCard && (
            <div className={styles.profile}>
              <Image
                src={urlFor(profile.asset).url()}
                alt={"profile"}
                width={600}
                height={600}
                layout="responsive"
                className={styles.profileImg}
              />
            </div>
          )}
        </div>
        <div className={styles.col}>
          <div className="title">
            <span className="h2" onClick={handleClick}>
              {title} {showCard ? "-" : "+"}
            </span>
          </div>

          <Collapsible showCard={showCard}>
            <div className="mt-28">
              <span className="h3">
                <BlockContent
                  blocks={router.locale == "en" ? bio : bio_cn}
                  projectId="z3dq9mvc"
                  dataset="production"
                />
              </span>
            </div>
          </Collapsible>
          <div className="hr-bottom">
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};
export default ArtistBio;
