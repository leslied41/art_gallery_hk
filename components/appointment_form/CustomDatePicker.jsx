import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import { useRouter } from "next/router";

const CustomDatePicker = ({ date, date_cn, onChange, selected }) => {
  const router = useRouter();
  const filterDay = (date) => {
    const month = date.getMonth();
    const dateNum = date.getDate();
    const day = date.getDay();
    return ((day !== 0 && day !== 1 && day !== 2) || (month === 2 && dateNum >= 20 && dateNum <= 26));
  };
  const filterTime = (date) => {
    const month = date.getMonth();
    const dateNum = date.getDate();
    const hour = date.getHours();
    console.log(hour)
    if (month === 2 && dateNum >= 21 && dateNum <= 26) {
      return true
    } else if (month === 2 && dateNum === 20) {
      return (hour >= 16 && hour <= 23)
    } else {
      return (hour >= 13 && hour <= 18)
    }
  }
      
    
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      aria-label="date and time"
      name="dateTime"
      defaultValue={value}
      onClick={onClick}
      ref={ref}
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
      style={{ width: "100%", borderBottom: "1px solid #000", color: "#000" }}
    />
  ));

  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholder={
        router.locale == "en"
          ? date
            ? date
            : "Date & Time"
          : date_cn
          ? date_cn
          : "日期 & 時間"
      }
      showTimeSelect
      filterDate={filterDay}
      filterTime={filterTime}
      timeIntervals={60}
      customInput={<CustomInput />}
      dateFormat="dd/MM/yyyy h:mm aa"
    />
  );
};
export default CustomDatePicker;
