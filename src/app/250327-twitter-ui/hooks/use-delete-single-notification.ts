import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

export default function useDeleteSingleNotification() {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const {
    mutate: deleteSingleNotification,
    isPending: deleteSingleNotificationIsPending,
  } = useMutation({
    mutationFn: async (notificationId: string) => {
      try {
        const deleteSingleNotificationEndpoint = `/nodejs/api/notifications/${notificationId}`;

        const response = await fetch(deleteSingleNotificationEndpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }

        // TODO: testing
        console.log("useDeleteSingleNotification: data = ", data);

        return data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      showToast({
        message: "Deleted single notification",
        success: true,
        visible: true,
      });

      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      showToast({
        message: error,
        success: false,
        visible: true,
      });
    },
  });

  return { deleteSingleNotification, deleteSingleNotificationIsPending };
}
