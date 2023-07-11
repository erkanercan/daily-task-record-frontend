import { PropsWithChildren } from "react";
import styles from "./task-card.module.scss";
import Image from "next/image";
import cx from "classnames";
import { useDrag } from "react-dnd";
import { Category } from "@/types/task";
import { getAvatar } from "@/utils/avatar";
import { useUserStore } from "@/stores/user-store";

interface TaskCardProps extends PropsWithChildren {
  id: string; // Unique identifier for the TaskCard
}

const TaskCard: React.FC<TaskCardProps> & {
  Header: React.FC<{ name: string; title: string }>;
  Body: React.FC<{ taskText: string }>;
  Footer: React.FC<
    PropsWithChildren<{ children: React.ReactElement<typeof TaskTag> }>
  >;
  Tag: React.FC<{ type: Category }>;
} = ({ id, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOX",
    item: { id, children },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log({ item, dropResult });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: "translate(0, 0)",
      }}
      className={styles.card}
    >
      {children}
    </div>
  );
};

const TaskHeader: React.FC<{ name: string; title: string }> = ({
  name,
  title,
}) => {
  const { user } = useUserStore();
  return (
    <div className={styles.card__header}>
      {user && getAvatar(user.email)}
      <div className={styles.card__header__titleGroup}>
        <div className={styles.card__header__titleGroup__name}>{name}</div>
        <div className={styles.card__header__titleGroup__title}>{title}</div>
      </div>
    </div>
  );
};

const TaskBody: React.FC<{ taskText: string }> = ({ taskText }) => {
  return <div className={styles.card__body}>{taskText}</div>;
};

const TaskFooter: React.FC<
  PropsWithChildren<{ children: React.ReactElement<typeof TaskTag> }>
> = ({ children }) => {
  return <div className={styles.card__footer}>{children}</div>;
};

const TaskTag: React.FC<{ type: Category }> = ({ type }) => {
  const tagBoxClassName = styles[`card__footer__tag__box--${type}`];
  return (
    <div className={styles.card__footer__tag}>
      <div className={cx(styles.card__footer__tag__box, tagBoxClassName)} />
      <div>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
    </div>
  );
};

TaskCard.Header = TaskHeader;
TaskCard.Body = TaskBody;
TaskCard.Footer = TaskFooter;
TaskCard.Tag = TaskTag;

export { TaskCard };
