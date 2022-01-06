import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./ImageList.module.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
import LightGallery from "lightgallery/react";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import plugins if you need
import lgZoom from "lightgallery/plugins/zoom";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
// const ImageList = ({ slicedWorkImages, loaded, loadMore, workImages }) => {
//   const lightGallery = useRef(null);
//   const [iamges, setiamges] = useState(slicedWorkImages);
//   const [isMobile, setisMobile] = useState();

//   useEffect(() => {
//     setiamges(slicedWorkImages);
//   }, [slicedWorkImages]);
//   //console.log(workImages);
//   const onInit = useCallback((detail) => {
//     if (detail) {
//       lightGallery.current = detail.instance;
//     }
//   }, []);
//   const getImages = useCallback(() => {
//     if (isMobile) {
//       return slicedWorkImages.map((image, index) => {
//         //console.log(image);

//         return (
//           <div key={index} data-src={urlFor(image.image.asset).url()}>
//             <Image
//               src={urlFor(image.image.asset).url()}
//               alt={index}
//               className={styles.thumbnail}
//               layout="responsive"
//               width="100%"
//               height="100%"
//               objectFit="cover"
//             />
//           </div>
//         );
//       });
//     }
//     if (!isMobile) {
//       return workImages.map((image, index) => {
//         //console.log(image);
//         const { image_parameter } = image;

//         return (
//           <div
//             key={index}
//             style={{ width: "100%", height: "100%", marginBottom: "30px" }}
//             data-src={urlFor(image.image.asset).url()}
//           >
//             <Image
//               src={urlFor(image.image.asset).url()}
//               alt={index}
//               className={styles.thumbnail}
//               layout="intrinsic"
//               height={image.metadata.metadata.dimensions.height}
//               width={image.metadata.metadata.dimensions.width}
//             />
//           </div>
//         );
//       });
//     }
//   }, [slicedWorkImages]);

//   useEffect(() => {
//     lightGallery.current.refresh();
//   }, [slicedWorkImages]);

//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       setisMobile(true);
//     } else if (window.innerWidth >= 768) {
//       setisMobile(false);
//     }
//   }, []);

//   useLayoutEffect(() => {
//     window.addEventListener("resize", () => {
//       if (window.innerWidth < 768) {
//         setisMobile(true);
//         //console.log(isMobile);
//       } else if (window.innerWidth >= 768) {
//         setisMobile(false);
//         //console.log(isMobile);
//       }
//     });
//     return () => {
//       window.removeEventListener("resize", () => {
//         if (window.innerWidth < 768) {
//           setisMobile(true);
//         } else if (window.innerWidth >= 768) {
//           setisMobile(false);
//         }
//       });
//     };
//   }, []);
//   return (
//     <>
//       <LightGallery
//         plugins={[lgZoom]}
//         counter={false}
//         download={false}
//         onInit={onInit}
//         prevHtml="Pre"
//         nextHtml="Next"
//         actualSize={false}
//         showZoomInOutIcons={true}
//         elementClassNames={styles.grid}
//       >
//         {getImages()}
//       </LightGallery>
//       {isMobile && (
//         <div style={{ marginTop: "18px" }}>
//           <div className={styles.grid}>
//             <LoadMoreCard loaded={loaded} loadMore={loadMore} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default ImageList;

//my own coding method
// const ImageList = ({
//   workImages,
//   showCard,
//   slicedWorkImages,
//   loaded,
//   loadMore,
// }) => {
//   const [tempImage, settempImage] = React.useState("");
//   const [model, setmodel] = React.useState(false);
//   const [targetIndex, setTargetIndex] = useState(null);
//   const [zoom, setzoom] = useState(true);
//   const [clickTime, setclickTime] = useState(0);
//   const [pressed, setpressed] = useState(false);
//

//   const prevRef = useRef();
//   // const [loaded, setloaded] = useState(true);
//   // const [slicedWorkImages, setslicedWorkImages] = useState(workImages);
//   // useEffect(() => {
//   //   if (workImages.length < 4) {
//   //     setloaded(false);
//   //   } else if (workImages.length >= 4) {
//   //     setloaded(true);
//   //   }
//   // }, [workImages]);
//   // useEffect(() => {
//   //   const initialWorkImages = workImages.slice(0, 4);
//   //   setslicedWorkImages(initialWorkImages);
//   // }, []);
//   // useEffect(() => {
//   //   const initialWorkImages = workImages.slice(0, 4);

//   //   if (!showCard) {
//   //     setslicedWorkImages(initialWorkImages);
//   //     setloaded(true);
//   //   }
//   // }, [showCard]);
//   // const loadMore = () => {
//   //   setslicedWorkImages(workImages);
//   //   setloaded(!loaded);
//   // };

//   // useEffect(() => {
//   //   // add or remove refs
//   //   setElRefs((elRefs) =>
//   //     Array(workImages.length)
//   //       .fill()
//   //       .map((_, index) => elRefs[index] || createRef())
//   //   );
//   // }, [workImages.length]);

