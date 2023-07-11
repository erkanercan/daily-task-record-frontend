import { PropsWithChildren, ReactNode } from "react";
import styles from "./task-list.module.scss";
import { TaskCard } from "../task-card";

const TaskList: React.FC<PropsWithChildren<{ children?: ReactNode }>> & {
  Item: React.FC<PropsWithChildren<{ itemName: string; itemColor?: string }>>;
} = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

const TaskListItem: React.FC<
  PropsWithChildren<{ itemName: string; itemColor?: string }>
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
