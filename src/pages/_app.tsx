import Layout from "@/components/layout";
import "@styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <ToastContainer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DndProvider>
    </QueryClientProvider>
  );
}
