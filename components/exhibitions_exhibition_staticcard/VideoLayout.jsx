import styles from "./VideoLayout.module.css";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import { usePortableText } from "../usehooks/usePortableText.js";

const VideoLayout = ({
  name,
  name_cn,
  image,
  work_parameter,
  video,
  introduction,
  introduction_cn,
  index,
  getIndex,
}) => {
  const router = useRouter();
  const intro_portableText = usePortableText(
    router.locale == "en" ? introduction : introduction_cn
  );
  const parameter_portableText = usePortableText(work_parameter);
  //console.log(12345);
  //console.log(width, height);
  return (
    <>
      <div>
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
              {work_parameter && (
                <span className="h4">{parameter_portableText}</span>
              )}
            </div>
            <div className="col">
              {(name || name_cn) && (
                <>
                  <p className="h2">{router.locale == "en" ? name : name_cn}</p>
                  <div className="mt-30"></div>
                </>
              )}
              <div className="h3">
                {(introduction || introduction_cn) && intro_portableText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoLayout;
