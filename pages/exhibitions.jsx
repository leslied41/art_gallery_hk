import ReactPlayer from "react-player";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Exhibition() {
  return (
    <>
      <main>
        <div>
          <h1>Exhibition</h1>
          <div>
            <ReactPlayer
              controls={true}
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            />
          </div>
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
