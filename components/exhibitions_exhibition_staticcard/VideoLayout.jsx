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
const VideoLayout = ({
  name,
  name_cn,
  introduction,
  introduction_cn,
  video_url,
  video_parameter,
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
      <div>
        <div className="oneColumn">
          <div className={styles.topcontainer}>
            <ReactPlayer url={video_url} />
          </div>
        </div>
        <div className="mt-30">
          <div className={styles.grid}>
            <div className="col">
              <span className="h4">
                <BlockContent
                  blocks={video_parameter}
                  projectId="z3dq9mvc"
                  dataset="production"
                />
              </span>
            </div>
            <div className="col">
              {(name || name_cn) && (
                <>
                  <p className="h2">{router.locale == "en" ? name : name_cn}</p>
                  <div className="mt-30"></div>
                </>
              )}

              <div className="h3">
                <BlockContent
                  blocks={
                    router.locale == "en" ? introduction : introduction_cn
                  }
                  projectId="z3dq9mvc"
                  dataset="production"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoLayout;
