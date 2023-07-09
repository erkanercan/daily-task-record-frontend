import styles from "./primary-button.module.scss";

const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => (
  <button className={styles.container} {...props}>
    {children}
  </button>
);

export default PrimaryButton;
