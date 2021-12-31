import styles from "./LoadMoreCard.module.css";
import loadmore from "../../public/images/loadmore.png";
import Image from "next/image";

const LoadMoreCard = ({ loaded, loadMore }) => {
  return (
    <div>
      {loaded && (
        <div className={styles.darkSquare} onClick={loadMore}>
          <Image src={loadmore} alt="darksquare" width={624} height={437} />
          <span className={styles.loadmore}>Load More+</span>
        </div>
      )}
    </div>
  );
};

export default LoadMoreCard;
