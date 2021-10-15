import styles from "./AppointmentForm.module.css";
import { useForm } from "react-hook-form";
import BlockContent from "@sanity/block-content-to-react";
import { useState } from "react";

const AppointmentForm = (FormResponse) => {
  const [showRes, setShowRes] = useState(false);
  console.log(FormResponse);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmitForm = async (values) => {
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
        setShowRes(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formContainer h3">
      <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-19">
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: true, maxLength: 20 })}
          />
          <p className="red-text h4">
            {errors.fullName?.type === "required" && "Name is required"}
          </p>
        </div>
        <div className="mb-19">
          <input
            name="dateTime"
            type="datetime-local"
            placeholder="Date & Time"
            {...register("dateTime", { required: true, maxLength: 20 })}
          />
          <p className="red-text h4">
            {errors.dateTime?.type === "required" && "Date & Time is required"}
          </p>
        </div>
        <div className="mb-19">
          <input
            name="headCount"
            type="number"
            placeholder="Head Count"
            {...register("headCount", { required: true, maxLength: 20 })}
          />
          <p className="red-text h4">
            {errors.headCount?.type === "required" && "Head Count is required"}
          </p>
        </div>

        <div className="mb-19">
          <input
            name="event"
            type="text"
            placeholder="Which event are you planning to go?"
            {...register("event", { required: true })}
          />
          <p className="red-text h4">
            {errors.event?.type === "required" && "Event is required"}
          </p>
        </div>
        <div className="mb-19">
          <input
            name="remarks"
            type="text"
            placeholder="Remarks"
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
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <p className="red-text h4">
            {errors.email?.type === "required" && "Email is required"}
          </p>
        </div>

        <input name="sent" type="submit" value="SENT" />
      </form>
      <div>
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
