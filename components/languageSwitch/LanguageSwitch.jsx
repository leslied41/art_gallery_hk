import { useRouter } from "next/router";

const LanguageSwitch = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const changeLanEn = () => {
    router.push({ pathname, query }, asPath, { locale: "en" });
  };
  const changeLanTc = () => {
    router.push({ pathname, query }, asPath, { locale: "tc" });
  };
  return (
    <ul>
      <li>
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
