import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./VerticalLayout.module.css";
import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const VerticalLayout = ({
  name,
  name_cn,
  image,
  image_parameter,
  video,
  video_parameter,
  video_introduction,
  video_introduction_cn,
  introduction,
  introduction_cn,
  width,
  height,
  index,
  getIndex,
}) => {
  const router = useRouter();
  //console.log(12345);
  //console.log(width, height);
  return (
    <>
      {image && (
        <div>
          <div className="oneColumn">
            <div className={styles.topcontainer}>
              <img
                key={index}
                src={urlFor(image.asset).url()}
                alt={image.asset._ref}
                className={styles.img}
                onClick={() => {
                  getIndex(index);
                }}

                // layout="fill"
                // objectPosition="60% 40%"
                //when using layout fill, its parent element must be position relative and its parent must have a height.
              />
            </div>
          </div>
          <div className="mt-30">
            <div className={styles.grid}>
              <div className="col">
                {image_parameter && (
                  <span className="h4">
                    <BlockContent
                      blocks={image_parameter}
                      projectId="z3dq9mvc"
                      dataset="production"
                    />
                  </span>
                )}
              </div>
              <div className="col">
                {(name || name_cn) && (
                  <>
                    <p className="h2">
                      {router.locale == "en" ? name : name_cn}
                    </p>
                    <div className="mt-30"></div>
                  </>
                )}

                <div className="h3">
                  {(introduction || introduction_cn) && (
                    <BlockContent
                      blocks={
                        router.locale == "en" ? introduction : introduction_cn
                      }
                      projectId="z3dq9mvc"
                      dataset="production"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {video && (
        <div className="mt-145">
          <div className="oneColumn">
            <div className={styles.video_container}>
              <ReactPlayer
                url={video}
                width="100%"
                height="100%"
                controls={true}
                config={{
                  youtube: {
                    playerVars: { origin: "https://www.youtube.com" },
                  },
                }}
              />
            </div>
          </div>
          <div className="mt-30">
            <div className={styles.grid}>
              <div className="col">
                {video_parameter && (
                  <span className="h4">
                    <BlockContent
                      blocks={video_parameter}
                      projectId="z3dq9mvc"
                      dataset="production"
                    />
                  </span>
                )}
              </div>
              <div className="col">
                {(name || name_cn) && (
                  <>
                    <p className="h2">
                      {router.locale == "en" ? name : name_cn}
                    </p>
                    <div className="mt-30"></div>
                  </>
                )}
                <div className="h3">
                  {(video_introduction || video_introduction_cn) && (
                    <BlockContent
                      blocks={
                        router.locale == "en"
                          ? video_introduction
                          : video_introduction_cn
                      }
                      projectId="z3dq9mvc"
                      dataset="production"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default VerticalLayout;
