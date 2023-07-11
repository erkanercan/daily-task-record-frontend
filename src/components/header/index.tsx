import PrimaryButton from "../primary-button";
import SearchBar from "../search-bar";
import styles from "./header.module.scss";
import { useState } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getAvatar } from "@/utils/avatar";
import { useTaskStore } from "@/stores/task-store";
import { CustomInput } from "./CustomInput";

const Header = () => {
  const { selectedDate, setSelectedDate } = useDateStore();
  const { user, setUser } = useUserStore();
  const { tasks, initialTasksLoaded, getTasksByUserId, setInitialTasksLoaded } =
    useTaskStore();
  const [open, setOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    title: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [taskFormData, setTaskFormData] = useState(
    Array(3).fill({
      text: "",
      category: "",
      taskDay: selectedDate,
    })
  );

  const { data: userTasks } = useQuery({
    queryKey: [
      "tasks",
      user,
      user?._id,
      selectedDate,
      initialTasksLoaded,
      tasks,
    ],
    queryFn: async () => {
      if (!user?._id) return null;
      const tasks = getTasksByUserId(user._id);
      const emptyTasks = Array(3 - tasks.length).fill({
        text: "",
        category: "",
        taskDay: selectedDate,
      });
      console.log([...tasks, ...emptyTasks]);
      setTaskFormData([...tasks, ...emptyTasks]);
      return [...tasks, ...emptyTasks];
    },
    enabled: !!user?._id && initialTasksLoaded,
    refetchOnWindowFocus: false,
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
      setUser(data.data.user);
      return data;
    },
    onError: (error: any) => {
      toast(error.message, { type: "error" });
    },
  });

  const { mutateAsync: register, isLoading: isRegisterLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: async () => {
      if (
        !registerForm.name ||
        !registerForm.title ||
        !registerForm.email ||
        !registerForm.password ||
        !registerForm.passwordConfirm
      ) {
        toast("Please fill out all fields", { type: "error" });
        return;
      }
      if (registerForm.password !== registerForm.passwordConfirm) {
        toast("Passwords do not match", { type: "error" });
        return;
      }
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      if (!baseURL) throw new Error("No API URL found");
      const data = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(registerForm),
      }).then((res) => {
        if (res.status === 409) {
          toast("Email already exists", { type: "error" });
          return;
        }
        return res.json();
      });
      toast("Account created successfully, you can now login", {
        type: "success",
      });
      setUser(data.user);
      setOpen(false);
      return data;
    },
  });

  const { data: avatar } = useQuery({
    queryKey: ["userAvatar", user, user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      return getAvatar(user.email);
    },
    enabled: !!user && !!user.email,
  });

  const { mutateAsync: addTasks } = useMutation({
    mutationKey: ["addTasks"],
    mutationFn: async (tasksToCreate: any[]) => {
      if (!user?._id) return;
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      if (!baseURL) throw new Error("No API URL found");
      tasksToCreate.forEach(async (task) => {
        await fetch(`${baseURL}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(task),
        });
      });
    },
  });

  const { mutateAsync: updateTasks } = useMutation({
    mutationKey: ["updateTasks"],
    mutationFn: async (tasksToUpdate: any[]) => {
      if (!user?._id) return;
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      if (!baseURL) throw new Error("No API URL found");
      tasksToUpdate.forEach(async (task) => {
        await fetch(`${baseURL}/tasks/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(task),
        });
      });
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.container__leftContainer}>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalTrigger>
            <PrimaryButton disabled={!user}>
              Report Your Daily Tasks
            </PrimaryButton>
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
                {userTasks?.map((task, index) => (
                  <TaskInput
                    key={index}
                    index={index}
                    initialData={task}
                    onInputChange={(index, value) => {
                      // Update task form data
                      const newTaskFormData = [...taskFormData];
                      newTaskFormData[index] = value;
                      setTaskFormData(newTaskFormData);
                    }}
                  />
                ))}
                <PrimaryButton
                  className={styles.submitButton}
                  onClick={async () => {
                    const filteredTaskFormData = taskFormData.filter(
                      (task) => task.text || task.category
                    );

                    // Find the tasks that really changed
                    const tasksThatChanged = filteredTaskFormData.filter(
                      (task, index) => {
                        const initialTask = userTasks?.[index];
                        if (!initialTask) return true;
                        return (
                          task.text !== initialTask.text ||
                          task.category !== initialTask.category
                        );
                      }
                    );
                    // add taskday to each task
                    tasksThatChanged.forEach((task) => {
                      task.taskDay = selectedDate;
                    });

                    // Check if all tasks have text and category
                    if (
                      tasksThatChanged.some(
                        (task) => !task.text || !task.category
                      )
                    ) {
                      // Show error, for example if user filled a category but not text or vice versa
                      toast(
                        "Please fill out empty areas, for example if you filled out a category, please fill out the text area as well",
                        { type: "error" }
                      );
                      return;
                    }
                    // Check if tasks have _id, if they do, update, if not, create
                    const tasksToCreate = tasksThatChanged.filter(
                      (task) => !task._id
                    );
                    const tasksToUpdate = tasksThatChanged.filter(
                      (task) => !!task._id
                    );
                    // Create tasks
                    if (tasksToCreate.length > 0) {
                      await addTasks(tasksToCreate);
                    }
                    // Update tasks
                    if (tasksToUpdate.length > 0) {
                      await updateTasks(tasksToUpdate);
                    }

                    toast(
                      `Tasks for ${selectedDate.toLocaleDateString()} saved`,
                      {
                        type: "success",
                      }
                    );
                    setInitialTasksLoaded(false);
                    setOpen(false);
                  }}
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
      <div className={styles.container__rightContainer}>
        {!user ? (
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
                      type="password"
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
                      disabled={isLoginLoading}
                    >
                      Submit
                    </PrimaryButton>
                  </div>
                </ModalContent>
              </ModalPortal>
            </Modal>
            <Modal open={open} onOpenChange={setOpen}>
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
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      className={styles.container__rightContainer__loginInput}
                      placeholder="Title"
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          title: e.target.value,
                        })
                      }
                    />
                    <input
                      className={styles.container__rightContainer__loginInput}
                      placeholder="Email"
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      className={styles.container__rightContainer__loginInput}
                      placeholder="Password"
                      type="password"
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          password: e.target.value,
                        })
                      }
                    />
                    <input
                      className={styles.container__rightContainer__loginInput}
                      placeholder="Password Confirmation"
                      type="password"
                      disabled={isRegisterLoading}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          passwordConfirm: e.target.value,
                        })
                      }
                    />
                    <PrimaryButton
                      onClick={() => {
                        register();
                      }}
                      className={styles.submitButton}
                    >
                      Submit
                    </PrimaryButton>
                  </div>
                </ModalContent>
              </ModalPortal>
            </Modal>
          </div>
        ) : (
          <div
            className={styles.container__rightContainer__userAvatarContainer}
          >
            {avatar}
            <div>
              <p>{user.name}</p>
              <p>{user.title}</p>
            </div>
          </div>
        )}
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
