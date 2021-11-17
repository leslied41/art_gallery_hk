import VerticalLayout from "../exhibitions_exhibition_staticcard/VerticalLayout";
import HorizontalLayout from "../exhibitions_exhibition_staticcard/HorizontalLayout";
import Collapsible from "../collapsible/Collapsible";
import { useContext } from "react";
import { dropDownContext } from "./DropDownCard";
const ExListWorks = ({ data }) => {
  const { showCard } = useContext(dropDownContext);
  const { works } = data;
  return (
    <>
      <Collapsible showCard={showCard}>
        <>
          {works.map((work, index) => {
            const width = work.metadata.metadata.dimensions.width;
            const aspectRatio = work.metadata.metadata.dimensions.aspectRatio;
            const {
              name,
              name_cn,
              image,
              image_parameter,
              introduction,
              introduction_cn,
            } = work;
            console.log(aspectRatio, width);
            if (width > 750 && aspectRatio > 1) {
              return (
                <div key={index} className="mt-118">
                  <VerticalLayout
                    name={name}
                    name_cn={name_cn}
                    image={image}
                    image_parameter={image_parameter}
                    introduction={introduction}
                    introduction_cn={introduction_cn}
                  />
                </div>
              );
            } else {
              return (
                <div key={index} className="mt-118">
                  <HorizontalLayout
                    name={name}
                    name_cn={name_cn}
                    image={image}
                    image_parameter={image_parameter}
                    introduction={introduction}
                    introduction_cn={introduction_cn}
                  />
                </div>
              );
            }
          })}
        </>
      </Collapsible>
    </>
  );
};
export default ExListWorks;
