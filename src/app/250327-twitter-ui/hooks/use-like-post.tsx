import { useContext } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

export default function useLikePost() {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const { mutate: likePost, isPending: isPendingLikePost } = useMutation({
    mutationFn: async (postId: string) => {
      try {
        const likePostEndpoint = `/nodejs/api/posts/likes/${postId}`;

        const response = await fetch(likePostEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error: any) {
        console.error("useLikePost: ", error);
        throw error;
      }
    },
    onSuccess: (postData) => {
      showToast({
        message: "Updated post",
        success: true,
        visible: true,
      });

      // TODO: testing
      // console.log("useLikePost - onSuccess: postData = ", postData);

      // ! this is not the best UX as we do not want to retrieve all tweets with just a single like - see video at time 4:50:00 - https://www.youtube.com/watch?v=4GUVz2psWUg
      // queryClient.invalidateQueries({ queryKey: ["posts"] });

      // * Better idea: just update likes for current post
      // `setQueryData` is used to update cached data in "react-query". Manually syncing cache after a mutation, so the UI reflects the latest state without needing a refetch.
      queryClient.setQueryData(["posts"], (oldData: any) => {
        return oldData.map((eachPost: Record<string, any>) => {
          if (eachPost._id === postData._id) {
            return postData;
          }

          return eachPost;
        });
      });
    },
    onError: (error) => {
      showToast({
        message: error.message,
        success: false,
        visible: true,
      });
    },
  });

  return { likePost, isPendingLikePost };
}
