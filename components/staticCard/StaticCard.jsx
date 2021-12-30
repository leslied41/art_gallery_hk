import styles from "./StaticCard.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AppointmentForm from "../appointment_form/AppointmentForm";

const StaticCard = ({ data, form }) => {
  const router = useRouter();
  console.log(data);

  const { name, name_cn, description, description_cn, phone, social, email } =
    data;

  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          {/* display name */}
          <div className={styles.title}>
            <span className="h1">
              {router.locale === "en" ? name : name_cn}
            </span>
          </div>
          {/* display description */}
          {description && (
            <div className="words">
              <div className={styles.gap}>
                <span className="h3">
                  <BlockContent
                    blocks={
                      router.locale === "en" ? description : description_cn
                    }
                    projectId="z3dq9mvc"
                    dataset="production"
                  />
                </span>
              </div>
            </div>
          )}
          {/* if form exsits, display form */}
          <div>{form && <AppointmentForm formdata={data} />}</div>

          {/* if phone exists, display it */}
          {phone && (
            <div className="phone">
              <span className="h3">{phone}</span>
            </div>
          )}
          {/* if emails exists, display it */}
          {email && (
            <div className="email">
              <span className="h3"> {email}</span>
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
