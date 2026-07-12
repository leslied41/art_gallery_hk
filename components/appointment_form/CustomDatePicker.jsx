import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import setMonth from "date-fns/setMonth";
import setDate from "date-fns/setDate";
import { useRouter } from "next/router";

const DEFAULT_HOURS = {
  open_days: [3, 4, 5, 6], // Wed - Sat
  first_hour: 13,
  last_hour: 18,
  special_periods: [],
};

const CustomDatePicker = ({
  date,
  date_cn,
  onChange,
  selected,
  bookingHours,
}) => {
  const router = useRouter();
  const config = {
    ...DEFAULT_HOURS,
    ...Object.fromEntries(
      Object.entries(bookingHours ?? {}).filter(([, v]) => v != null)
    ),
  };

  const findSpecialPeriod = (date) =>
    config.special_periods.find((period) => {
      if (!period?.start || !period?.end) return false;
      const start = new Date(period.start);
      start.setHours(0, 0, 0, 0);
      const end = new Date(period.end);
      end.setHours(23, 59, 59, 999);
      return date >= start && date <= end;
    });

  const filterDay = (date) => {
    const period = findSpecialPeriod(date);
    const openDays = period?.open_days?.length
      ? period.open_days
      : config.open_days;
    return openDays.includes(date.getDay());
  };

  const filterTime = (date) => {
    const period = findSpecialPeriod(date);
    const firstHour = period?.first_hour ?? config.first_hour;
    const lastHour = period?.last_hour ?? config.last_hour;
    const hour = date.getHours();
    return hour >= firstHour && hour <= lastHour;
  };

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
  CustomInput.displayName = 'CustomInput';

  let excluded = [
    {
      "time": "11:11",
      "date": "Mar 25 2024"
    },
    {
      "time": "11:11",
      "date": "Mar 26 2024"
    }
  ]

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
