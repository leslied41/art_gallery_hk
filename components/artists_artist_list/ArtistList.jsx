import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ArtistList.module.css";
import Image from "next/image";
import { useGlobalSettings } from "../context/GlobalSettings.jsx";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const ArtistList = ({ artistsData, artists_list_reorder }) => {
  const router = useRouter();
  const [showImage, setShowImage] = useState(false);
  const [targetImage, setTargetImage] = useState(null);
  const [mobile, setmobile] = useState();
  const [toTop, settoTop] = useState(0);
  const [stoTop, setstoTop] = useState();
  const [list_height, setlist_height] = useState();
  const [image_height, setimage_height] = useState();
  const [imgIsInViewport, setImgIsInViewport] = useState(null);
  const s_ref = useRef();
  const image_ref = useRef();
  const grid_ref = useRef();
  const original_order_artistData = artistsData.slice();

  const { showimg, over_footer } = useGlobalSettings();

  //console.log(showimg_context);

  original_order_artistData.sort(function (a, b) {
    let dateA = new Date(a._updatedAt).getTime();
    let dateB = new Date(b._updatedAt).getTime();
    return dateA > dateB ? 1 : -1;
  });
  artistsData.sort(function (a, b) {
    let nameA = a.name.split(" ").pop().toUpperCase(); // ignore upper and lowercase
    let nameB = b.name.split(" ").pop().toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  useEffect(() => {
    // setlist_height(s_ref.current.scrollHeight);

    // setstoTop(
    //   s_ref.current.getBoundingClientRect().top + window.scrollY ||
    //     window.pageYOffset
    // );
    if (window.innerWidth > 768) {
      setmobile(false);
    }
    if (window.innerWidth <= 768) {
      setmobile(true);
    }

    window.addEventListener("resize", () => {
      // {
      //   !mobile &&
      //     setstoTop(
      //       s_ref.current.getBoundingClientRect().top + window.scrollY ||
      //         window.pageYOffset
      //     );
      // }
      if (window.innerWidth > 768) {
        setmobile(false);
      }
      if (window.innerWidth <= 768) {
        setmobile(true);
      }
    });
  }, []);
  //check it element is in viewport
  // useEffect(() => {
  //   if (window.innerHeight > image_ref.current.getBoundingClientRect().bottom) {
  //     setImgIsInViewport(true);
  //     console.log("123");
  //   } else {
  //     setImgIsInViewport(false);
  //     console.log("321");
  //   }
  // }, [toTop]);

  // useEffect(() => {
  //   if (!mobile) {
  //     if (toTop - stoTop + image_height >= list_height) {
  //       // console.log(toTop - stoTop + image_height);
  //       // console.log(list_height);
  //       image_ref.current.style.bottom = `0px`;
  //       image_ref.current.style.top = null;
  //     } else {
  //       image_ref.current.style.top = `${toTop - stoTop}px`;
  //       // image_ref.current.style.top = `${
  //       //   window.innerHeight / 2 + window.scrollY || window.pageYOffset -  s_ref.current.getBoundingClientRect().top
  //       // }px`;

  //       image_ref.current.style.bottom = null;
  //     }
  //   }
  // }, [toTop, stoTop, image_height]);

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
    <div className={styles.grid}>
      <div
        className="col"
        style={{ position: "relative", width: "100%" }}
        ref={s_ref}
      >
        {!mobile && (
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
          {(artists_list_reorder ? artistsData : original_order_artistData).map(
            (artist, index) => {
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

                        !mobile &&
                          setTimeout(() => {
                            setimage_height(image_ref.current.clientHeight);
                          }, 50);

                        settoTop(
                          e.target.getBoundingClientRect().top +
                            window.scrollY || window.pageYOffset
                        );
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div>
                        {router.locale == "en"
                          ? name
                          : name_cn
                          ? name_cn
                          : name}
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
            }
          )}
        </ul>
      </div>
    </div>
  );
};
export default ArtistList;
