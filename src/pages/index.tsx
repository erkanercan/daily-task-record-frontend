import { TaskCard } from "@/components";
import TaskList from "@/components/task-list";
import { useDateStore } from "@/stores/date-store";
import { useSearchStore } from "@/stores/search-store";
import { useTaskStore } from "@/stores/task-store";
import { useUserStore } from "@/stores/user-store";
import { Task } from "@/types/task";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { selectedDate } = useDateStore();
  const { user } = useUserStore();
  const { tasks, setTasks } = useTaskStore();
  const { search } = useSearchStore();
  useQuery({
    queryKey: ["tasks", selectedDate, search],
    queryFn: async () => {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      if (!baseURL) throw new Error("No API URL found");
      const data = await fetch(
        `${baseURL}/tasks?createdAt=${selectedDate}${
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
      const inProgress: Task[] = [];
      const done: Task[] = [];

      data.forEach((task: Task) => {
        if (task.status === "backlog") {
          backlog.push(task);
        } else if (task.status === "in_progress") {
          inProgress.push(task);
        } else if (task.status === "done") {
          done.push(task);
        }
      });
      setTasks({ backlog, inProgress, done });
      return data;
    },
    enabled: !!selectedDate && !!user,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <TaskList>
      <TaskList.Item itemName="Backlog" itemColor="#ACADF9">
        {tasks?.backlog.length === 0
          ? null
          : tasks?.backlog.map((task: Task) => (
              <TaskCard key={task._id} id={task._id}>
                <TaskCard.Header
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
      <TaskList.Item itemName="In Progress" itemColor="#E26E46">
        {tasks?.inProgress.length === 0
          ? null
          : tasks?.inProgress.map((task: Task) => (
              <TaskCard key={task._id} id={task._id}>
                <TaskCard.Header
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
      <TaskList.Item itemName="Done" itemColor="#56B969">
        {tasks?.done.length === 0
          ? null
          : tasks?.done.map((task: Task) => (
              <TaskCard key={task._id} id={task._id}>
                <TaskCard.Header
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
  );
}
