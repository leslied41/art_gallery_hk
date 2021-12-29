import sanityClient from "../client.js";
import LightGallery from "lightgallery/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Heads from "../components/head/Heads.jsx";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGlobalSettings } from "../components/context/GlobalSettings.jsx";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
export default function Landing({ pageData }) {
  const router = useRouter();
  const { settings, popup } = useGlobalSettings();
  const [popup_path, setpopup_path] = popup;
  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);
  //console.log(popup_path);
  const { seo } = pageData;
  //console.log(seo);
  return (
    <>
      <Heads seo={seo} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const pageData = await sanityClient.fetch(
    `*[_type=='pages'&&name=='Landing'][0]`
  );
  return {
    props: {
      pageData,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}
