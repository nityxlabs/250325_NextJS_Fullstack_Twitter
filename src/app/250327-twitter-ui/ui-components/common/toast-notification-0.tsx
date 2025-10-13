import { useContext } from "react";
import { ToastContext } from "../../context-providers/toast-provider";

import ShowCheckMarkOrCrossMark from "@/app/_general-ui-components/svg-checkmark-cross/show-checkmark-or-crossmark";

import "./toast-notification-0.scss";

export default function ToastNotification() {
  const { toastMessage, toastSuccess, toastVisible } = useContext(ToastContext);

  return (
    <div className="toast-notification-0">
      <aside className={`c-toast ${toastVisible ? "c-toast--visible" : ""}`}>
        <div className="flex justify-center items-center">
          <ShowCheckMarkOrCrossMark isError={!toastSuccess} />
          <p>{toastMessage}</p>
        </div>
      </aside>
    </div>
  );
}
