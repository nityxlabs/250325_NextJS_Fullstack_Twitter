import { useContext } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ToastContext } from "@/app/250327-twitter-ui/context-providers/toast-provider";

export default function useCommentOnPost() {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const {
    mutate: commentOnPost,
    isPending: isPendingCommentOnPost,
    isError: isErrorCommentOnPost,
    isSuccess: isSuccessCommentOnPost,
  } = useMutation({
    mutationFn: async ({
      comment,
      postId,
    }: {
      comment: string;
      postId: string;
    }) => {
      try {
        const commentOnPostEndpoint = `/nodejs/api/posts/comments/${postId}`;

        const response = await fetch(commentOnPostEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: comment }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        console.error("useCommentOnPost: ", error);
        throw error;
      }
    },
    onSuccess: (postData) => {
      showToast({
        message: "Added comment to post",
        success: true,
        visible: true,
      });

      // TODO: testing
      console.log("useCommentOnPost: postData = ", postData);

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
    commentOnPost,
    isPendingCommentOnPost,
    isErrorCommentOnPost,
    isSuccessCommentOnPost,
  };
}
