import ImageList from "../artist_works_imagelist/ImageList";
import Collapsible from "../collapsible/Collapsible";
import styles from "./ArtistWorksImageList.module.css";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { dropDownContext } from "./DropDownCard";

const ArtistWorksImageList = ({ data }) => {
  const { showCard } = useContext(dropDownContext);
  const [loaded, setloaded] = useState(true);
  const [slicedWorkImages, setslicedWorkImages] = useState(data);
  const ref = useRef();
  useEffect(() => {
    if (data.length < 4) {
      setloaded(false);
    } else if (data.length >= 4) {
      setloaded(true);
    }
  }, [data]);
  useEffect(() => {
    const initialWorkImages = data.slice(0, 4);
    setslicedWorkImages(initialWorkImages);
  }, []);
  useEffect(() => {
    const initialWorkImages = data.slice(0, 4);

    if (!showCard) {
      setslicedWorkImages(initialWorkImages);
      setloaded(true);
    }
  }, [showCard]);
  const loadMore = () => {
    setslicedWorkImages(data);
    setloaded(!loaded);
  };
  return (
    <>
      <Collapsible showCard={showCard} loaded={loaded}>
        <div className={styles.works}>
          <ImageList
            workImages={data}
            showCard={showCard}
            slicedWorkImages={slicedWorkImages}
            loaded={loaded}
            loadMore={loadMore}
          />
        </div>
      </Collapsible>
    </>
  );
};
export default ArtistWorksImageList;
