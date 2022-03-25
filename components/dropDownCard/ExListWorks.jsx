import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import VerticalLayout from "../exhibitions_exhibition_staticcard/VerticalLayout";
import HorizontalLayout from "../exhibitions_exhibition_staticcard/HorizontalLayout";
import VideoLayout from "../exhibitions_exhibition_staticcard/VideoLayout.jsx";
import ReactPlayer from "react-player";
import { useRef, useState, useEffect, useLayoutEffect, createRef } from "react";
import styles from "./ExListWorks.module.css";
import { PortableText } from "@portabletext/react";
import { usePortableText } from "../usehooks/usePortableText";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const ExListWorks = ({ data }) => {
  //const { showCard } = useContext(dropDownContext);
  const { works, exhibition_works } = data;
  //console.log(exhibition_works);

  const [model, setmodel] = useState(false);
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

  const getIndex = (index) => {
    setTargetIndex(index);
    setmodel(true);
  };

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
    {
      exhibition_works &&
        setElRefs((elRefs) =>
          Array(exhibition_works.length)
            .fill()
            .map((_, index) => elRefs[index] || createRef())
        );
    }
  }, [exhibition_works ? exhibition_works.length : null]);

  useEffect(() => {
    if (model) {
      elRefs[targetIndex].current.style.transform = "scale(1)";
    }
  }, [targetIndex]);
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
            {exhibition_works &&
              exhibition_works.map((item, index) => {
                const { work_image, work_parameter, video_url } = item;
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
                      {work_image ? (
                        <img
                          key={index}
                          src={urlFor(work_image.asset).url()}
                          alt="works"
                          style={
                            index == targetIndex
                              ? {
                                  display: "block",
                                  maxWidth: "100%",
                                  objectFit: "contain",
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
                                    setTargetIndex(exhibition_works.length - 1);
                                  }
                                  if (targetIndex != 0) {
                                    setTargetIndex(targetIndex - 1);
                                  }
                                  //console.log("swiped left");
                                } else {
                                  // swiped right
                                  if (
                                    targetIndex ==
                                    exhibition_works.length - 1
                                  ) {
                                    setTargetIndex(0);
                                  }
                                  if (
                                    targetIndex !=
                                    exhibition_works.length - 1
                                  )
                                    setTargetIndex(targetIndex + 1);
                                  //console.log("swiped right");
                                }
                              } else {
                                // sliding vertically
                                if (diffY > 0) {
                                  // swiped up
                                  setmodel(false);
                                  setiszoomed(false);
                                  //console.log("swiped up");
                                } else {
                                  // swiped down
                                  setmodel(false);
                                  setiszoomed(false);
                                  //console.log("swiped down");
                                }
                              }
                              setswipeInitial({ x: null, y: null });
                            }

                            if (moving) {
                              move(e);
                            }
                          }}
                        />
                      ) : (
                        <div
                          ref={elRefs[index]}
                          className={styles.video_container}
                        >
                          <ReactPlayer
                            url={video_url}
                            width="100%"
                            height="100%"
                            controls={true}
                            config={{
                              youtube: {
                                playerVars: {
                                  origin: "https://www.youtube.com",
                                },
                              },
                            }}
                          />
                        </div>
                      )}
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
                        {work_parameter && usePortableText(work_parameter)}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          <div className="h3">
            <div
              className={styles.closeIcon}
              onClick={() => {
                setiszoomed(false);
                setmodel(false);
              }}
            >
              Close
            </div>
            <div
              className={styles.next}
              onClick={() => {
                setiszoomed(false);
                if (targetIndex == exhibition_works.length - 1) {
                  setTargetIndex(0);
                }
                if (targetIndex != exhibition_works.length - 1)
                  setTargetIndex(targetIndex + 1);
              }}
            >
              Next
            </div>
            <div
              className={styles.prev}
              ref={prevRef}
              onClick={() => {
                setiszoomed(false);
                if (targetIndex == 0) {
                  setTargetIndex(exhibition_works.length - 1);
                }
                if (targetIndex != 0) {
                  setTargetIndex(targetIndex - 1);
                }
              }}
            >
              Prev
            </div>
          </div>
        </div>
      </div>
      {/* <Collapsible showCard={showCard}> */}
      {exhibition_works &&
        exhibition_works.map((work, index) => {
          //const width = work.metadata?.metadata.dimensions.width;
          //const height = work.metadata?.metadata.dimensions.height;

          //const aspectRatio = work.metadata?.metadata.dimensions.aspectRatio;
          const {
            name,
            name_cn,
            work_image,
            work_parameter,
            introduction,
            introduction_cn,
            video_url,
            layout,
          } = work;

          //console.log(aspectRatio, width);
          return (
            <div key={index}>
              {video_url ? (
                <div key={index} className="mt-145">
                  <VideoLayout
                    name={name}
                    name_cn={name_cn}
                    image={work_image}
                    work_parameter={work_parameter}
                    video={video_url}
                    introduction={introduction}
                    introduction_cn={introduction_cn}
                    index={index}
                    getIndex={getIndex}
                  />
                </div>
              ) : layout == "Vertical" ? (
                <div key={index} className="mt-145">
                  <VerticalLayout
                    name={name}
                    name_cn={name_cn}
                    image={work_image}
                    work_parameter={work_parameter}
                    video={video_url}
                    introduction={introduction}
                    introduction_cn={introduction_cn}
                    index={index}
                    getIndex={getIndex}
                  />
                </div>
              ) : (
                <div key={index} className="mt-145">
                  <HorizontalLayout
                    name={name}
                    name_cn={name_cn}
                    image={work_image}
                    work_parameter={work_parameter}
                    video={video_url}
                    introduction={introduction}
                    introduction_cn={introduction_cn}
                    index={index}
                    getIndex={getIndex}
                  />
                </div>
              )}
            </div>
          );
        })}
      {/* </Collapsible> */}
    </>
  );
};
export default ExListWorks;
