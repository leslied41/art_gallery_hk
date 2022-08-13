import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout/Layout";
import Heads from "../components/head/Heads.jsx";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { usepathHistory } from "../components/context/PathHistory.jsx";
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
export default function Landing({ pageData }) {
  const router = useRouter();
  const { popup } = usepathHistory();

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
