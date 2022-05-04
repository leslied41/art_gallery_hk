import ImageList from "../artist_works_imagelist/ImageList";
import Collapsible from "../collapsible/Collapsible";
import styles from "./ArtistWorksImageList.module.css";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { dropDownContext } from "./DropDownCard";

const ArtistWorksImageList = ({ data,works_collapsed }) => {
  //console.log(works_collapsed);
  const { showCard,setshowCard } = useContext(dropDownContext);
  const [loaded, setloaded] = useState(true);
  const [slicedWorkImages, setslicedWorkImages] = useState(data);
  const ref = useRef();
  useEffect(() => {
    if (data.length < 5) {
      setloaded(false);
    } else if (data.length >= 5) {
      setloaded(true);
    }
  }, [data.length]);
  useEffect(() => {

    if (!works_collapsed) {
      setshowCard(false);
    }
    if (works_collapsed) {
      setshowCard(true);
    }
    const initialWorkImages = data.slice(0, 5);
    setslicedWorkImages(initialWorkImages);
  }, []);

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
