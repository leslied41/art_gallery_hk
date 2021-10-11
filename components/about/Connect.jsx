import styles from "./Connect.module.css";
import BlockContent from "@sanity/block-content-to-react";

const Connect = ({ connect }) => {
  const { name, description, phone, socialMedia, email } = connect[0];
  return (
    <>
      <div className="twoColumn-11">
        <div className="col"></div>
        <div className="col">
          <div className={styles.title}>
            <span className="h1">{name}</span>
          </div>
          <div className="words">
            <span className="h3">
              <BlockContent
                blocks={description}
                projectId="z3dq9mvc"
                dataset="production"
              />
            </span>
          </div>
          <div className="phone">
            <span className="h3">{phone}</span>
          </div>
          <div className="email">
            <span className="h3"> {email}</span>
          </div>
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
        </div>
      </div>
    </>
  );
};
export default Connect;
