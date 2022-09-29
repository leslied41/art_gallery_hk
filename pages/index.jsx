import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import Heads from "../components/head/Heads.jsx";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePathHistory } from "../components/context/PathHistory.jsx";
import { langing_page_data } from "../groq";
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Landing({ pageData }) {
  const router = useRouter();
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;
  const { seo } = pageData;

  useEffect(() => {
    setpopup_path(router.asPath);
  }, [router.asPath]);
  return (
    <>
      <Heads seo={seo} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const pageData = await sanityClient.fetch(langing_page_data);

  return {
    props: {
      pageData,

      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}
