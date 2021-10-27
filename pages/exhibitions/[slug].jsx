import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import sanityClient from "../../client.js";
import DropDownCard from "../../components/dropDownCard/DropDownCard.jsx";
import ExStaticCard from "../../components/exStaticCard/ExStaticCard.jsx";
export default function Expo({ expoData }) {
  //console.log(expoData);
  return (
    <>
      <div className="section mt-158">
        <ExStaticCard data={expoData[0]} />
      </div>
      <div className="section mt-118">
        <DropDownCard
          data={expoData[0]}
          exListWorks={true}
          title={"List of Works"}
        />
      </div>
    </>
  );
}

export async function getStaticProps({ locale, params }) {
  const expoData = await sanityClient.fetch(
    `*[slug.current=='${params.slug}']{name_exo,name_exo_cn,date,date_cn,image,image_parameter,introduction,introduction_cn,works[]->{name,name_cn,image,'metadata':image.asset->{metadata},image_parameter,introduction,introduction_cn,slug}}`
  );
  return {
    props: {
      expoData,
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
export async function getStaticPaths() {
  const allExpoData = await sanityClient.fetch(`*[_type=='exhibition']`);
  const path_en = allExpoData.map((expo) => {
    return { params: { slug: expo.slug.current }, locale: "en" };
  });
  const path_tc = allExpoData.map((expo) => {
    return { params: { slug: expo.slug.current }, locale: "tc" };
  });
  const paths = path_en.concat(path_tc);
  //for the automatically created paths, different locales path were not created, it is essential to add
  //different locale path. Otherwise, this localiztion will not work.

  return {
    paths,
    fallback: false,
  };
}
