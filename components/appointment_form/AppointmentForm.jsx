import styles from "./AppointmentForm.module.css";
import { useForm } from "react-hook-form";
import BlockContent from "@sanity/block-content-to-react";
import { useState } from "react";
import { useRouter } from "next/router";

const AppointmentForm = ({ formdata }) => {
  //console.log(formdata);
  const {
    form_email,
    form_email_cn,
    full_name,
    full_name_cn,
    date,
    date_cn,
    event,
    event_cn,
    head_count,
    head_count_cn,
    remarks,
    remarks_cn,
    response,
    response_cn,
  } = formdata;
  const router = useRouter();
  const [showRes, setShowRes] = useState(false);
  const [sending, setSending] = useState(false);
  //console.log(FormResponse);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmitForm = async (values) => {
    setSending(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        console.log("success");
        reset({});
        setSending(false);
        setShowRes(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formContainer h3">
      <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
        <input
          name="fullName"
          type="text"
          placeholder={
            router.locale == "en"
              ? full_name
                ? full_name
                : "Full Name"
              : full_name_cn
              ? full_name_cn
              : "姓名"
          }
          {...register("fullName", { required: true, maxLength: 20 })}
        />
        <p className="red-text h4">
          {errors.fullName?.type === "required" && "Name is required"}
        </p>

        <div>
          <input
            name="dateTime"
            onFocus={(e) => {
              e.target.type = "datetime-local";
            }}
            type="text"
            placeholder={
              router.locale == "en"
                ? date
                  ? date
                  : "Date & Time"
                : date_cn
                ? date_cn
                : "日期 & 時間"
            }
            {...register("dateTime", { required: true, maxLength: 20 })}
          />
          <p className="red-text h4">
            {errors.dateTime?.type === "required" && "Date & Time is required"}
          </p>
        </div>
        <div>
          <input
            name="headCount"
            type="number"
            placeholder={
              router.locale == "en"
                ? head_count
                  ? head_count
                  : "Head Count"
                : head_count_cn
                ? head_count_cn
                : "人數"
            }
            {...register("headCount", { required: true, maxLength: 20 })}
          />
          <p className="red-text h4">
            {errors.headCount?.type === "required" && "Head Count is required"}
          </p>
        </div>

        <div>
          <input
            name="event"
            type="text"
            placeholder={
              router.locale == "en"
                ? event
                  ? event
                  : "Which event are you planning to go ?"
                : event_cn
                ? event_cn
                : "您想參加那項活動？"
            }
            {...register("event", { required: true })}
          />
          <p className="red-text h4">
            {errors.event?.type === "required" && "Event is required"}
          </p>
        </div>
        <div>
          <input
            name="remarks"
            type="text"
            placeholder={
              router.locale == "en"
                ? remarks
                  ? remarks
                  : "Remarks"
                : remarks_cn
                ? remarks_cn
                : "評論"
            }
            {...register("remarks", { required: true })}
          />
          <p className="red-text h4">
            {errors.remarks?.type === "required" && "Remarks is required"}
          </p>
        </div>
        <div className="mb-19">
          <input
            name="email"
            type="email"
            placeholder={
              router.locale == "en"
                ? form_email
                  ? form_email
                  : "Email"
                : form_email_cn
                ? form_email_cn
                : "電子郵箱"
            }
            {...register("email", { required: true })}
          />
          <p className="red-text h4">
            {errors.email?.type === "required" && "Email is required"}
          </p>
        </div>

        {sending ? (
          <div style={{ color: "#9b9b9b" }}>
            {router.locale == "en" ? "Sent" : "發送中..."}
          </div>
        ) : (
          <input
            name="sent"
            type="submit"
            value={router.locale == "en" ? "Send" : "發送"}
          />
        )}
      </form>
      <div>
        {/* {sending && <div>Sending...</div>} */}
        {showRes && (
          <BlockContent
            blocks={router.locale == "en" ? response : response_cn}
            projectId="z3dq9mvc"
            dataset="production"
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
