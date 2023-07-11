import { TaskCard } from "@/components";
import TaskList from "@/components/task-list";
import { useDateStore } from "@/stores/date-store";
import { useSearchStore } from "@/stores/search-store";
import { useTaskStore } from "@/stores/task-store";
import { useUserStore } from "@/stores/user-store";
import { Status, Task } from "@/types/task";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const { selectedDate } = useDateStore();
  const { user } = useUserStore();
  const [activeId, setActiveId] = useState<string>();
  const {
    tasks,
    setTasks,
    setInitialTasksLoaded,
    initialTasksLoaded,
    changeTaskColumn,
  } = useTaskStore();
  const { search } = useSearchStore();
  const { refetch: refetchTasks } = useQuery({
    queryKey: ["tasks", selectedDate, search, initialTasksLoaded],
    queryFn: async () => {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      if (!baseURL) throw new Error("No API URL found");
      const data = await fetch(
        `${baseURL}/tasks?taskDay=${selectedDate}${
          search ? `&text=${search}` : ""
        }`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          return data.data.tasks;
        });

      // Seperate tasks into columns
      const backlog: Task[] = [];
      const in_progress: Task[] = [];
      const done: Task[] = [];

      data.forEach((task: Task) => {
        if (task.status === "backlog") {
          backlog.push(task);
        } else if (task.status === "in_progress") {
          in_progress.push(task);
        } else if (task.status === "done") {
          done.push(task);
        }
      });
      setTasks({ backlog, in_progress, done });
      setInitialTasksLoaded(true);
      return data;
    },
    enabled: !!selectedDate && !!user,
    retry: false,
    refetchOnWindowFocus: false,
  });

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active?.id as string);
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const initialColumn = active?.data?.current?.status;
    const finalColumn = over?.id;
    console.log({ initialColumn, finalColumn });
    if (!initialColumn || !finalColumn) return;
    // Check if the task was dropped in a different column
    if (initialColumn !== finalColumn) {
      changeTaskColumn(
        activeId as string,
        initialColumn,
        finalColumn as Status
      );
      // Then update the task from the database
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      if (!baseURL) throw new Error("No API URL found");
      await fetch(`${baseURL}/tasks/${activeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: finalColumn,
        }),
        credentials: "include",
      });
      // Then refetch the tasks
      refetchTasks();
    } else {
      // reset the active id
    }
    setActiveId(undefined);
  };

  const getActiveTask = () => {
    const task = tasks?.backlog.find((task) => task._id === activeId);
    if (task) return task;
    const task2 = tasks?.in_progress.find((task) => task._id === activeId);
    if (task2) return task2;
    const task3 = tasks?.done.find((task) => task._id === activeId);
    if (task3) return task3;
    return null;
  };

  const getDragOverlay = () => {
    const task = getActiveTask();
    if (task) {
      return (
        <TaskCard key={task._id} id={task._id} status={task.status}>
          <TaskCard.Header
            email={task.user.email}
            name={task.user.name}
            title={task.user.title}
          />
          <TaskCard.Body taskText={task.text} />
          <TaskCard.Footer>
            <TaskCard.Tag type={task.category} />
          </TaskCard.Footer>
        </TaskCard>
      );
    }
  };

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <DragOverlay>{activeId && getDragOverlay()}</DragOverlay>
      <TaskList>
        <TaskList.Item id="backlog" itemName="Backlog" itemColor="#ACADF9">
          {tasks?.backlog.length === 0
            ? null
            : tasks?.backlog.map((task: Task) => (
                <TaskCard key={task._id} id={task._id} status={task.status}>
                  <TaskCard.Header
                    email={task.user.email}
                    name={task.user.name}
                    title={task.user.title}
                  />
                  <TaskCard.Body taskText={task.text} />
                  <TaskCard.Footer>
                    <TaskCard.Tag type={task.category} />
                  </TaskCard.Footer>
                </TaskCard>
              ))}
        </TaskList.Item>
        <TaskList.Item
          id="in_progress"
          itemName="In Progress"
          itemColor="#E26E46"
        >
          {tasks?.in_progress.length === 0
            ? null
            : tasks?.in_progress.map((task: Task) => (
                <TaskCard key={task._id} id={task._id} status={task.status}>
                  <TaskCard.Header
                    email={task.user.email}
                    name={task.user.name}
                    title={task.user.title}
                  />
                  <TaskCard.Body taskText={task.text} />
                  <TaskCard.Footer>
                    <TaskCard.Tag type={task.category} />
                  </TaskCard.Footer>
                </TaskCard>
              ))}
        </TaskList.Item>
        <TaskList.Item id="done" itemName="Done" itemColor="#56B969">
          {tasks?.done.length === 0
            ? null
            : tasks?.done.map((task: Task) => (
                <TaskCard key={task._id} id={task._id} status={task.status}>
                  <TaskCard.Header
                    email={task.user.email}
                    name={task.user.name}
                    title={task.user.title}
                  />
                  <TaskCard.Body taskText={task.text} />
                  <TaskCard.Footer>
                    <TaskCard.Tag type={task.category} />
                  </TaskCard.Footer>
                </TaskCard>
              ))}
        </TaskList.Item>
      </TaskList>
    </DndContext>
  );
}
