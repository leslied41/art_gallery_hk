import S_layout from "../components/s_layout/S_layout";

export default function Publications() {
  return <></>;
}
Publications.getLayout = function getLayout(page) {
  return <S_layout>{page}</S_layout>;
};
export async function getStaticProps({ locale }) {
  return {
    props: {
      // Will be passed to the page component as props
    },
    revalidate: 10,
  };
}
