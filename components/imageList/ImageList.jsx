import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ImageList.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const ImageList = ({ workImages }) => {
  const [tempImage, settempImage] = React.useState("");
  const [model, setmodel] = React.useState(false);
  const [targetIndex, setTargetIndex] = useState(null);
  const getImage = (image) => {
    settempImage(image);
    setmodel(true);
  };
  const getIndex = (index) => {
    setTargetIndex(index);
    setmodel(true);
  };
  const imgStyle1 = {
    width: "100%",
    display: "none",
  };
  const imgStyle2 = {
    width: "100%",
    display: "block",
    objectFit: "cover",
  };
  return (
    <>
      <div className={model ? styles.open : styles.close}>
        <div
          className={styles.closeIcon}
          onClick={() => {
            setmodel(false);
          }}
        >
          close
        </div>
        <div
          className={styles.next}
          onClick={() => {
            if (targetIndex == workImages.length - 1) {
              setTargetIndex(0);
            }
            if (targetIndex != workImages.length - 1)
              setTargetIndex(targetIndex + 1);
          }}
        >
          Next
        </div>
        <div
          className={styles.prev}
          onClick={() => {
            if (targetIndex == 0) {
              setTargetIndex(workImages.length - 1);
            }
            if (targetIndex != 0) {
              setTargetIndex(targetIndex - 1);
            }
          }}
        >
          Prev
        </div>

        <div className={styles.container}>
          {workImages.map((item, index) => {
            return (
              <div
                className={styles.pics}
                style={targetIndex == index ? imgStyle2 : imgStyle1}
                key={index}
              >
                <img
                  src={urlFor(item.image.asset).url()}
                  alt="works"
                  className={styles.img}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.gallery}>
        {workImages.map((item, index) => {
          return (
            <div className={styles.pics} key={index}>
              <img
                src={urlFor(item.image.asset).url()}
                alt="works"
                style={{ width: "100%" }}
                onClick={() => {
                  //getImage(item.image);
                  getIndex(index);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ImageList;
