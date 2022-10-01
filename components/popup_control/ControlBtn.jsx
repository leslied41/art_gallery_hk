import { usePathHistory } from "../context/PathHistory";
import { useRouter } from "next/router";

const ControlBtn = () => {
  const { popup } = usePathHistory();
  const [popup_path, setpopup_path] = popup;
  const router = useRouter();

  return (
    <>
      <div
        role="button"
        aria-label="close"
        style={{
          position: "fixed",
          right: "20px",
          top: "20px",
          fontSize: "2em",
          cursor: "pointer",
          zIndex: "99",
          color: "white",
          mixBlendMode: "exclusion",
        }}
        onClick={() => {
          router.push(popup_path || "/");
        }}
      >
        <span className="icon-Web-Sign_1_AW001-02"></span>
      </div>

      <div
        style={{
          position: "fixed",
          left: "20px",
          top: "20px",
          fontSize: "2em",
          cursor: "pointer",
          zIndex: "99",
          color: "white",
          mixBlendMode: "exclusion",
        }}
        role="button"
        aria-label="back"
        onClick={() => {
          router.back();
        }}
      >
        <span className="icon-Web-Sign_1_AW001-01"></span>
      </div>
    </>
  );
};
export default ControlBtn;
