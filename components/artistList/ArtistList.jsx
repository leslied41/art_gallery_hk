import { useRouter } from "next/router";
import Link from "next/link";

const ArtistList = ({ data }) => {
  console.log(data);
  const router = useRouter();
  return (
    <div className="twoColumn-11">
      <div className="col"></div>
      <div className="col h3">
        <ul>
          {data.map((artist, index) => {
            const { name, name_cn, slug } = artist;
            return (
              <div key={index} className="mt-28">
                <Link href={"/artists/" + slug.current}>
                  <li key={index}>{router.locale == "en" ? name : name_cn}</li>
                </Link>

                <hr className="hr-top" />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default ArtistList;
