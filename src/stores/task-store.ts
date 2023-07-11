import { Status, Task } from "@/types/task";
import { create } from "zustand";

interface TaskState {
  tasks: {
    backlog: Task[];
    in_progress: Task[];
    done: Task[];
  };
  initialTasksLoaded: boolean;
  setTasks: (tasks: {
    backlog: Task[];
    in_progress: Task[];
    done: Task[];
  }) => void;
  changeTaskColumn: (
    taskId: string,
    fromColumn: Status,
    toColumn: Status
  ) => void;

  getTasksByUserId: (userId: string) => Task[];
  setInitialTasksLoaded: (initialTasksLoaded: boolean) => void;
}

export const useTaskStore = create<TaskState>()((set, get) => ({
  tasks: {
    backlog: [],
    in_progress: [],
    done: [],
  },
  initialTasksLoaded: false,
  setTasks: (tasks: { backlog: Task[]; in_progress: Task[]; done: Task[] }) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        ...tasks,
      },
    })),

  changeTaskColumn: (taskId: string, fromColumn: Status, toColumn: Status) =>
    set((state) => {
      const task = state.tasks[fromColumn].find((task) => task._id === taskId);
      if (!task) return state;
      const newTasks = {
        ...state.tasks,
        [fromColumn]: state.tasks[fromColumn].filter(
          (task) => task._id !== taskId
        ),
        [toColumn]: [...state.tasks[toColumn], task],
      };
      return {
        tasks: newTasks,
      };
    }),
  getTasksByUserId: (userId: string) => {
    const { backlog, in_progress, done } = get().tasks;
    return [...backlog, ...in_progress, ...done].filter(
      (task) => task.user._id === userId
    );
  },
  setInitialTasksLoaded: (initialTasksLoaded: boolean) =>
    set(() => ({
      initialTasksLoaded,
    })),
}));
