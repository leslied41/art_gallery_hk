import { useState, useContext, useEffect } from "react";
import styles from "./ExpoList.module.css";
import Link from "next/link";
import Collapsible from "../collapsible/Collapsible";
import { dropDownContext } from "../dropDownCard/DropDownCard";

const ExpoList = ({ data }) => {
  const { showCard } = useContext(dropDownContext);
  //console.log(data);
  const { cv, cv_link, cv_create_date, PDF } = data;
  console.log(PDF);
  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
          <Collapsible showCard={showCard}>
            <div>
              <ul>
                <li className="mt-30" style={{ cursor: "pointer" }}>
                  <a
                    href={PDF ? (PDF ? PDF : null) : cv_link ? cv_link : null}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="h6">{cv}</p>
                    <p className="h3 mt-5">{cv_create_date}</p>
                  </a>
                </li>
              </ul>
            </div>
          </Collapsible>
        </div>
      </div>
    </>
  );
};
export default ExpoList;
