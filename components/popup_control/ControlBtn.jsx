import styles from "./ControlBtn.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useGlobalSettings } from "../context/GlobalSettings";
import { useRouter } from "next/router";

const ControlBtn = () => {
  const { settings, popup } = useGlobalSettings();
  const [popup_path, setpopup_path] = popup;
  const router = useRouter();

  return (
    <>
      <div
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
          //console.log("cliclded");
          router.push(popup_path || "/");
        }}
      >
        <span className="icon-Web-Sign_1_AW001-02"></span>
        {/* <AiOutlineClose /> */}
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
        onClick={() => {
          //console.log("cliclded");
          router.back();
        }}
      >
        <span className="icon-Web-Sign_1_AW001-01"></span>
        {/* <BiArrowBack /> */}
      </div>
    </>
  );
};
export default ControlBtn;
