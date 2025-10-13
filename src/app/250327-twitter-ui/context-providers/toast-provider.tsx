/*
STEPS: how to write up taost

1. need state to show toast
1. need toast to disappear - useEffect


in separate file, create a toast component - update: Webpack_React_Learn/250325_NextJS_Fullstack_Twitter/fullstack-twitter-app/src/app/250327-twitter-ui/ui-components/common/toast-notification-0.tsx
*/

"use client";

import { createContext, useEffect, useState } from "react";

export const ToastContext = createContext<any>(null);

export function ToastProvider({
  children,
  delay = 5_000,
}: {
  children: React.JSX.Element | any;
  delay?: number;
}) {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastSuccess, setToastSuccess] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  function toggleVisible(nextState = !toastVisible) {
    setToastVisible(nextState);
  }

  function showToast({
    message,
    success = true,
    visible = true,
  }: {
    message: string;
    success?: boolean;
    visible?: boolean;
  }) {
    setToastMessage(message);
    setToastSuccess(success);
    setToastVisible(visible);
  }

  useEffect(() => {
    if (!toastVisible) {
      return;
    }

    const timer = setTimeout(() => {
      setToastVisible(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [toastVisible, delay]);

  return (
    <ToastContext.Provider
      value={{
        // state
        toastMessage,
        toastSuccess,
        toastVisible,
        // functions
        showToast,
        toggleVisible,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
