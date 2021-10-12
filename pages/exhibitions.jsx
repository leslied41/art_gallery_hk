import ReactPlayer from "react-player";
export default function Exhibition() {
  return (
    <>
      <main>
        <div>
          <h1>Exhibition</h1>
          <div>
            <ReactPlayer
              controls={true}
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            />
          </div>
        </div>
      </main>
    </>
  );
}
