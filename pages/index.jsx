import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import sanityClient from "../client.js";

export default function Landing() {
  return <></>;
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
