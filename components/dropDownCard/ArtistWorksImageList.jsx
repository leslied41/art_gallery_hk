import ImageList from "../imageList/ImageList";
import Collapsible from "../collapsible/Collapsible";
const ArtistWorksImageList = ({ data, title, showCard, handleClick }) => {
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
        </div>
      </div>
      <Collapsible showCard={showCard}>
        <div className="works">
          <ImageList workImages={data} />
        </div>
      </Collapsible>
      <div className="twoColumn-11">
        <div className="col"></div>
        <div className="col">
          <div>
            {" "}
            <hr className="hr-bottom" />
          </div>
        </div>
      </div>
    </>
  );
};
export default ArtistWorksImageList;
