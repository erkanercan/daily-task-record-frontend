import { TaskCard } from "@/components";
import PrimaryButton from "@/components/primary-button";
import SearchBar from "@/components/search-bar";

export default function Home() {
  return (
    <>
      <PrimaryButton>Report Your Daily Tasks</PrimaryButton>
      <br />
      <SearchBar />
      <br />
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
    </>
  );
}
