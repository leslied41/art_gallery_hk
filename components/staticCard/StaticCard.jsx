import styles from "./StaticCard.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useState, useContext } from "react";
import { I18nContext } from "react-i18next";
import { i18n } from "next-i18next";

const StaticCard = ({ data, form }) => {
  let Name;
  let Description;
  let FormResponse;

  const {
    i18n: { language },
  } = useContext(I18nContext);
  const {
    name,
    name_cn,
    description,
    description_cn,
    phone,
    socialMedia,
    email,
    formResponse,
    formResponse_cn,
  } = data[0];
  if (i18n.language === "en") {
    Name = name;
    Description = description;
    FormResponse = formResponse;
  } else if (i18n.language === "tc") {
    Name = name_cn;
    Description = description_cn;
    FormResponse = formResponse_cn;
  }
  return (
    <>
      <div className="twoColumn-11">
        <div className="col"></div>
        <div className="col">
          {/* display name */}
          <div className={styles.title}>
            <span className="h1">{Name}</span>
          </div>
          {/* display description */}
          <div className="words">
            <span className="h3">
              <BlockContent
                blocks={Description}
                projectId="z3dq9mvc"
                dataset="production"
              />
            </span>
          </div>
          {/* if form exsits, display form */}
          <div>{form && form()}</div>
          {/* if form response exists, display response */}
          {formResponse && (
            <div className="response">
              <span className="h3">
                {
                  <BlockContent
                    blocks={FormResponse}
                    projectId="z3dq9mvc"
                    dataset="production"
                  />
                }
              </span>
            </div>
          )}
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
          {socialMedia && (
            <div className="socialMedia">
              {socialMedia.map((item, index) => {
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
