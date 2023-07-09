import { PropsWithChildren } from "react";
import Header from "../header";
import styles from "./layout.module.scss";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
