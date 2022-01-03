import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ArtistList.module.css";
import Image from "next/image";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const ArtistList = ({ artistsData }) => {
  const router = useRouter();
  const [showImage, setShowImage] = useState(false);
  const [targetImage, setTargetImage] = useState(null);
  const [mobile, setmobile] = useState();
  useEffect(() => {
    if (window.innerWidth > 768) {
      setmobile(false);
    }
    if (window.innerWidth <= 768) {
      setmobile(true);
    }
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
      if (window.innerWidth > 768) {
        setmobile(false);
      }
      if (window.innerWidth <= 768) {
        setmobile(true);
      }
    });
  }, []);
  const overArtist = (slug) => {
    let targetArtist = artistsData.filter(
      (artist) => artist.slug.current == slug.current
    );
    //console.log(targetArtist);
    let targetImg = targetArtist[0].masterpiece;
    setTargetImage(targetImg);
    setShowImage(true);
  };
  const leaverArtist = () => [setShowImage(false)];

  return (
    <div
      className={styles.grid}
      onMouseLeave={() => {
        leaverArtist();
      }}
    >
      <div className="col">
        {!mobile && showImage && (
          <div className={styles.container}>
            {targetImage && (
              <Image
                src={urlFor(targetImage.asset).width(647).height(431).url()}
                alt="works"
                objectFit="cover"
                layout="intrinsic"
                width="647"
                height="431"
              />
            )}
          </div>
        )}
      </div>
      <div className="col h2">
        <ul>
          {artistsData.map((artist, index) => {
            const { name, name_cn, slug, _id, masterpiece } = artist;
            return (
              <div key={_id} className={styles.gap}>
                <Link href={"/artists/" + slug.current}>
                  <li
                    key={index}
                    onMouseOver={() => {
                      overArtist(slug);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      {router.locale == "en" ? name : name_cn ? name_cn : name}
                    </div>
                    {mobile && (
                      <div style={{ marginTop: "18px" }}>
                        {masterpiece && (
                          <Image
                            src={urlFor(masterpiece.asset)
                              .width(624)
                              .height(468)
                              .url()}
                            alt="works"
                            objectFit="cover"
                            layout="intrinsic"
                            width="624"
                            height="468"
                          />
                        )}
                      </div>
                    )}
                  </li>
                </Link>

                <hr className="hr-top" />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default ArtistList;
