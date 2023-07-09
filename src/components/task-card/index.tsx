import { PropsWithChildren } from "react";
import styles from "./task-card.module.scss";
import Image from "next/image";
import cx from "classnames";

type TaskType = "Bug" | "Feature" | "Refactor";

const TaskCard: React.FC<PropsWithChildren> & {
  Header: React.FC<{ img: string; name: string; title: string }>;
  Body: React.FC<{ taskText: string }>;
  Footer: React.FC<
    PropsWithChildren<{ children: React.ReactElement<typeof TaskTag> }>
  >;
  Tag: React.FC<{ type: TaskType }>;
} = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

const TaskHeader: React.FC<{ img: string; name: string; title: string }> = ({
  img,
  name,
  title,
}) => {
  return (
    <div className={styles.card__header}>
      <Image
        className={styles.card__header__avatar}
        src={img}
        alt="Picture of the author"
        width={36}
        height={36}
      />
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

const TaskTag: React.FC<{ type: TaskType }> = ({ type }) => {
  const tagBoxClassName =
    styles[`card__footer__tag__box--${type.toLowerCase()}`];
  return (
    <div className={styles.card__footer__tag}>
      <div className={cx(styles.card__footer__tag__box, tagBoxClassName)} />
      <div>{type}</div>
    </div>
  );
};

TaskCard.Header = TaskHeader;
TaskCard.Body = TaskBody;
TaskCard.Footer = TaskFooter;
TaskCard.Tag = TaskTag;

export { TaskCard };
