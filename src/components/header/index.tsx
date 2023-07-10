import Image from "next/image";
import PrimaryButton from "../primary-button";
import SearchBar from "../search-bar";
import styles from "./header.module.scss";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
} from "../modal";
import "react-datepicker/dist/react-datepicker.css";
import { useDateStore } from "@/stores/date-store";
import TaskInput from "../task-input";

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
  const { selectedDate, setSelectedDate } = useDateStore();

  return (
    <div className={styles.container}>
      <div className={styles.container__leftContainer}>
        <Modal>
          <ModalTrigger>
            <PrimaryButton>Report Your Daily Tasks</PrimaryButton>
          </ModalTrigger>
          <ModalPortal>
            <ModalOverlay />
            <ModalContent>
              <ModalTitle>Report Your Daily Tasks</ModalTitle>
              <ModalDescription>
                Please report your daily tasks below. You should enter the task
                type, task name, and estimated time you will spent on the task.
                You can also add a comments, but please keep them concise.
              </ModalDescription>
              <div
                className={
                  styles.container__leftContainer__taskInputGroupContainer
                }
              >
                <TaskInput />
                <TaskInput />
                <TaskInput />
                <PrimaryButton
                  className={
                    styles.container__leftContainer__taskInputGroupContainer__submitButton
                  }
                >
                  Submit
                </PrimaryButton>
              </div>
            </ModalContent>
          </ModalPortal>
        </Modal>
        <DatePicker
          todayButton="Today"
          selected={selectedDate}
          onChange={(date) => {
            // Convert date to only date not time
            const newDate = new Date(date as Date);
            newDate.setHours(0, 0, 0, 0);
            setSelectedDate(newDate);
          }}
          customInput={<CustomInput value="" onClick={() => {}} />}
        />
      </div>
      <SearchBar />
    </div>
  );
};

export default Header;
