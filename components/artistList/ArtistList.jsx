import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ArtistList.module.css";
import Image from "next/image";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const ArtistList = ({ worksImages, artistsData }) => {
  const [showImage, setShowImage] = useState(false);
  const [targetImage, setTargetImage] = useState(null);
  const overArtist = (slug) => {
    //console.log(slug.current);
    setShowImage(true);
    const filtered_worksImages = worksImages.filter(
      (item) => item.author[0].slug.current == slug.current
    );
    //console.log(filtered_worksImages.length);
    let targetItem =
      filtered_worksImages[
        Math.floor(Math.random() * filtered_worksImages.length)
      ];
    console.log(targetItem);
    setTargetImage(targetItem);
  };

  //console.log(artistsData);
  const router = useRouter();
  return (
    <div className="twoColumn-11">
      <div className="col">
        {showImage && (
          <div className={styles.container}>
            <Image
              src={urlFor(targetImage.image.asset).url()}
              alt="works"
              className={styles.img}
            />
          </div>
        )}
      </div>
      <div className="col h3">
        <ul>
          {artistsData.map((artist, index) => {
            const { name, name_cn, slug } = artist;
            return (
              <div key={index} className="mt-28">
                <Link href={"/artists/" + slug.current}>
                  <li
                    key={index}
                    onMouseOver={() => {
                      overArtist(slug);
                    }}
                  >
                    {router.locale == "en" ? name : name_cn}
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
