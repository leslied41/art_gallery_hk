import { useState, useContext } from "react";
import { I18nContext } from "react-i18next";
import { i18n } from "next-i18next";
import { useRouter } from "next/router";

const LanguageSwitch = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  // const {
  //   i18n: { language },
  // } = useContext(I18nContext);
  // const [lan, setLan] = useState(i18n.language);

  const changeLanEn = () => {
    // i18n.changeLanguage("en");
    // setLan(i18n.language);
    router.push({ pathname, query }, asPath, { locale: "en" });
  };
  const changeLanTc = () => {
    // i18n.changeLanguage("tc");
    // setLan(i18n.language);
    router.push({ pathname, query }, asPath, { locale: "tc" });
  };
  return (
    <ul>
      <li className="h4">
        <span
          onClick={changeLanTc}
          style={
            router.locale === "en" ? { display: "block" } : { display: "none" }
          }
        >
          中文
        </span>

        <span
          onClick={changeLanEn}
          style={
            router.locale === "tc" ? { display: "block" } : { display: "none" }
          }
        >
          ENG
        </span>
      </li>
    </ul>
  );
};
export default LanguageSwitch;
