import { usePortableText } from "../usehooks/usePortableText";
import styles from "./InterviewsList.module.css";
import { useRouter } from "next/router";

export const SingleInterview = ({ interview }) => {
  const {
    _id,
    title,
    title_cn,
    interview_brief,
    interview_brief_cn,
    interview_link,
  } = interview;
  const router = useRouter();
  const intro_portableText = usePortableText(
    router.locale === "en" ? interview_brief : interview_brief_cn
  );
  return (
    <>
      <div key={_id} className="mt-30">
        <a
          href={interview_link ? interview_link : null}
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <h3 className="h6 text-underline">
              {router.locale == "en" ? title : title_cn}
            </h3>
          </div>

          <div className="h3 mt-5 ">{intro_portableText}</div>
        </a>
      </div>
    </>
  );
};
