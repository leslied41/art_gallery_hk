import styles from "./StaticCard.module.css";
import BlockContent from "@sanity/block-content-to-react";

const StaticCard = ({ data, form }) => {
  const { name, description, phone, socialMedia, email, formResponse } =
    data[0];
  return (
    <>
      <div className="twoColumn-11">
        <div className="col"></div>
        <div className="col">
          {/* display name */}
          <div className={styles.title}>
            <span className="h1">{name}</span>
          </div>
          {/* display description */}
          <div className="words">
            <span className="h3">
              <BlockContent
                blocks={description}
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
                    blocks={formResponse}
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
