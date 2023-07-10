import styles from "./primary-button.module.scss";
import cx from "classnames";

const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => (
  <button {...props} className={cx(styles.container, props.className)}>
    {children}
  </button>
);

export default PrimaryButton;
