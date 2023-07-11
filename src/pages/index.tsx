import { TaskCard } from "@/components";
import TaskList from "@/components/task-list";
import { useDateStore } from "@/stores/date-store";
import { useUserStore } from "@/stores/user-store";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { selectedDate } = useDateStore();
  const { user } = useUserStore();
  const { data: tasks } = useQuery({
    queryKey: ["tasks", selectedDate],
    queryFn: async () => {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      if (!baseURL) throw new Error("No API URL found");
      const data = await fetch(`${baseURL}/tasks?createdAt=${selectedDate}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          return data.data.tasks;
        });
      return data;
    },
    enabled: !!selectedDate && !!user,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <TaskList>
      <TaskList.Item itemName="Backlog" itemColor="#ACADF9">
        <TaskCard id="1">
          <TaskCard.Header
            img="/bill.png"
            name="Bill Gates"
            title="Frontend Engineer at DevsHouse"
          />
          <TaskCard.Body taskText="Fix the padding issue with the modal view. It also effects the other views and other modals. Fix the flex layout fit a wrapper than the whole screen. (2h)" />
          <TaskCard.Footer>
            <TaskCard.Tag type="Bug" />
          </TaskCard.Footer>
        </TaskCard>
      </TaskList.Item>
      <TaskList.Item itemName="In Progress" itemColor="#E26E46">
        <TaskCard id="2">
          <TaskCard.Header
            img="/bill.png"
            name="Bill Gates"
            title="Frontend Engineer at DevsHouse"
          />
          <TaskCard.Body taskText="Fix the padding issue with the modal view. It also effects the other views and other modals. Fix the flex layout fit a wrapper than the whole screen. (2h)" />
          <TaskCard.Footer>
            <TaskCard.Tag type="Bug" />
          </TaskCard.Footer>
        </TaskCard>
      </TaskList.Item>
      <TaskList.Item itemName="Done" itemColor="#56B969">
        <TaskCard id="3">
          <TaskCard.Header
            img="/bill.png"
            name="Bill Gates"
            title="Frontend Engineer at DevsHouse"
          />
          <TaskCard.Body taskText="Fix the padding issue with the modal view. It also effects the other views and other modals. Fix the flex layout fit a wrapper than the whole screen. (2h)" />
          <TaskCard.Footer>
            <TaskCard.Tag type="Bug" />
          </TaskCard.Footer>
        </TaskCard>
      </TaskList.Item>
    </TaskList>
  );
}
