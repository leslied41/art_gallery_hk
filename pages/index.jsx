import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import sanityClient from "../client.js";
import LightGallery from "lightgallery/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Heads from "../components/head/Heads.jsx";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
export default function Landing({ pageData }) {
  const { seo } = pageData;
  console.log(seo);
  return (
    <>
      <Heads seo={seo} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const pageData = await sanityClient.fetch(
    `*[_type=='pages'&&name=='Homepage'][0]`
  );
  return {
    props: {
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
