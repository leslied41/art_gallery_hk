import data from "./data.js";
import styles from "./Slider.module.css";
import SliderBtn from "../sliderBtn/SliderBtn";
import { useState } from "react";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const nextSlide = () => {
    if (slideIndex !== data.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === data.length) {
      setSlideIndex(1);
    }
  };
  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(data.length);
    }
  };

  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        const getSlideStyle = () => {
          if (slideIndex === index + 1) {
            return styles.showSlide;
          } else {
            return styles.hideSlide;
          }
        };
        const { id, title, subTitle, url } = item;
        return (
          <div className={getSlideStyle()} key={id}>
            <img src={url} alt={title} />
          </div>
        );
      })}
      <SliderBtn moveSlide={nextSlide} direction={"next"} />
      <SliderBtn moveSlide={prevSlide} direction={"prev"} />
    </div>
  );
};

export default Slider;
