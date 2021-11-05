import { I18nContext } from "react-i18next";
import { i18n } from "next-i18next";
import { useState, useContext, useEffect } from "react";
import styles from "./ExpoList.module.css";
import Link from "next/link";
import Collapsible from "../collapsible/Collapsible";

const ExpoList = ({ data, handleClick, showCard, title }) => {
  console.log(data);
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
          <Collapsible showCard={showCard}>
            <div>
              <ul>
                {data.map((item, index) => {
                  const { name_exo, date, slug } = item[0];
                  return (
                    <Link key={index} href={"/exhibitions/" + slug.current}>
                      <li>
                        <p>{name_exo}</p>
                        <p>{date}</p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </Collapsible>
          <div>
            <hr className="hr-bottom" />
          </div>
        </div>
      </div>
    </>
  );
};
export default ExpoList;
