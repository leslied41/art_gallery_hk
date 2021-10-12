import styles from "./SliderBtn.module.css";
const SliderBtn = ({ moveSlide, direction }) => {
  console.log(moveSlide);
  const getBtnStyle = () => {
    if (direction === "next") {
      return styles.left;
    } else if (direction === "prev") {
      return styles.right;
    }
  };
  return (
    <div className={getBtnStyle()}>
      <button onClick={moveSlide}>
        {direction === "next" ? `+${direction}` : `-${direction}`}
      </button>
    </div>
  );
};

export default SliderBtn;
