// File Inspiration - /Users/mohammedkhan/Documents/NityxPlay/Webpack_React_Learn/250227_NextJS_Setup/nextjs-app/src/app/_redux/providers.tsx

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// TODO: I think I need to install the package below
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastProvider } from "./context-providers/toast-provider";
import ToastNotification from "./ui-components/common/toast-notification-0";

import { TOAST_DISAPPEAR_TIME } from "./constants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({
  children,
}: {
  children: React.JSX.Element | any;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider delay={TOAST_DISAPPEAR_TIME}>
        <ToastNotification />
        {children}
        {/* <ReactQueryDevtools /> */}
      </ToastProvider>
    </QueryClientProvider>
  );
}
