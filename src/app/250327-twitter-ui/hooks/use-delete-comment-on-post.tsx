import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

export default function useDeleteCommentOnPost() {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const {
    mutate: deleteCommentOnPost,
    isPending: isPendingDeleteCommentOnPost,
    isError: isErrorDeleteCommentOnPost,
    isSuccess: isSuccessDeleteCommentOnPost,
  } = useMutation({
    mutationFn: async ({
      commentIndex,
      postId,
    }: {
      commentIndex: number;
      postId: string;
    }) => {
      try {
        const deleteCommentOnPostEndpoint = `/nodejs/api/posts/comments/${postId}`;

        const response = await fetch(deleteCommentOnPostEndpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentIndex }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        console.error("useDeleteCommentOnPost: ", error);
        throw error;
      }
    },
    onSuccess: (postData) => {
      showToast({
        message: "Deleted comment on post",
        success: true,
        visible: true,
      });

      // TODO: testing
      console.log("useDeleteCommentOnPost: postData = ", postData);

      // ! this is not the best UX as we do not want to retrieve all tweets with just a single like - see video at time 4:50:00 - https://www.youtube.com/watch?v=4GUVz2psWUg
      // queryClient.invalidateQueries({ queryKey: ["posts"] });

      // update cache with new data instead of invalidating cache
      queryClient.setQueryData(["posts"], (oldData: any) => {
        return oldData.map((eachPost: Record<string, any>) => {
          if (eachPost._id === postData._id) {
            return postData;
          }

          return eachPost;
        });
      });
    },
    onError: (error: any) => {
      showToast({
        message: error.message,
        success: false,
        visible: true,
      });
    },
  });

  return {
    deleteCommentOnPost,
    isPendingDeleteCommentOnPost,
    isErrorDeleteCommentOnPost,
    isSuccessDeleteCommentOnPost,
  };
}
