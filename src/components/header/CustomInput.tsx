import Image from "next/image";
import { forwardRef } from "react";
import styles from "./header.module.scss";

interface CustomInputProps {
  value: string;
  onClick: () => void;
}

export const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
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
