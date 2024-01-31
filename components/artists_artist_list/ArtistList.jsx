import { useState, useEffect, useRef, memo, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ArtistList.module.css";
import Image from "next/image";
import { useGlobalSettings } from "../context/GlobalSettings.jsx";
import { useBreakPoints } from "../usehooks/useBreakPoints.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const ArtistList = ({ artistsData, artists_list_reorder }) => {
  const router = useRouter();
  const [showImage, setShowImage] = useState(false);
  const [targetImage, setTargetImage] = useState(null);
  const [toTop, settoTop] = useState(0);
  const [stoTop, setstoTop] = useState();
  const [list_height, setlist_height] = useState();
  const [image_height, setimage_height] = useState();
  const [imgIsInViewport, setImgIsInViewport] = useState(null);
  const s_ref = useRef();
  const image_ref = useRef();
  const grid_ref = useRef();
  const { isMobile } = useBreakPoints();
  const { showimg, over_footer } = useGlobalSettings();

  // const alphabetic_sorted_artists_data = useMemo(() => {
  //   const sorted = artistsData.slice().sort(function (a, b) {
  //     let nameA = a.name.split(" ").pop().toUpperCase(); // ignore upper and lowercase
  //     let nameB = b.name.split(" ").pop().toUpperCase(); // ignore upper and lowercase
  //     if (nameA < nameB) {
  //       return -1;
  //     }
  //     if (nameA > nameB) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   return sorted;
  // }, [artistsData]);

  const time_sorted_artists_data = useMemo(() => {
    const sorted = artistsData.slice().sort((a, b) => {
      const timeA = new Date(a.time_for_reorder).getTime();
      const timeB = new Date(b.time_for_reorder).getTime();
      return timeB - timeA;
    });
    return sorted;
  }, [artistsData]);

  const latest_sorted_artists_data = useMemo(
    () =>
      artistsData.slice().sort(function (a, b) {
        let dateA = new Date(a._updatedAt).getTime();
        let dateB = new Date(b._updatedAt).getTime();
        return dateA > dateB ? 1 : -1;
      }),
    [artistsData]
  );

  const overArtist = (slug) => {
    let targetArtist = artistsData.filter(
      (artist) => artist.slug.current == slug.current
    );
    let targetImg = targetArtist[0].masterpiece;
    setTargetImage(targetImg);
    setShowImage(true);
  };

  const leaverArtist = () => [setShowImage(false)];

  return (
    <div className={styles.grid}>
      <div
        className="col"
        style={{ position: "relative", width: "100%" }}
        ref={s_ref}
      >
        {!isMobile && (
          <div
            className={styles.container}
            ref={image_ref}
            style={
              over_footer
                ? showImage && showimg
                  ? {
                      position: "absolute",
                      bottom: "0px",
                      width: "88%",
                      display: "block",
                    }
                  : { display: "none" }
                : showImage && showimg
                ? {
                    display: "block",
                    position: "fixed",
                    top: "50%",
                    width: "40%",
                    transform: "translateY(-50%)",
                  }
                : { display: "none" }
            }
          >
            {targetImage && (
              <Image
                src={urlFor(targetImage.asset).url()}
                alt="works"
                objectFit="cover"
                layout="responsive"
                width="647"
                height="431"
              />
            )}
          </div>
        )}
      </div>
      <div className="col h2" ref={grid_ref}>
        <ul>
          {(artists_list_reorder
            ? time_sorted_artists_data
            : latest_sorted_artists_data
          ).map((artist, index) => {
            const { name, name_cn, slug, _id, masterpiece } = artist;
            const length = artistsData.length;
            return (
              <div key={_id} className={styles.gap}>
                <Link href={"/artists/" + slug.current}>
                  <li
                    key={index}
                    onMouseLeave={() => {
                      leaverArtist();
                    }}
                    onMouseOver={(e) => {
                      overArtist(slug);

                      !isMobile &&
                        setTimeout(() => {
                          setimage_height(image_ref.current.clientHeight);
                        }, 50);

                      settoTop(
                        e.target.getBoundingClientRect().top + window.scrollY ||
                          window.pageYOffset
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      {router.locale == "en" ? name : name_cn ? name_cn : name}
                    </div>
                    {isMobile && (
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
export default memo(ArtistList);
