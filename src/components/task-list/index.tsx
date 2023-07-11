import { PropsWithChildren, ReactNode } from "react";
import styles from "./task-list.module.scss";
import { useDroppable } from "@dnd-kit/core";

const TaskList: React.FC<PropsWithChildren<{ children?: ReactNode }>> & {
  Item: React.FC<
    PropsWithChildren<{ id: string; itemName: string; itemColor?: string }>
  >;
} = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

const TaskListItem: React.FC<
  PropsWithChildren<{ id: string; itemName: string; itemColor?: string }>
> = ({ id, itemName, itemColor, children }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });
  return (
    <div className={styles.item} ref={setNodeRef}>
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
