import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ImageList.module.css";
import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  useCallback,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";
import LoadMoreCard from "../loadMoreCard/LoadMoreCard.jsx";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const ImageList = ({
  workImages,
  showCard,
  slicedWorkImages,
  loaded,
  loadMore,
}) => {
  const [model, setmodel] = React.useState(false);
  const [targetIndex, setTargetIndex] = useState(null);
  const [iszoomed, setiszoomed] = useState(false);
  const [clickTime, setclickTime] = useState(0);
  const prevRef = useRef();
  const [isMobile, setisMobile] = useState(null);
  const [moveDis, setmoveDis] = useState({ x: 0, y: 0 });
  const [startingPoint, setstartingPoint] = useState({ x: 0, y: 0 });
  const [moving, setmoving] = useState(false);
  const [imageSize, setimageSize] = useState({ x: 0, y: 0 });
  const [windowHeight, setwindowHeight] = useState();
  const [windowWidth, setwindowWidth] = useState();
  const [elRefs, setElRefs] = useState([]);
  const [swipeInitial, setswipeInitial] = useState({ x: null, y: null });

  useEffect(() => {
    setwindowHeight(window.innerHeight);
    setwindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setisMobile(true);
    } else if (window.innerWidth >= 768) {
      setisMobile(false);
    }
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setisMobile(true);
        //console.log(isMobile);
      } else if (window.innerWidth >= 768) {
        setisMobile(false);
        //console.log(isMobile);
      }
    });
  }, []);

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
      elRefs[targetIndex].current.style.transform = "scale(1)";
    }
  }, [targetIndex]);

  const getIndex = (index) => {
    setTargetIndex(index);
    setmodel(true);
  };

  const mouseDown = (e) => {
    setclickTime(new Date());
    setstartingPoint({
      x: e.clientX - moveDis.x,
      y: e.clientY - moveDis.y,
    });
    setmoving(true);
    setimageSize({
      x: e.target.getBoundingClientRect().width,
      y: e.target.getBoundingClientRect().height,
    });
  };

  const zoomin = (e) => {
    e.target.style.transform = "scale(2)";
  };
  const zoomout = (e) => {
    e.target.style.transform = "scale(1)";
  };
  const move = (e) => {
    if (iszoomed) {
      if (
        windowWidth - imageSize.x < 0 &&
        moveDis.x < (windowWidth - imageSize.x) / 2
      ) {
        moveDis.x = (windowWidth - imageSize.x) / 2;
      }

      if (
        windowWidth - imageSize.x < 0 &&
        moveDis.x > (imageSize.x - windowWidth) / 2
      ) {
        moveDis.x = (imageSize.x - windowWidth) / 2;
      }
      if (windowWidth - imageSize.x > 0) {
        moveDis.x = 0;
      }

      if (
        moveDis.y >
        (imageSize.y - !iszoomed ? windowHeight * 0.8 : windowHeight) / 2
      ) {
        moveDis.y =
          (imageSize.y - !iszoomed ? windowHeight * 0.8 : windowHeight) / 2 +
          50;
      }
      if (
        moveDis.y <
        (!iszoomed ? windowHeight * 0.8 : windowHeight - imageSize.y) / 2
      ) {
        moveDis.y =
          (!iszoomed ? windowHeight * 0.8 : windowHeight - imageSize.y) / 2;
      }

      e.target.style.transform =
        "translate(" + moveDis.x + "px, " + moveDis.y + "px) scale(2) ";
    }
  };
  return (
    <>
      <div className={model ? styles.open : styles.close}>
        <div className={styles.container}>
          <div
            style={{
              height: "100vh",
            }}
          >
            {workImages.map((item, index) => {
              return (
                <div
                  key={index}
                  style={
                    index == targetIndex
                      ? {
                          height: "100vh",
                          width: "100vw",
                        }
                      : { display: "none" }
                  }
                >
                  <div
                    key={index}
                    style={
                      index == targetIndex
                        ? iszoomed
                          ? {
                              display: "flex",
                              height: "100vh",
                              overflow: "hidden",
                              width: "100%",
                              justifyContent: "center",
                            }
                          : {
                              display: "flex",
                              height: "80vh",
                              overflow: "hidden",
                              width: "100%",
                              justifyContent: "center",
                            }
                        : { display: "none" }
                    }
                  >
                    <img
                      key={index}
                      src={urlFor(item.image.asset).url()}
                      alt="works"
                      style={
                        index == targetIndex
                          ? {
                              display: "block",
                              height: "100%",
                              cursor: "zoom-in",
                            }
                          : { display: "none" }
                      }
                      ref={elRefs[index]}
                      onClick={(e) => {
                        e.preventDefault();
                        if (new Date() - clickTime < 150) {
                          if (!iszoomed) {
                            zoomin(e);
                            setiszoomed(true);
                          }
                          if (iszoomed) {
                            zoomout(e);
                            setiszoomed(false);
                            setmoveDis({ x: 0, y: 0 });
                          }
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        mouseDown(e);
                        e.target.style.cursor = "grab";
                      }}
                      onTouchStart={(e) => {
                        e.cancelable && e.preventDefault();
                        setstartingPoint({
                          x: e.changedTouches[0].clientX - moveDis.x,
                          y: e.changedTouches[0].clientY - moveDis.y,
                        });
                        setmoving(true);
                        setimageSize({
                          x: e.target.getBoundingClientRect().width,
                          y: e.target.getBoundingClientRect().height,
                        });
                        setswipeInitial({
                          x: e.touches[0].clientX,
                          y: e.touches[0].clientY,
                        });
                      }}
                      onMouseUp={(e) => {
                        setmoving(false);
                        e.target.style.cursor = "zoom-in";
                      }}
                      onTouchEnd={() => {
                        setmoving(false);
                      }}
                      onMouseMove={(e) => {
                        e.preventDefault();
                        if (!moving) {
                          return;
                        }
                        setmoveDis({
                          x: e.clientX - startingPoint.x,
                          y: e.clientY - startingPoint.y,
                        });
                        move(e);
                      }}
                      onTouchMove={(e) => {
                        e.cancelable && e.preventDefault();

                        setmoveDis({
                          x: e.changedTouches[0].clientX - startingPoint.x,
                          y: e.changedTouches[0].clientY - startingPoint.y,
                        });
                        if (swipeInitial.x == null) {
                          return;
                        }
                        if (swipeInitial.y == null) {
                          return;
                        }
                        let diffX = swipeInitial.x - e.touches[0].clientX;
                        let diffY = swipeInitial.y - e.touches[0].clientY;
                        if (!iszoomed) {
                          if (Math.abs(diffX) > Math.abs(diffY)) {
                            // sliding horizontally
                            if (diffX > 0) {
                              // swiped left
                              if (targetIndex == 0) {
                                setTargetIndex(workImages.length - 1);
                              }
                              if (targetIndex != 0) {
                                setTargetIndex(targetIndex - 1);
                              }
                              console.log("swiped left");
                            } else {
                              // swiped right
                              if (targetIndex == workImages.length - 1) {
                                setTargetIndex(0);
                              }
                              if (targetIndex != workImages.length - 1)
                                setTargetIndex(targetIndex + 1);
                              console.log("swiped right");
                            }
                          } else {
                            // sliding vertically
                            if (diffY > 0) {
                              // swiped up
                              setmodel(false);
                              console.log("swiped up");
                            } else {
                              // swiped down
                              setmodel(false);
                              console.log("swiped down");
                            }
                          }
                          setswipeInitial({ x: null, y: null });
                        }

                        if (moving) {
                          move(e);
                        }
                      }}
                    />
                  </div>
                  {!iszoomed && (
                    <div
                      style={
                        index == targetIndex
                          ? {
                              display: "flex",
                              height: "20vh",
                              justifyContent: "center",
                              alignItems: "center",
                            }
                          : { display: "none" }
                      }
                    >
                      <BlockContent
                        blocks={item.image_parameter}
                        projectId="z3dq9mvc"
                        dataset="production"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {!isMobile && (
            <div className="h3">
              <div
                className={styles.closeIcon}
                onClick={() => {
                  setmodel(false);
                }}
              >
                Close
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
            </div>
          )}
        </div>
      </div>
      {/* image gallery */}
      <div className={styles.gallery}>
        {isMobile &&
          slicedWorkImages.map((item, index) => {
            return (
              <div
                className={styles.pics}
                style={{ marginBottom: "18px" }}
                key={item.image.asset._ref}
              >
                <Image
                  src={urlFor(item.image.asset).url()}
                  alt={index}
                  className={styles.thumbnail}
                  //style={{ height: "auto", width: "100%" }}
                  layout="intrinsic"
                  height={item.metadata.metadata.dimensions.height}
                  width={item.metadata.metadata.dimensions.width}
                  onClick={() => {
                    //getImage(item.image);
                    getIndex(index);
                  }}
                />
              </div>
            );
          })}
        {!isMobile &&
          workImages.map((item, index) => {
            return (
              <div
                className={styles.pics}
                style={{ marginBottom: "30px" }}
                key={item.image.asset._ref}
              >
                <Image
                  src={urlFor(item.image.asset).url()}
                  alt={index}
                  className={styles.thumbnail}
                  //style={{ height: "auto", width: "100%" }}
                  layout="intrinsic"
                  height={item.metadata.metadata.dimensions.height}
                  width={item.metadata.metadata.dimensions.width}
                  onClick={() => {
                    //getImage(item.image);
                    getIndex(index);
                  }}
                />
              </div>
            );
          })}
        {isMobile && (
          <div>
            <LoadMoreCard loaded={loaded} loadMore={loadMore} />
          </div>
        )}
      </div>
    </>
  );
};
export default ImageList;
