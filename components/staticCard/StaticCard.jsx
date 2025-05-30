import styles from "./StaticCard.module.css";
import { getImageDimensions } from "@sanity/asset-utils";
import { useRouter } from "next/router";
import AppointmentForm from "../appointment_form/AppointmentForm";
import { usePortableText } from "../usehooks/usePortableText";

const StaticCard = ({ data, form, fowardref, Component = "span" }) => {
  const router = useRouter();
  const {
    name,
    name_cn,
    description,
    description_cn,
    phone,
    social,
    email,
    font_size,
  } = data || {};
  const portableText = usePortableText(
    router.locale === "en" ? description : description_cn
  );

  return (
    <>
      <div className={styles.grid}>
        <div className="col" ref={fowardref}></div>
        <div className="col">
          {/* display name */}
          <div className={styles.title}>
            <Component
              className="h1"
              style={font_size && { fontSize: `${font_size}px` }}
            >
              {router.locale === "en" ? name : name_cn}
            </Component>
          </div>
          {/* display description */}
          {description && (
            <div className="words mt-145">
              <div className={styles.gap}>
                <span className="h3">{portableText}</span>
              </div>
            </div>
          )}
          {/* if form exsits, display form */}
          <div>{form && <AppointmentForm formdata={data} />}</div>

          {/* if phone exists, display it */}

          {(phone || email) && (
            <div className="mt-145">
              <div className="phone">
                <span className="h3">{phone}</span>
              </div>
              <div className="email">
                <span className="h3"> {email}</span>
              </div>
            </div>
          )}

          {/* if social media exists, display it */}
          {social && (
            <div className="socialMedia">
              {social.map((item, index) => {
                return (
                  <div key={index}>
                    <a href={item.url}>
                      <span className="h3">{item.platform}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default StaticCard;
