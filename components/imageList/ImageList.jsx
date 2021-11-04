import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ImageList.module.css";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import BlockContent from "@sanity/block-content-to-react";
import useInView from "react-cool-inview";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const ImageList = ({ workImages }) => {
  console.log(workImages);
  const [tempImage, settempImage] = React.useState("");
  const [model, setmodel] = React.useState(false);
  const [targetIndex, setTargetIndex] = useState(null);

  // const { observe, inView } = useInView({
  //   onEnter: ({ unobserve }) => unobserve(),

  // });

  const [zoom, setzoom] = useState(false);
  const [clickTime, setclickTime] = useState(0);
  const [pressed, setpressed] = useState(false);

  const mouseDown = (e) => {
    setclickTime(new Date());
  };

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
    display: "flex",
    objectFit: "cover",
  };

  return (
    <>
      <div className={model ? styles.open : styles.close}>
        <div className={styles.container}>
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
          <div>
            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
              doubleClick={{ mode: "reset" }}
              wheel={{ disabled: true }}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                  <TransformComponent>
                    {workImages.map((item, index) => {
                      return (
                        <div
                          className={styles.pic}
                          //ref={observe}
                          style={targetIndex == index ? imgStyle2 : imgStyle1}
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();

                            if (new Date() - clickTime < 150) {
                              //console.log(zoom);
                              setzoom(!zoom);
                              if (zoom) {
                                zoomIn(1);
                                e.target.style.cursor = "zoom-out";
                              } else if (!zoom) {
                                zoomOut(1);
                                e.target.style.cursor = "zoom-in";
                              }
                            }
                          }}
                          onMouseDown={(e) => {
                            setpressed(true);
                            mouseDown(e);
                          }}
                          onMouseMove={(e) => {
                            if (pressed) {
                              e.target.style.cursor = "grab";
                            }
                          }}
                          onMouseUp={(e) => {
                            setpressed(false);
                            if (!zoom) {
                              e.target.style.cursor = "zoom-out";
                            } else if (zoom) {
                              e.target.style.cursor = "zoom-in";
                            }
                          }}
                        >
                          <Image
                            //src={logo}
                            src={urlFor(item.image.asset).url()}
                            alt="works"
                            layout="intrinsic"
                            width={item.metadata.metadata.dimensions.width}
                            height={item.metadata.metadata.dimensions.height}
                            objectFit="contain"
                            className={styles.img_origin}
                          />
                        </div>
                      );
                    })}
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
          <div>
            {workImages.map((item, index) => {
              return (
                <div
                  className={styles.image_parameter}
                  key={index}
                  style={targetIndex == index ? imgStyle2 : imgStyle1}
                >
                  <BlockContent
                    blocks={item.image_parameter}
                    projectId="z3dq9mvc"
                    dataset="production"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.gallery}>
        {workImages.map((item, index) => {
          return (
            <div className={styles.pics} key={item.image.asset._ref}>
              <Image
                src={urlFor(item.image.asset).height(500).width(400).url()}
                alt="works"
                height={500}
                width={400}
                layout="responsive"
                objectFit="cover"
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
