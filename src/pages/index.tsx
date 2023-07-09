import { TaskCard } from "@/components";
import TaskList from "@/components/task-list";

export default function Home() {
  return (
    <>
      {/* <TaskCard>
        <TaskCard.Header
          img="/bill.png"
          name="Bill Gates"
          title="Frontend Engineer at DevsHouse"
        />
        <TaskCard.Body taskText="Fix the padding issue with the modal view. It also effects the other views and other modals. Fix the flex layout fit a wrapper than the whole screen. (2h)" />
        <TaskCard.Footer>
          <TaskCard.Tag type="Bug" />
        </TaskCard.Footer>
      </TaskCard> */}
      <TaskList>
        <TaskList.Item itemName="Backlog" itemColor="#ACADF9">
          <TaskCard>
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
          <TaskCard>
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
          <TaskCard>
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
    </>
  );
}
