import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Landing({ workImages }) {
  const [zoom, setzoom] = useState(true);
  const [clickTime, setclickTime] = useState(0);
  const imgEl = useRef();
  const [ponitXY, setponitXY] = useState({ x: 0, y: 0 });
  const [startXY, setstartXY] = useState({});
  const [panning, setpanning] = useState(false);

  const mouseDown = (e) => {
    setclickTime(new Date());
    setstartXY({
      x: e.clientX - ponitXY.x,
      y: e.clientY - ponitXY.y,
    });
    setpanning(true);
  };
  const zoomIn = () => {
    imgEl.current.style.transform = `scale(2)`;
  };
  const zoomOut = () => {
    imgEl.current.style.transform = `scale(1)`;
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          left: "0",
          top: "0",
          height: "100vh",
          width: "100%",
          zIndex: "999",
          backgroundColor: "orange",
          display: "none",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {workImages.slice(5, 6).map((item, index) => {
          return (
            <div
              key={index}
              style={{
                height: "80vh",
                display: "flex",
                overflow: "hidden",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={(e) => {
                e.preventDefault();

                if (new Date() - clickTime < 150) {
                  if (zoom) {
                    zoomIn();
                    e.target.style.cursor = "zoom-out";
                    setzoom(false);
                  } else if (!zoom) {
                    zoomOut();
                    e.target.style.cursor = "zoom-in";
                    setzoom(true);
                  }
                }
              }}
              onMouseDown={(e) => {
                mouseDown(e);
              }}
              onMouseMove={(e) => {
                e.preventDefault();
                if (zoom) {
                  return;
                }
                if (!panning) {
                  return;
                }

                setponitXY({
                  x: ponitXY_x,
                  y: ponitXY_y,
                });
                console.log(ponitXY.x);
                e.target.style.cursor = "move";
                imgEl.current.style.transform = `translate(${ponitXY.x}px,${ponitXY.y}px) scale(2)`;
              }}
              onMouseUp={(e) => {
                setpanning(false);
                if (!zoom) {
                  e.target.style.cursor = "zoom-out";
                } else if (zoom) {
                  e.target.style.cursor = "zoom-in";
                }
              }}
              onMouseLeave={() => {
                setpanning(false);
              }}
            >
              <img
                ref={imgEl}
                src={urlFor(item.image.asset).url()}
                style={{
                  height: "80vh",
                  width: "auto",
                  objectFit: "contain",
                  transformOrigin: "center",
                  transform: "scale(1) translate(0px,0px)",
                  pointerEvents: "none",
                }}
                alt="21"
              />
            </div>
          );
        })}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20vh",
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            deleniti magnam iste dignissimos quae minus earum, expedita sint
            atque voluptatum consequatur architecto veritatis eligendi assumenda
            illum commodi accusantium maiores? Architecto!
          </p>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const workImages = await sanityClient.fetch(
    `*[_type=='work'&& references(*[slug.current=='leslie-chuneg']{_id}[0]._id)]{image,image_parameter,'metadata':image.asset->{metadata}}`
  );
  return {
    props: {
      workImages,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
