import { I18nContext } from "react-i18next";
import { i18n } from "next-i18next";
import { useState, useContext, useEffect } from "react";
import styles from "./PureWords.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useRouter } from "next/router";

const PureWords = ({ data, handleClick, showCard, title }) => {
  const router = useRouter();

  let Content;
  //console.log(data);
  const { content, content_cn } = data;

  if (router.locale === "en") {
    Content = content;
  } else if (router.locale === "tc") {
    Content = content_cn;
  }
  return (
    <>
      <div className="twoColumn-11">
        <div className="col"></div>
        <div className="col">
          <div className="title">
            <span className="h2" onClick={handleClick}>
              {title} {showCard ? "-" : "+"}
            </span>
          </div>
          <div>{showCard || <hr className="hr-top" />}</div>
          {showCard && (
            <div className="mt-28">
              <span className="h3">
                <BlockContent
                  blocks={Content}
                  projectId="z3dq9mvc"
                  dataset="production"
                />
              </span>
            </div>
          )}
          <div>{showCard && <hr className="hr-bottom" />}</div>
        </div>
      </div>
    </>
  );
};
export default PureWords;
