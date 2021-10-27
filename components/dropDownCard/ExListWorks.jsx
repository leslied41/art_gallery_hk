import VerticalLayout from "../exStaticCard/VerticalLayout";
const ExListWorks = ({ data, title, showCard, handleClick }) => {
  const {
    name_exo,
    name_exo_cn,
    date,
    date_cn,
    image,
    image_parameter,
    introduction,
    introduction_cn,
    works,
  } = data;
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
              console.log(width);
              if (width > 670) {
                return <h1 key={index}>love</h1>;
              } else if (width < 670) {
                return <h1 key={index}>hate</h1>;
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
