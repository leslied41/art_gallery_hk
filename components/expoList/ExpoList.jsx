import { I18nContext } from "react-i18next";
import { i18n } from "next-i18next";
import { useState, useContext, useEffect } from "react";
import styles from "./ExpoList.module.css";

const ExpoList = ({ data, handleClick, showCard, title }) => {
  console.log(data);
  return (
    <>
      <div className="twoColumn-11">
        <div className="col"></div>
        <div className="col">
          <div className="title">
            <span className="h2" onClick={handleClick}>
              {title}+
            </span>
          </div>
          <div>
            {showCard && (
              <ul>
                {data.map((item, index) => {
                  const { name_exo, date } = item;
                  return (
                    <li key={index}>
                      <p>{name_exo}</p>
                      <p>{date}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div>{showCard || <hr className="hr-top" />}</div>
        </div>
        <div>{showCard && <hr className="hr-bottom" />}</div>
      </div>
    </>
  );
};
export default ExpoList;
