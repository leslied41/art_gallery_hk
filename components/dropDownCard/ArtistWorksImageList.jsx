import ImageList from "../imageList/ImageList";
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
          <div>{showCard || <hr className="hr-top" />}</div>
        </div>
      </div>

      <div className="works">{showCard && <ImageList workImages={data} />}</div>

      <div className="twoColumn-11">
        <div className="col"></div>
        <div className="col">
          <div>{showCard && <hr className="hr-bottom" />}</div>
        </div>
      </div>
    </>
  );
};
export default ArtistWorksImageList;
