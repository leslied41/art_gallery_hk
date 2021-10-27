import VerticalLayout from "../exStaticCard/VerticalLayout";
import HorizontalLayout from "../exStaticCard/HorizontalLayout";
const ExListWorks = ({ data, title, showCard, handleClick }) => {
  const { works } = data;
  console.log(works);
  // console.log(works);
  // works.map((item) => {
  //   const metaData = item.metadata;
  //   console.log(metaData.metadata.dimensions.width);
  // });
  return (
    <>
      <div className="twoColumn-11">
        <div className="col"></div>
        <div className="col">
          <div className="title">
            <span className="h2" onClick={handleClick}>
              {title} {showCard ? "-" : "+"}
            </span>
          </div>
          <div>{showCard || <hr className="hr-top" />}</div>
        </div>
      </div>
      {
        showCard && (
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
                  <div key={index}>
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
                  <div key={index}>
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
        )
        // <div className="mt-89">
        //   <VerticalLayout
        //     image={image}
        //     image_parameter={image_parameter}
        //     introduction={introduction}
        //     introduction_cn={introduction_cn}
        //   />
        // </div>
      }
    </>
  );
};
export default ExListWorks;
