import styles from "./AppointmentForm.module.css";
const AppointmentForm = () => {
  return (
    <div className="formContainer">
      <div className="h3">
        <form className={styles.form}>
          <input type="text" placeholder="Full Name" />
          <input type="datetime-local" placeholder="Date & Time" />
          <input type="number" placeholder="Head Count" />
          <input
            type="text"
            placeholder="Which event are you planning to go?"
          />
          <input type="text" placeholder="Remarks" />
          <input type="email" placeholder="Email" />
          <input type="submit" value="SENT" />
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
