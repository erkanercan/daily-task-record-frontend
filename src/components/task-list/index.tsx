import { PropsWithChildren } from "react";
import styles from "./task-list.module.scss";
import { TaskCard } from "../task-card";

const TaskList: React.FC<PropsWithChildren> & {
  Item: React.FC<
    PropsWithChildren<{
      itemName: string;
      itemColor?: string;
      children: React.ReactElement<(typeof TaskCard)[]>;
    }>
  >;
} = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

const TaskListItem: React.FC<
  PropsWithChildren<{
    itemName: string;
    itemColor?: string;
    children: React.ReactElement<(typeof TaskCard)[]>;
  }>
> = ({ itemName, itemColor, children }) => {
  return (
    <div className={styles.item}>
      <div
        className={styles.item__name}
        style={{ color: itemColor ? itemColor : "black" }}
      >
        {itemName}
      </div>
      <div className={styles.item__content}>{children}</div>
    </div>
  );
};

TaskList.Item = TaskListItem;

export default TaskList;