//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     if (model) {
//   //       if (
//   //         elRefs[targetIndex].current.getBoundingClientRect().x <
//   //         prevRef.current.getBoundingClientRect().x
//   //       ) {
//   //         prevRef.current.style.mixBlendMode = "color";
//   //       } else {
//   //         prevRef.current.style.mixBlendMode = "normal";
//   //       }
//   //     }
//   //   }, 300);
//   // }, [targetIndex, zoom]);

//   //I need to use useref to get the div pic 's element and get its getboudingclientreact,
//   //then get the three buttons next prev close's postion to check it they are overlapped.
//   //but now the problem is that useref cannnot be used in loop, as there be only one ref.
//   //therefore, I need to figure out how to get a ref collection and then according to the targetindex to
//   //get the displayed one to judge the overlap thing.
//   const mouseDown = (e) => {
//     setclickTime(new Date());
//   };

//   const getImage = (image) => {
//     settempImage(image);
//     setmodel(true);
//   };
//   const getIndex = (index) => {
//     setTargetIndex(index);
//     setmodel(true);
//   };

//   return (
//     <>
//       <div className={model ? styles.open : styles.close}>
//         <div className={styles.container}>
//           <div
//             className={styles.closeIcon}
//             onClick={() => {
//               setmodel(false);
//             }}
//           >
//             close
//           </div>
//           <div
//             className={styles.next}
//             onClick={() => {
//               if (targetIndex == workImages.length - 1) {
//                 setTargetIndex(0);
//               }
//               if (targetIndex != workImages.length - 1)
//                 setTargetIndex(targetIndex + 1);
//             }}
//           >
//             Next
//           </div>
//           <div
//             className={styles.prev}
//             ref={prevRef}
//             onClick={() => {
//               if (targetIndex == 0) {
//                 setTargetIndex(workImages.length - 1);
//               }
//               if (targetIndex != 0) {
//                 setTargetIndex(targetIndex - 1);
//               }
//             }}
//           >
//             Prev
//           </div>
//           <div style={{ height: "100vh" }}>
//             <TransformWrapper
//               initialScale={1}
//               initialPositionX={0}
//               initialPositionY={0}
//               doubleClick={{ mode: "reset" }}
//               wheel={{ disabled: true }}
//             >
//               {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
//                 <>
//                   <TransformComponent
//                     wrapperStyle={{
//                       height: "100vh",
//                       display: "flex",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {workImages.map((item, index) => {
//                       console.log(item.metadata.metadata.dimensions);
//                       return (
//                         <div
//                           className={styles.pic}
//                           ref={elRefs[index]}
//                           style={
//                             targetIndex == index
//                               ? {
//                                   // width: `${
//                                   //   item.metadata.metadata.dimensions.width /
//                                   //   (item.metadata.metadata.dimensions.height /
//                                   //     (0.8 * window.innerHeight))
//                                   // }px`,
//                                   // height: "80vh",
//                                   // backgroundImage:
//                                   //   "url(" +
//                                   //   `${urlFor(item.image.asset).url()}` +
//                                   //   ")",
//                                   // backgroundRepeat: "no-repeat",
//                                   // backgroundSize: "cover",
//                                   // backgroundPosition: "center",
//                                   display: "flex",
//                                   // width: "fit-content",
//                                   // height: "fit-content",
//                                 }
//                               : {
//                                   display: "none",
//                                 }
//                           }
//                           key={index}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             if (new Date() - clickTime < 150) {
//                               if (zoom) {
//                                 zoomIn(0.691);
//                                 //zoomup();
//                                 // console.log(
//                                 //   elRefs[
//                                 //     targetIndex
//                                 //   ].current.getBoundingClientRect().width
//                                 // );
//                                 setzoom(false);
//                                 e.target.style.cursor = "zoom-out";
//                               } else if (!zoom) {
//                                 zoomOut(0.691);
//                                 //zoomdown();
//                                 // console.log(
//                                 //   elRefs[
//                                 //     targetIndex
//                                 //   ].current.getBoundingClientRect().width
//                                 // );

