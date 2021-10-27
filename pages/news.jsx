import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function News() {
  return <h1>News page</h1>;
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
