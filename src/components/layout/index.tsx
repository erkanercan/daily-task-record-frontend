import { PropsWithChildren } from "react";
import Header from "../header";
import styles from "./layout.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/user-store";
import { toast } from "react-toastify";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, setUser } = useUserStore();
  useQuery({
    queryKey: ["setUser"],
    queryFn: async () => {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      if (!baseURL) throw new Error("No API URL found");
      const resp = await fetch(`${baseURL}/users/me`, {
        credentials: "include",
      });
      if (resp.status === 401) {
        console.log("You are not logged in");
        toast("You are not logged in", {
          type: "error",
        });
        return null;
      }
      const data = await resp.json();
      setUser(data.data.user);
      return data;
    },
    enabled: !user,
    retry: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