//                                 e.target.style.cursor = "zoom-in";
//                                 setzoom(true);
//                               }
//                             }
//                           }}
//                           onMouseDown={(e) => {
//                             setpressed(true);
//                             mouseDown(e);
//                           }}
//                           onMouseMove={(e) => {
//                             if (pressed) {
//                               e.target.style.cursor = "move";
//                             }
//                           }}
//                           onMouseUp={(e) => {
//                             setpressed(false);
//                             if (!zoom) {
//                               e.target.style.cursor = "zoom-out";
//                             } else if (zoom) {
//                               e.target.style.cursor = "zoom-in";
//                             }
//                           }}
//                         >
//                           {/* <Image
//                             //src={logo}
//                             src={urlFor(item.image.asset).url()}
//                             alt="works"
//                             layout="intrinsic"
//                             width={item.metadata.metadata.dimensions.width}
//                             height={item.metadata.metadata.dimensions.height}
//                             objectFit="contain"
//                             className={styles.img_origin}
//                           /> */}
//                           <img
//                             src={urlFor(item.image.asset).url()}
//                             alt="works"
//                             ref={elRefs[index]}
//                             style={{
//                               maxHeight: "80vh",
//                               objectFit: "contain",
//                             }}
//                           />
//                         </div>
//                       );
//                     })}
//                     {/* {workImages.map((item, index) => {
//                       return (
//                         <div
//                           className={styles.image_parameter}
//                           key={index}
//                           style={
//                             targetIndex == index
//                               ? {
//                                   width: "100%",
//                                   display: "flex",
//                                   objectFit: "cover",
//                                 }
//                               : {
//                                   width: "100%",
//                                   display: "none",
//                                 }
//                           }
//                         >
//                           <BlockContent
//                             blocks={item.image_parameter}
//                             projectId="z3dq9mvc"
//                             dataset="production"
//                           />
//                         </div>
//                       );
//                     })} */}
//                   </TransformComponent>
//                 </>
//               )}
//             </TransformWrapper>
//           </div>
//           <div></div>
//         </div>
//       </div>
//       <div className={styles.gallery}>
//         {slicedWorkImages.map((item, index) => {
//           return (
//             <div className={styles.pics} key={item.image.asset._ref}>
//               <img
//                 src={urlFor(item.image.asset).url()}
//                 alt="works"
//                 style={{ height: "auto", width: "100%" }}
//                 onClick={() => {
//                   //getImage(item.image);
//                   getIndex(index);
//                 }}
//               />
//             </div>
//           );
//         })}
//         <div>
//           <LoadMoreCard loaded={loaded} loadMore={loadMore} />
//         </div>
//       </div>
//     </>
//   );
// };
// export default ImageList;
// rewrite these coding
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
  const [images, setimages] = useState(workImages);
  const [moveDis, setmoveDis] = useState({ x: 0, y: 0 });
  const [startingPoint, setstartingPoint] = useState({ x: 0, y: 0 });
  const [moving, setmoving] = useState(false);
  const [imageSize, setimageSize] = useState({ x: 0, y: 0 });
  const [windowHeight, setwindowHeight] = useState();
  const [windowWidth, setwindowWidth] = useState();
  const [elRefs, setElRefs] = useState([]);

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
    if (isMobile) {
      setimages(slicedWorkImages);
    }
    if (!isMobile) {
      setimages(workImages);
    }
  }, [isMobile]);

  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(images.length)
        .fill()
        .map((_, index) => elRefs[index] || createRef())
    );
  }, [images.length]);

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

  const getIndex = (index) => {
    setTargetIndex(index);
    setmodel(true);
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
        moveDis.x < windowWidth - imageSize.x
      ) {
        moveDis.x = windowWidth - imageSize.x;
      }

      if (
        windowWidth - imageSize.x < 0 &&
        moveDis.x > imageSize.x - windowWidth
      ) {
        moveDis.x = imageSize.x - windowWidth;
      }
      if (
        windowWidth - imageSize.x > 0 &&
        moveDis.x > windowWidth - imageSize.x
      ) {
        moveDis.x = windowWidth - imageSize.x;
      }
      if (
        windowWidth - imageSize.x > 0 &&
        moveDis.x < imageSize.x - windowWidth
      ) {
        moveDis.x = imageSize.x - windowWidth;
      }
      if (moveDis.y > imageSize.y - windowHeight) {
        moveDis.y = imageSize.y - windowHeight;
      }
      if (moveDis.y < windowHeight - imageSize.y) {
        moveDis.y = windowHeight - imageSize.y;
      }

      e.target.style.transform =
        "translate(" + moveDis.x + "px, " + moveDis.y + "px) scale(2) ";
      console.log(moveDis.x);
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
            {images.map((item, index) => {
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
                        ? {
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
                              height: "80vh",
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
                      onMouseUp={(e) => {
                        setmoving(false);
                        e.target.style.cursor = "zoom-in";
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
                    />
                  </div>
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
                </div>
              );
            })}
          </div>

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
        </div>
      </div>
      {/* image gallery */}
      <div className={styles.gallery}>
        {isMobile &&
          slicedWorkImages.map((item, index) => {
            return (
              <div className={styles.pics} key={item.image.asset._ref}>
                <img
                  src={urlFor(item.image.asset).url()}
                  alt="works"
                  style={{ height: "auto", width: "100%" }}
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
              <div className={styles.pics} key={item.image.asset._ref}>
                <img
                  src={urlFor(item.image.asset).url()}
                  alt="works"
                  style={{ height: "auto", width: "100%" }}
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
