import styles from "./ProjectList.jsx";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePortableText } from "../usehooks/usePortableText";
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
export const SingleProject = ({ project }) => {
  const {
    _id,
    name_project,
    name_project_cn,
    project_status,
    project_status_cn,
    artists,
    artists_cn,
    location,
    location_cn,
    introduction,
    introduction_cn,
    image,
    layout,
    image_parameter,
    date,
    date_cn,
    project_works,
    slug,
  } = project;
  const router = useRouter();

  return (
    <article className={styles.grid} key={_id}>
      <div className="col mb-42">
      { slug && (
        <Link href={"/projects/" + slug.current}>
          <div>
            <Image
              src={urlFor(image.asset).url()}
              alt="works"
              objectFit="cover"
              layout="responsive"
              width="654"
              height="437"
            />
          </div>
        </Link>
      )}
      </div>
      <div className="col mb-42">
        { slug && (
          <Link href={"/projects/" + slug.current}>
            <h2 className="h2">{router.locale == "en" ? name_project : name_project_cn}</h2>
          </Link>
        )}
        <div className="h3 mt-30">
          {usePortableText(router.locale == "en" ? introduction : introduction_cn)}
        </div>
      </div>
    </article>
  );
};
