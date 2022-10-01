import styles from "./NewsList.module.css";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePortableText } from "../usehooks/usePortableText";
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
export const SingleNews = ({ news }) => {
  const {
    _id,
    content,
    content_cn,
    title,
    title_cn,
    news_brief,
    news_brief_cn,
    image,
    news_link,
  } = news;
  const router = useRouter();

  return (
    <article className={styles.grid} key={_id}>
      <div className="col mb-42">
        <a href={news_link ? news_link : null} target="_blank" rel="noreferrer">
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
        </a>
      </div>
      <div className="col mb-42">
        <a href={news_link ? news_link : null} target="_blank" rel="noreferrer">
          <h2 className="h2">{router.locale == "en" ? title : title_cn}</h2>
        </a>
        <div className="h3 mt-30">
          {usePortableText(router.locale == "en" ? news_brief : news_brief_cn)}
        </div>
      </div>
    </article>
  );
};
