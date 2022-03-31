import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, forwardRef } from "react";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import { useRouter } from "next/router";
import styles from "./CustomDatePicker.module.css";

const CustomDatePicker = ({ date, date_cn, onChange, selected }) => {
  const router = useRouter();
  const filterDay = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 1 && day !== 2;
  };
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
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
      style={{ width: "100%", borderBottom: "1px solid #000" }}
    />
  ));

  return (
    <DatePicker
      //selected={startDate}
      selected={selected}
      onChange={onChange}
      //onChange={(date) => setStartDate(date)}
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
      minTime={setHours(setMinutes(new Date(), 0), 13)}
      maxTime={setHours(setMinutes(new Date(), 30), 17)}
      customInput={<CustomInput />}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};
export default CustomDatePicker;
