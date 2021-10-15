import Slider from "../components/slider/Slider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Artists() {
  return (
    <>
      <main>
        <div>
          <h1>Artists page</h1>
          <Slider />
        </div>
      </main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
