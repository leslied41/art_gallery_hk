import styles from "./AppointmentForm.module.css";
import { useForm } from "react-hook-form";
import BlockContent from "@sanity/block-content-to-react";
import { useState } from "react";
import { useRouter } from "next/router";

const AppointmentForm = (FormResponse) => {
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
          placeholder={router.locale == "en" ? "Full Name" : "姓名"}
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
            placeholder={router.locale == "en" ? "Date & Time" : "日期时间"}
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
            placeholder={router.locale == "en" ? "Head Count" : "人数"}
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
                ? "Which event are you planning to go?"
                : "您想参加哪项活动"
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
            placeholder={router.locale == "en" ? "Remarks" : "评论"}
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
            placeholder={router.locale == "en" ? "Email" : "电子邮箱"}
            {...register("email", { required: true })}
          />
          <p className="red-text h4">
            {errors.email?.type === "required" && "Email is required"}
          </p>
        </div>

        {sending ? (
          <div>{router.locale == "en" ? "Sending..." : "发送中..."}</div>
        ) : (
          <input
            name="sent"
            type="submit"
            value={router.locale == "en" ? "SENT" : "发送"}
          />
        )}
      </form>
      <div>
        {/* {sending && <div>Sending...</div>} */}
        {showRes && (
          <BlockContent
            blocks={FormResponse}
            projectId="z3dq9mvc"
            dataset="production"
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
