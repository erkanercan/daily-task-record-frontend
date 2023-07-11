import { PropsWithChildren } from "react";
import styles from "./task-card.module.scss";
import cx from "classnames";
import { Category, Status } from "@/types/task";
import { getAvatar } from "@/utils/avatar";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps extends PropsWithChildren {
  id: string; // Unique identifier for the TaskCard
  status: Status;
}

const TaskCard: React.FC<TaskCardProps> & {
  Header: React.FC<{ name: string; title: string; email: string }>;
  Body: React.FC<{ taskText: string }>;
  Footer: React.FC<
    PropsWithChildren<{ children: React.ReactElement<typeof TaskTag> }>
  >;
  Tag: React.FC<{ type: Category }>;
} = ({ status, id, children }) => {
  const { isDragging, attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: { status: status },
  });
  const style = {
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      className={styles.card}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

const TaskHeader: React.FC<{ name: string; title: string; email: string }> = ({
  name,
  title,
  email,
}) => {
  return (
    <div className={styles.card__header}>
      {getAvatar(email)}
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
