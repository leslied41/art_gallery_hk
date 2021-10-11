import styles from "./FoundersInfo.module.css";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function FoundersInfo({ founder }) {
  return (
    <>
      <div className="twoColumn-11">
        {founder.map((person, index) => {
          const { asset, bio, name, socialMedia } = person;

          console.log(socialMedia);
          return (
            <div className={styles.col} key={index}>
              <div className={styles.profile}>
                <img
                  src={urlFor(asset).width(616).height(692).url()}
                  alt={name}
                  className={styles.profileImg}
                />
              </div>
              <div className={styles.title}>
                <span className="h2">{name}</span>
              </div>
              <div className={styles.bio}>
                <span className="h3">
                  <BlockContent
                    blocks={bio}
                    projectId="z3dq9mvc"
                    dataset="production"
                  />
                </span>
              </div>
              <div>
                {socialMedia &&
                  socialMedia.map((item, index) => {
                    const { platform, url } = item;

                    return (
                      <div key={index} className="h4">
                        <a href={url}>
                          {platform == "Website" ? url : platform}
                        </a>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
        <hr className={styles.hr} />
      </div>
    </>
  );
}
