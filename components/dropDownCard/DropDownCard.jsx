import styles from "./DropDownCard.module.css";
import BlockContent from "@sanity/block-content-to-react";
import { useState, useContext, useEffect } from "react";
import { I18nContext } from "react-i18next";
import { i18n } from "next-i18next";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";
import Link from "next/link";
import ExpoImageList from "./ExpoImageList";
import PureWords from "./PureWords";
import ExpoList from "../expoList/ExpoList";
import ArtistWorksImageList from "./ArtistWorksImageList";

export default function DropDownCard({
  data,
  title,
  artistExpoList,
  purewords,
  expoImageList,
  artistWorksImageList,
  artistBio,
}) {
  const [showCard, setshowCard] = useState(false);
  const handleClick = () => {
    setshowCard(!showCard);
  };

  return (
    <>
      {purewords && (
        <PureWords
          data={data}
          handleClick={handleClick}
          title={title}
          showCard={showCard}
        />
      )}
      {artistBio && (
        <PureWords
          data={data}
          title={title}
          handleClick={handleClick}
          showCard={showCard}
        />
      )}
      {expoImageList && (
        <ExpoImageList
          data={data}
          handleClick={handleClick}
          showCard={showCard}
          title={title}
        />
      )}
      {artistWorksImageList && (
        <ArtistWorksImageList
          data={data}
          title={title}
          handleClick={handleClick}
          showCard={showCard}
        />
      )}
      {artistExpoList && (
        <ExpoList
          data={data}
          handleClick={handleClick}
          showCard={showCard}
          title={title}
        />
      )}
    </>
  );
}
