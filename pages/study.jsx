import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../styles/publications.module.css";
import { useRef, useState, useEffect } from "react";
import S_layout from "../components/s_layout/S_layout";

//import Image from "next/image";

export default function Publications() {
  return <></>;
}
Publications.getLayout = function getLayout(page) {
  return <S_layout>{page}</S_layout>;
};
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}
