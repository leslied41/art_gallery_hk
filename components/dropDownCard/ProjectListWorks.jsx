import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import VerticalLayout from "../projects_project_staticcard/VerticalLayout.jsx";
import HorizontalLayout from "../projects_project_staticcard/HorizontalLayout.jsx";
import RightHorizontalLayout from "../projects_project_staticcard/RightHorizontalLayout.jsx";
import VideoLayout from "../projects_project_staticcard/VideoLayout.jsx";
import WordsLayout from "../projects_project_staticcard/WordsLayout.jsx";
import HalfWordsLayout from "../projects_project_staticcard/HalfWordsLayout.jsx";
import ReactPlayer from "react-player";
import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  createRef,
  memo,
} from "react";
import styles from "./ProjectListWorks.module.css";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import { useRouter } from "next/router";
import { useThrottle } from "../usehooks/useThrottle.js";

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
    Text_block_large: ({ children }) => <p className="h2">{children}</p>,
    Text_block_small: ({ children }) => <p className="h3">{children}</p>,
    Text_block_reference: ({ children }) => <p className="h7">{children}</p>,
  },
};

const ProjectListWorks = ({ data }) => {
  const { project_works } = data;
  const router = useRouter();

  const [model, setmodel] = useState(false);
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

  const getIndex = (index) => {
    setTargetIndex(index);
    setmodel(true);
  };

  useEffect(() => {
    setwindowHeight(window.innerHeight);
    setwindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (project_works) {
      setElRefs((elRefs) =>
        Array(project_works.length)
          .fill()
          .map((_, index) => elRefs[index] || createRef())
      );
    }
  }, [project_works ? project_works.length : null]);

  useEffect(() => {
    if (model) {
      elRefs[targetIndex].current.style.transform = "scale(1)";
    }
  }, [targetIndex]);

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

    moveDis.current = {
      x: e.clientX - startingPoint.x,
      y: e.clientY - startingPoint.y,
    };
    move(e);
  };

  const handleTouchMove = (e) => {
    e.cancelable && e.preventDefault();

    moveDis.current = {
      x: e.changedTouches[0].clientX - startingPoint.x,
      y: e.changedTouches[0].clientY - startingPoint.y,
    };
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
        if (diffX > 0) {
          if (targetIndex == 0) {
            setTargetIndex(project_works.length - 1);
          }
          if (targetIndex != 0) {
            setTargetIndex(targetIndex - 1);
          }
        } else {
          if (targetIndex == project_works.length - 1) {
            setTargetIndex(0);
          }
          if (targetIndex != project_works.length - 1)
            setTargetIndex(targetIndex + 1);
        }
      } else {
        if (diffY > 0) {
          setmodel(false);
          setiszoomed(false);
        } else {
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
            {project_works &&
              project_works.map((item, index) => {
                const {
                  work_image,
                  work_parameter,
                  video_url,
                  introduction,
                  introduction_cn,
                } = item;
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
                                moveDis.current = { x: 0, y: 0 };
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
                              x:
                                e.changedTouches[0].clientX - moveDis.current.x,
                              y:
                                e.changedTouches[0].clientY - moveDis.current.y,
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
                      ) : video_url ? (
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
                      ) : (
                        <div
                          ref={elRefs[index]}
                          className={styles.text_container}
                        >
                          <PortableText
                            value={
                              router.locale == "en"
                                ? introduction
                                : introduction_cn
                            }
                            components={serializers}
                            projectId="z3dq9mvc"
                            dataset="production"
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
                        {work_parameter && (
                          <PortableText
                            value={work_parameter}
                            components={serializers}
                            projectId="z3dq9mvc"
                            dataset="production"
                          />
                        )}
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
                if (targetIndex == project_works.length - 1) {
                  setTargetIndex(0);
                }
                if (targetIndex != project_works.length - 1)
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
                  setTargetIndex(project_works.length - 1);
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
      {project_works &&
        project_works.map((work, index) => {
          const {
            name,
            name_cn,
            work_image,
            work_parameter,
            introduction,
            introduction_cn,
            video_url,
            layout,
            buttons,
          } = work;

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
                    buttons={buttons}
                    getIndex={getIndex}
                  />
                </div>
              ) : work_image && layout == "vertical" ? (
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
                    buttons={buttons}
                  />
                </div>
              ) : work_image && layout == "horizontal" ? (
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
                    buttons={buttons}
                  />
                </div>
              ) : work_image && layout == "right_horizontal" ? (
                <div key={index} className="mt-145">
                  <RightHorizontalLayout
                    name={name}
                    name_cn={name_cn}
                    image={work_image}
                    work_parameter={work_parameter}
                    video={video_url}
                    introduction={introduction}
                    introduction_cn={introduction_cn}
                    index={index}
                    getIndex={getIndex}
                    buttons={buttons}
                  />
                </div>
              ) : !work_image && layout == "vertical" ? (
                <div key={index} className="mt-145">
                  <WordsLayout
                    name={name}
                    name_cn={name_cn}
                    introduction={introduction}
                    introduction_cn={introduction_cn}
                    index={index}
                    getIndex={getIndex}
                    buttons={buttons}
                    work_parameter={work_parameter}
                  />
                </div>
              ) : (
                <div key={index} className="mt-145">
                  <HalfWordsLayout
                    name={name}
                    name_cn={name_cn}
                    introduction={introduction}
                    introduction_cn={introduction_cn}
                    index={index}
                    getIndex={getIndex}
                    buttons={buttons}
                    work_parameter={work_parameter}
                  />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};
export default memo(ProjectListWorks);
