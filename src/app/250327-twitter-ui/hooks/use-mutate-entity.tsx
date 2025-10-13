// NOTE: Make this a more generalized

import { useContext } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

export default function useMutateEntity({
  endpoint,
  successToastMessage,
  httpMethod = "POST",
  payload = undefined,
  invalidateQueryKeys = [],
}: {
  endpoint: string;
  successToastMessage: string;
  httpMethod?: "DELETE" | "POST" | "PATCH" | "PUT";
  payload?: string | undefined;
  invalidateQueryKeys?: string[];
}) {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      try {
        // TODO: testing
        console.log("useMutateEntity: endpoint = ", endpoint);

        const config: Record<string, any> = {
          method: httpMethod,
          headers: {
            "Content-Type": "application/json",
          },
        };
        // NOTE: only pass in payload if it is defined, else this could lead to an incorrect API call
        if (payload) {
          config.payload = payload;
        }

        const response = await fetch(endpoint, config);

        const data = await response.json();

        // TODO: testing
        console.log(
          "useMutateEntity: endpoint = ",
          endpoint,
          " \n data = ",
          data
        );

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error: any) {
        console.error(error.message);
        throw error;
      }
    },
    onSuccess: () => {
      showToast({
        message: successToastMessage,
        success: true,
        visible: true,
      });

      // ! this is not the best UX - see video at time 4:50:00 - https://www.youtube.com/watch?v=4GUVz2psWUg
      if (invalidateQueryKeys.length > 0) {
        queryClient.invalidateQueries({ queryKey: invalidateQueryKeys });
      }
    },
    onError: (error) => {
      showToast({
        message: error.message,
        success: false,
        visible: true,
      });
    },
  });

  return { mutate, isPending, isError, error };
}
