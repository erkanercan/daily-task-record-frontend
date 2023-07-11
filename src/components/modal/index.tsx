import * as Dialog from "@radix-ui/react-dialog";
import styles from "./modal.module.scss";
import cx from "classnames";
import Image from "next/image";

export const Modal: React.FC<React.ComponentProps<typeof Dialog.Root>> = ({
  children,
  ...props
}) => <Dialog.Root {...props}>{children}</Dialog.Root>;

export const ModalPortal: React.FC<
  React.ComponentProps<typeof Dialog.Portal>
> = ({ children, ...props }) => (
  <Dialog.Portal {...props}>{children}</Dialog.Portal>
);

export const ModalOverlay: React.FC<
  React.ComponentProps<typeof Dialog.Overlay>
> = ({ ...props }) => (
  <Dialog.Overlay className={cx(styles.overlay, props.className)} {...props} />
);

export const ModalTrigger: React.FC<
  React.ComponentProps<typeof Dialog.Trigger>
> = ({ children, ...props }) => (
  <Dialog.Trigger asChild {...props}>
    {children}
  </Dialog.Trigger>
);

export const ModalTitle: React.FC<
  React.ComponentProps<typeof Dialog.Title>
> = ({ children, ...props }) => (
  <div className={styles.titleWrapper}>
    <Dialog.Title className={cx(styles.title, props.className)} {...props}>
      {children}
    </Dialog.Title>
    <ModalClose>
      <Image src="/icons/close.svg" width={24} height={24} alt="close modal" />
    </ModalClose>
  </div>
);

export const ModalContent: React.FC<
  React.ComponentProps<typeof Dialog.Content>
> = ({ children, ...props }) => (
  <Dialog.Content className={cx(styles.content, props.className)} {...props}>
    {children}
  </Dialog.Content>
);

export const ModalDescription: React.FC<
  React.ComponentProps<typeof Dialog.Description>
> = ({ children, ...props }) => (
  <Dialog.Description {...props}>{children}</Dialog.Description>
);

export const ModalClose: React.FC<
  React.ComponentProps<typeof Dialog.Close>
> = ({ children, ...props }) => (
  <Dialog.Close {...props}>{children}</Dialog.Close>
);
