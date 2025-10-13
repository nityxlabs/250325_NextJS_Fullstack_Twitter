import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

export default function useDeleteUserNotifications() {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const {
    mutate: deleteUserNotifications,
    isPending: deleteUserNotificationsIsPending,
  } = useMutation({
    mutationFn: async () => {
      try {
        const deleteUserNotificationsEndpoint = "/nodejs/api/notifications";

        const response = await fetch(deleteUserNotificationsEndpoint, {
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
        console.log("useDeleteUserNotifications: data = ", data);

        return data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess() {
      showToast({
        message: "Deleted user's notifications",
        success: true,
        visible: true,
      });

      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError(error) {
      showToast({
        message: error,
        success: false,
        visible: true,
      });
    },
  });

  return { deleteUserNotifications, deleteUserNotificationsIsPending };
}
