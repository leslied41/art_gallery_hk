import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ImageList.module.css";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const ImageList = ({ workImages }) => {
  const [tempImage, settempImage] = React.useState("");
  const [model, setmodel] = React.useState(false);
  const [targetIndex, setTargetIndex] = useState(null);
  const [zoom, setzoom] = useState(false);
  const [imageCollection, setimageCollection] = useState([]);
  const imagesEl = useRef();

  useEffect(() => {
    const imageCollection = imagesEl.current.querySelectorAll("img");
    setimageCollection(imageCollection);

    //console.log(imageCollection);
    // [...imageCollection].map((image) => {
    //   image.style.transform = "translate(50%,50%)";
    // });
    // if (zoom) {
    //   [...imageCollection].map((image) => {});
    // }

    // if (!zoom) {
    //   [...imageCollection].map((image) => {});
    // }
  }, [zoom]);

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

  const resize = () => {
    setzoom(!zoom);

    if (!zoom) {
      [...imageCollection].map((image) => {
        //console.log(image);
        image.style.transform = ` scale(2) `;
      });
    }
    if (zoom) {
      [...imageCollection].map((image) => {
        //console.log(image);
        image.style.transform = `scale(1)`;
      });
    }
  };
  const mouseMove = (e) => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    const containerWidth = e.target.offsetWidth;
    const containerHeight = e.target.offsetHeight;

    const x = clientX - containerWidth / 2;
    const y = clientY - containerHeight / 2;

    console.log(x, y, containerWidth, containerHeight);
    if (zoom) {
      [...imageCollection].map((image) => {
        //console.log(image);
        image.style.transform =
          "translate(" + x + "px, " + y + "px) scale( 2 )";
      });
    }
  };
  return (
    <>
      <div className={model ? styles.open : styles.close}>
        <div className={styles.container} ref={imagesEl}>
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
          {workImages.map((item, index) => {
            return (
              <div
                className={styles.pic}
                style={targetIndex == index ? imgStyle2 : imgStyle1}
                key={index}
                onClick={resize}
                onMouseMove={(e) => {
                  mouseMove(e);
                }}
              >
                <img
                  src={urlFor(item.image.asset).url()}
                  alt="works"
                  className={styles.img_origin}
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
