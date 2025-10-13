import { useContext } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

export default function useUpdateProfile() {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    mutateAsync: updateProfileAsync,
    isPending: updateProfileIsPending,
    isError: updateProfileIsError,
    isSuccess: updateProfileIsSuccess,
  } = useMutation({
    mutationFn: async (formData: {
      fullName?: string | undefined;
      email?: string | undefined;
      username?: string | undefined;
      currentPassword?: string | undefined;
      newPassword?: string | undefined;
      bio?: string | undefined;
      link?: string | undefined;
      coverImg?: any | undefined;
      profileImg?: any | undefined;
    }) => {
      const updateProfileEndpoint = "/nodejs/api/users/update";

      try {
        const response = await fetch(updateProfileEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }

        return data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      showToast({
        message: "Updated profile",
        success: true,
        visible: true,
      });

      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["authUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
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
    updateProfile,
    updateProfileAsync,
    updateProfileIsPending,
    updateProfileIsError,
    updateProfileIsSuccess,
  };
}
