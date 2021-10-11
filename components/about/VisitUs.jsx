import styles from "./VisitUs.module.css";
import BlockContent from "@sanity/block-content-to-react";
import AppointmentForm from "../appointmentForm/AppointmentForm";

export default function VisitUs({ visitUs }) {
  const { description, response } = visitUs[0];
  return (
    <div className="twoColumn-11">
      <div className="col"></div>
      <div className="col">
        <div className={styles.title}>
          <span className="h1">VISIT US</span>{" "}
        </div>
        <div>
          <span className="h3">
            {
              <BlockContent
                blocks={description}
                projectId="z3dq9mvc"
                dataset="production"
              />
            }
          </span>
        </div>
        <div>{<AppointmentForm />}</div>
        <div className="response">
          <span className="h3">
            {
              <BlockContent
                blocks={response}
                projectId="z3dq9mvc"
                dataset="production"
              />
            }
          </span>
        </div>
      </div>
    </div>
  );
}
