import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import styles from "./HorizontalLayout.module.css";
import { useRouter } from "next/router";
import { usePortableText } from "../usehooks/usePortableText.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const HorizontalLayout = ({
  name,
  name_cn,
  image,
  work_parameter,
  introduction,
  introduction_cn,
  index,
  getIndex,
  buttons,
}) => {
  const router = useRouter();
  const intro_portableText = usePortableText(
    router.locale == "en" ? introduction : introduction_cn
  );
  const parameter_portableText = usePortableText(work_parameter);

  return (
    <>
      <div>
        <div className={styles.grid}>
          <div className="col">
            <div className={styles.imgcontainer}>
              {image && (
                <img
                  key={index}
                  src={urlFor(image.asset).url()}
                  alt={image.asset._ref}
                  style={{ width: "100%", cursor: "pointer" }}
                  onClick={() => {
                    getIndex(index);
                  }}
                />
              )}
            </div>
            <div className="mt-30">
              <span className="h4">
                {work_parameter && parameter_portableText}
              </span>
            </div>
          </div>
          <div className="col">
            <div>
              {(name || name_cn) && (
                <>
                  <p className="h2">{router.locale == "en" ? name : name_cn}</p>
                  <div className="mt-30"></div>
                </>
              )}
              <div className="h3">
                {(introduction || introduction_cn) && intro_portableText}
              </div>
              <div className="btns">
                {buttons &&
                  buttons.map((btn, index) => {
                    const { button_link, PDF, button_name } = btn;
                    return (
                      <a
                        key={index}
                        href={
                          PDF
                            ? PDF
                              ? PDF
                              : null
                            : button_link
                            ? button_link
                            : null
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="exhibition_btn h3">
                          {button_name}
                        </button>
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HorizontalLayout;
