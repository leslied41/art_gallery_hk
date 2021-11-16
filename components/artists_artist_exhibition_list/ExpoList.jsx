import { useState, useContext, useEffect } from "react";
import styles from "./ExpoList.module.css";
import Link from "next/link";
import Collapsible from "../collapsible/Collapsible";
import { dropDownContext } from "../dropDownCard/DropDownCard";

const ExpoList = ({ data }) => {
  const { showCard } = useContext(dropDownContext);

  return (
    <>
      <div className={styles.grid}>
        <div className="col"></div>
        <div className="col">
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
        </div>
      </div>
    </>
  );
};
export default ExpoList;
