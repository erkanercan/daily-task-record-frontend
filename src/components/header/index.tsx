import Image from "next/image";
import PrimaryButton from "../primary-button";
import SearchBar from "../search-bar";
import styles from "./header.module.scss";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomInputProps {
  value: string;
  onClick: () => void;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick }, ref) => {
    // Check if the date is today
    const isToday = (date: Date) => {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear === today.getFullYear
      );
    };
    return (
      <button className={styles.datePickerButton} onClick={onClick} ref={ref}>
        {isToday(new Date(value)) ? "Today" : value}
        <Image
          alt="Open calendar"
          src="/icons/expand.svg"
          width={20}
          height={20}
        />
      </button>
    );
  }
);

CustomInput.displayName = "CustomInput";

const Header = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className={styles.container}>
      <div className={styles.container__leftContainer}>
        <PrimaryButton>Report Your Daily Tasks</PrimaryButton>
        <DatePicker
          todayButton="Today"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date as Date)}
          customInput={<CustomInput value="" onClick={() => {}} />}
        />
      </div>
      <SearchBar />
    </div>
  );
};

export default Header;
