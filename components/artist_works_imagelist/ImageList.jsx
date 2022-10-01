import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ImageList.module.css";
import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  useCallback,
  memo,
} from "react";
import Image from "next/image";
import LoadMoreCard from "../loadMoreCard/LoadMoreCard.jsx";
import { PortableText } from "@portabletext/react";
import { useThrottle } from "../usehooks/useThrottle.js";
import { useBreakPoints } from "../usehooks/useBreakPoints.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const SampleImageComponent = ({ value }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <img
      src={urlFor().image(value).fit("max").auto("format").url()}
      alt={value.alt || " "}
      loading="lazy"
      style={
        width / height >= 1
          ? {
              // Avoid jumping around with aspect-ratio CSS property
              //aspectRatio: width / height,
              objectFit: "contain",
              width: "100%",
            }
          : {
              objectFit: "contain",
              height: "100%",
            }
      }
    />
  );
};

const serializers = {
  marks: {
    link: ({ children, value }) =>
      value.blank ? (
        <a href={value.href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <a href={value.href}>{children}</a>
      ),
  },
  types: {
    image: SampleImageComponent,
  },
  block: {
    // Ex. 2: rendering custom styles
    Text_block_large: ({ children }) => <p className="h2">{children}</p>,
    Text_block_small: ({ children }) => <p className="h3">{children}</p>,
    Text_block_reference: ({ children }) => <p className="h7">{children}</p>,
  },
};

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
  const [startingPoint, setstartingPoint] = useState({ x: 0, y: 0 });
  const [moving, setmoving] = useState(false);
  const [imageSize, setimageSize] = useState({ x: 0, y: 0 });
  const [windowHeight, setwindowHeight] = useState();
  const [windowWidth, setwindowWidth] = useState();
  const [elRefs, setElRefs] = useState([]);
  const [swipeInitial, setswipeInitial] = useState({ x: null, y: null });
  const moveDis = useRef({ x: 0, y: 0 });
  const { isMobile } = useBreakPoints();

  useEffect(() => {
    setwindowHeight(window.innerHeight);
    setwindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
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
      x: e.clientX - moveDis.current.x,
      y: e.clientY - moveDis.current.y,
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
        moveDis.current.x < (windowWidth - imageSize.x) / 2
      ) {
        moveDis.current.x = (windowWidth - imageSize.x) / 2;
      }

      if (
        windowWidth - imageSize.x < 0 &&
        moveDis.current.x > (imageSize.x - windowWidth) / 2
      ) {
        moveDis.current.x = (imageSize.x - windowWidth) / 2;
      }
      if (windowWidth - imageSize.x > 0) {
        moveDis.current.x = 0;
      }

      if (
        moveDis.current.y >
        (imageSize.y - !iszoomed ? windowHeight * 0.8 : windowHeight) / 2
      ) {
        moveDis.current.y =
          (imageSize.y - !iszoomed ? windowHeight * 0.8 : windowHeight) / 2 +
          50;
      }
      if (
        moveDis.current.y <
        (!iszoomed ? windowHeight * 0.8 : windowHeight - imageSize.y) / 2
      ) {
        moveDis.current.y =
          (!iszoomed ? windowHeight * 0.8 : windowHeight - imageSize.y) / 2;
      }

      e.target.style.transform =
        "translate(" +
        moveDis.current.x +
        "px, " +
        moveDis.current.y +
        "px) scale(2) ";
    }
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!moving) {
      return;
    }
    moveDis.current.x = e.clientX - startingPoint.x;
    moveDis.current.y = e.clientY - startingPoint.y;
    move(e);
  };

  const handleTouchMove = (e) => {
    e.cancelable && e.preventDefault();
    moveDis.current.x = e.changedTouches[0].clientX - startingPoint.x;
    moveDis.current.y = e.changedTouches[0].clientY - startingPoint.y;
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
          // swiped right
          if (targetIndex == workImages.length - 1) {
            setTargetIndex(0);
          }
          if (targetIndex != workImages.length - 1)
            setTargetIndex(targetIndex + 1);
        } else {
          // swiped left
          if (targetIndex == 0) {
            setTargetIndex(workImages.length - 1);
          }
          if (targetIndex != 0) {
            setTargetIndex(targetIndex - 1);
          }
        }
      } else {
        // sliding vertically
        if (diffY > 0) {
          // swiped up
          setmodel(false);
          setiszoomed(false);
        } else {
          // swiped down
          setmodel(false);
          setiszoomed(false);
        }
      }
      setswipeInitial({ x: null, y: null });
    }

    if (moving) {
      move(e);
    }
  };

  const throttleTouchHandler = useThrottle(handleTouchMove, 100);
  const throttleMouseHandler = useThrottle(handleMouseMove, 100);

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
                    {item.image.asset && (
                      <img
                        key={index}
                        src={urlFor(item.image.asset).url()}
                        alt="works"
                        className={styles.images}
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
                              moveDis.current.x = 0;
                              moveDis.current.y = 0;
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
                            x: e.changedTouches[0].clientX - moveDis.current.x,
                            y: e.changedTouches[0].clientY - moveDis.current.y,
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
                        onMouseMove={throttleMouseHandler}
                        onTouchMove={throttleTouchHandler}
                      />
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
                      <PortableText
                        value={item.image_parameter}
                        components={serializers}
                        projectId="z3dq9mvc"
                        dataset="production"
                      />
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
                setmodel(false);
                setiszoomed(false);
              }}
            >
              Close
            </div>
            <div
              className={styles.next}
              onClick={() => {
                setiszoomed(false);
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
                setiszoomed(false);
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
        </div>
      </div>
      {/* image gallery */}
      <div className={styles.gallery}>
        {(isMobile ? slicedWorkImages : workImages).map((item, index) => {
          return (
            <div
              className={styles.pics}
              style={
                isMobile ? { marginBottom: "18px" } : { marginBottom: "30px" }
              }
              key={index}
            >
              {item.image.asset && (
                <Image
                  src={urlFor(item.image.asset).url()}
                  alt={index}
                  className={styles.thumbnail}
                  layout="intrinsic"
                  height={item.metadata.metadata.dimensions.height}
                  width={item.metadata.metadata.dimensions.width}
                  onClick={() => {
                    getIndex(index);
                  }}
                />
              )}
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
export default memo(ImageList);
