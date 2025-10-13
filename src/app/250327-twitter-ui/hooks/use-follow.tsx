import { useContext } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

export default function useFollow() {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const {
    mutate: followUser,
    isPending: followUserIsPending,
    isError: followUserIsError,
    isSuccess: followUserIsSuccess,
    error: followUserError,
  } = useMutation({
    mutationFn: async (userToFollowId: string) => {
      try {
        const followUserEndpoint = `/nodejs/api/users/follow/${userToFollowId}`;

        const response = await fetch(followUserEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }

        return data;
      } catch (error: any) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      showToast({
        message: "Updated follow",
        success: true,
        visible: true,
      });

      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);
    },
    onError: (error) => {
      showToast({
        message: error.message,
        success: false,
        visible: true,
      });
    },
  });

  return {
    followUser,
    followUserIsPending,
    followUserError,
    followUserIsError,
    followUserIsSuccess,
  };
}
