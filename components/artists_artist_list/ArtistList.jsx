import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  const [toTop, settoTop] = useState(0);
  const [stoTop, setstoTop] = useState();
  const s_ref = useRef();
  const image_ref = useRef();
  useEffect(() => {
    setstoTop(
      s_ref.current.getBoundingClientRect().top + window.scrollY ||
        window.pageYOffset
    );
    if (window.innerWidth > 768) {
      setmobile(false);
    }
    if (window.innerWidth <= 768) {
      setmobile(true);
    }
    window.addEventListener("resize", () => {
      {
        !mobile &&
          setstoTop(
            s_ref.current.getBoundingClientRect().top + window.scrollY ||
              window.pageYOffset
          );
      }
      if (window.innerWidth > 768) {
        setmobile(false);
      }
      if (window.innerWidth <= 768) {
        setmobile(true);
      }
    });
  }, []);

  useEffect(() => {
    !mobile ? (image_ref.current.style.top = `${toTop - stoTop}px`) : null;
  }, [toTop, stoTop]);

  const overArtist = (slug) => {
    let targetArtist = artistsData.filter(
      (artist) => artist.slug.current == slug.current
    );
    console.log(targetArtist);
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
      <div className="col" style={{ position: "relative" }} ref={s_ref}>
        {!mobile && (
          <div
            className={styles.container}
            ref={image_ref}
            style={showImage ? { display: "block" } : { display: "none" }}
          >
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
                    onMouseOver={(e) => {
                      overArtist(slug);
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
