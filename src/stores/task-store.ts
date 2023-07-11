import { Task } from "@/types/task";
import { create } from "zustand";

interface TaskState {
  tasks: {
    backlog: Task[];
    inProgress: Task[];
    done: Task[];
  };
  setTasks: (tasks: {
    backlog: Task[];
    inProgress: Task[];
    done: Task[];
  }) => void;
  addTaskToBacklog: (task: Task) => void;
  addTaskToInProgress: (task: Task) => void;
  addTaskToDone: (task: Task) => void;
  removeTaskFromBacklog: (task: Task) => void;
  removeTaskFromInProgress: (task: Task) => void;
  removeTaskFromDone: (task: Task) => void;
}

export const useTaskStore = create<TaskState>()((set) => ({
  tasks: {
    backlog: [],
    inProgress: [],
    done: [],
  },
  setTasks: (tasks: { backlog: Task[]; inProgress: Task[]; done: Task[] }) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        ...tasks,
      },
    })),
  addTaskToBacklog: (task: Task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        backlog: [...state.tasks.backlog, task],
      },
    })),
  addTaskToInProgress: (task: Task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        inProgress: [...state.tasks.inProgress, task],
      },
    })),
  addTaskToDone: (task: Task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        done: [...state.tasks.done, task],
      },
    })),
  removeTaskFromBacklog: (task: Task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        backlog: state.tasks.backlog.filter((t) => t._id !== task._id),
      },
    })),
  removeTaskFromInProgress: (task: Task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        inProgress: state.tasks.inProgress.filter((t) => t._id !== task._id),
      },
    })),
  removeTaskFromDone: (task: Task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        done: state.tasks.done.filter((t) => t._id !== task._id),
      },
    })),
}));
