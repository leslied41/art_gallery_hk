import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ImageList.module.css";
import React, { useEffect, useState, useRef, createRef } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const ImageList = ({ workImages }) => {
  //console.log(workImages);
  const [tempImage, settempImage] = React.useState("");
  const [model, setmodel] = React.useState(false);
  const [targetIndex, setTargetIndex] = useState(null);

  const [zoom, setzoom] = useState(true);
  const [clickTime, setclickTime] = useState(0);
  const [pressed, setpressed] = useState(false);
  const [elRefs, setElRefs] = useState([]);
  const prevRef = useRef();

  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(workImages.length)
        .fill()
        .map((_, index) => elRefs[index] || createRef())
    );
  }, [workImages.length]);

  useEffect(() => {
    if (model) {
      if (
        elRefs[targetIndex].current.getBoundingClientRect().x <
        prevRef.current.getBoundingClientRect().x
      ) {
        prevRef.current.style.color = "red";
      } else {
        prevRef.current.style.color = "black";
      }
    }
  }, [targetIndex, zoom]);
  const zoomup = () => {
    elRefs[targetIndex].current.style.transform = `scale(2)`;
  };
  const zoomdown = () => {
    elRefs[targetIndex].current.style.transform = `scale(1)`;
  };
  //I need to use useref to get the div pic 's element and get its getboudingclientreact,
  //then get the three buttons next prev close's postion to check it they are overlapped.
  //but now the problem is that useref cannnot be used in loop, as there be only one ref.
  //therefore, I need to figure out how to get a ref collection and then according to the targetindex to
  //get the displayed one to judge the overlap thing.
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
            ref={prevRef}
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
                          style={
                            targetIndex == index
                              ? {
                                  width: "auto",
                                  display: "flex",
                                }
                              : {
                                  display: "none",
                                }
                          }
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            if (new Date() - clickTime < 150) {
                              if (zoom) {
                                zoomIn(0.691);
                                //zoomup();
                                console.log(
                                  elRefs[
                                    targetIndex
                                  ].current.getBoundingClientRect().width
                                );
                                setzoom(false);
                                e.target.style.cursor = "zoom-out";
                              } else if (!zoom) {
                                zoomOut(0.691);
                                //zoomdown();
                                console.log(
                                  elRefs[
                                    targetIndex
                                  ].current.getBoundingClientRect().width
                                );

                                e.target.style.cursor = "zoom-in";
                                setzoom(true);
                              }
                            }
                          }}
                          onMouseDown={(e) => {
                            setpressed(true);
                            mouseDown(e);
                          }}
                          onMouseMove={(e) => {
                            if (pressed) {
                              e.target.style.cursor = "move";
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
                          {/* <Image
                            //src={logo}
                            src={urlFor(item.image.asset).url()}
                            alt="works"
                            layout="intrinsic"
                            width={item.metadata.metadata.dimensions.width}
                            height={item.metadata.metadata.dimensions.height}
                            objectFit="contain"
                            className={styles.img_origin}
                          /> */}
                          <img
                            src={urlFor(item.image.asset).url()}
                            alt="works"
                            ref={elRefs[index]}
                            style={{
                              height: "100%",
                              objectFit: "contain",
                            }}
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
                  style={
                    targetIndex == index
                      ? {
                          width: "100%",
                          display: "flex",
                          objectFit: "cover",
                        }
                      : {
                          width: "100%",
                          display: "none",
                        }
                  }
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
