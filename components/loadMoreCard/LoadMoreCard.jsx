import styles from "./LoadMoreCard.module.css";
import loadmore from "../../public/images/loadmore.png";
import Image from "next/image";

const LoadMoreCard = ({ loaded, loadMore }) => {
  console.log(loaded);
  return (
    <div>
      {loaded && (
        <div className={styles.darkSquare} onClick={loadMore}>
          <Image src={loadmore} alt="darksquare" width={624} height={437} />
          <div className={styles.loadmore}>
            <span className="h2">Load More +</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadMoreCard;
