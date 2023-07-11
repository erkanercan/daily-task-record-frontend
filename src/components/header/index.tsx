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
import { useUserStore } from "@/stores/user-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
  const { user, setUser } = useUserStore();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync: login, isLoading: isLoginLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      if (!loginForm.email || !loginForm.password) {
        toast("Please enter your email and password", { type: "error" });
        return;
      }
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      if (!baseURL) throw new Error("No API URL found");
      const data = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginForm),
      }).then((res) => {
        if (res.status === 400) {
          toast("Invalid email or password", { type: "error" });
          return;
        }
        return res.json();
      });
      console.log(data);
      setUser(data);
    },
    onError: (error: any) => {
      toast(error.message, { type: "error" });
    },
  });

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
                <PrimaryButton className={styles.submitButton}>
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
      <div className={styles.container__rightContainer}>
        {!user && (
          <div
            className={styles.container__rightContainer__buttonGroupContainer}
          >
            <Modal>
              <ModalTrigger>
                <PrimaryButton>Login</PrimaryButton>
              </ModalTrigger>
              <ModalPortal>
                <ModalOverlay />
                <ModalContent>
                  <ModalTitle>Login</ModalTitle>
                  <div
                    className={
                      styles.container__rightContainer__loginInputGroupContainer
                    }
                  >
                    <input
                      className={styles.container__rightContainer__loginInput}
                      placeholder="Email"
                      onChange={(e) =>
                        setLoginForm({
                          ...loginForm,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      className={styles.container__rightContainer__loginInput}
                      placeholder="Password"
                      onChange={(e) =>
                        setLoginForm({
                          ...loginForm,
                          password: e.target.value,
                        })
                      }
                    />
                    <PrimaryButton
                      className={styles.submitButton}
                      onClick={() => {
                        login();
                      }}
                    >
                      Submit
                    </PrimaryButton>
                  </div>
                </ModalContent>
              </ModalPortal>
            </Modal>
            <Modal>
              <ModalTrigger>
                <PrimaryButton>Register</PrimaryButton>
              </ModalTrigger>
              <ModalPortal>
                <ModalOverlay />
                <ModalContent>
                  <ModalTitle>Register</ModalTitle>
                  <div
                    className={
                      styles.container__rightContainer__loginInputGroupContainer
                    }
                  >
                    <input
                      className={styles.container__rightContainer__loginInput}
                      placeholder="Name"
                    />
                    <input
                      className={styles.container__rightContainer__loginInput}
                      placeholder="Title"
                    />
                    <input
                      className={styles.container__rightContainer__loginInput}
                      placeholder="Email"
                    />
                    <input
                      className={styles.container__rightContainer__loginInput}
                      placeholder="Password"
                      type="password"
                    />
                    <PrimaryButton className={styles.submitButton}>
                      Submit
                    </PrimaryButton>
                  </div>
                </ModalContent>
              </ModalPortal>
            </Modal>
          </div>
        )}
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
