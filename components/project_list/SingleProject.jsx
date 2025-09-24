import styles from "./ProjectList.module.css";
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
    <article key={_id}>
      <div className="col mb-188">
        {slug && (
          <Link href={"/fairs-and-projects/" + slug.current}>
            <a>
              <div className="mb-16">
                <Image
                  src={urlFor(image.asset).url()}
                  alt="works"
                  objectFit="cover"
                  layout="responsive"
                  width="654"
                  height="437"
                />
              </div>
            </a>
          </Link>
        )}
        {slug && (
          <Link href={"/fairs-and-projects/" + slug.current}>
            <a>
              <h2 className="h2 uppercase">{router.locale == "en" ? name_project : name_project_cn}</h2>
            </a>
          </Link>
        )}
        <h3 className="h3">{router.locale == "en" ? date : date_cn}</h3>
        <div className="h3 mt-10">
          {router.locale == "en" ? artists : artists_cn}
        </div>
        <div className="h3">
          {router.locale == "en" ? location : location_cn}
        </div>
      </div>
    </article>
  );
};
