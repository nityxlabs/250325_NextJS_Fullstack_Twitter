import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
// React-query
import useAuthGetMe from "@/app/250327-twitter-ui/hooks/use-auth-get-me";
import useLikePost from "@/app/250327-twitter-ui/hooks/use-like-post";
import useCommentOnPost from "@/app/250327-twitter-ui/hooks/use-comment-on-post";
import useDeleteCommentOnPost from "@/app/250327-twitter-ui/hooks/use-delete-comment-on-post";

import useMutateEntity from "@/app/250327-twitter-ui/hooks/use-mutate-entity";

import LoadingSpinner from "./loading-spinner-0";

import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

// utils
import { formatPostDate } from "@/app/250327-twitter-ui/utils/date/utils";

export default function Post({ post }: any): React.JSX.Element {
  const [comment, setComment] = useState("");

  // get user authenticate data
  const { authenticatedUser } = useAuthGetMe();

  // TODO: need to use this
  const {
    commentOnPost,
    isPendingCommentOnPost,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isErrorCommentOnPost,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isSuccessCommentOnPost,
  } = useCommentOnPost();

  const {
    deleteCommentOnPost,
    isPendingDeleteCommentOnPost,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isErrorDeleteCommentOnPost,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isSuccessDeleteCommentOnPost,
  } = useDeleteCommentOnPost();

  const { likePost, isPendingLikePost } = useLikePost();

  // TODO: need to use this endpoint
  // const { mutate: likePost, isPending: isPendingLikePost } = useMutateEntity({
  //   httpMethod: "POST",
  //   endpoint: `/nodejs/api/posts/likes/${post._id}`,
  //   successToastMessage: "Post updated",
  //   invalidateQueryKeys: ["posts"],
  // });

  // const { mutate: likePost, isPending: isPendingLikePost } = useMutation({
  //   mutationFn: async (postId: string) => {
  //     try {
  //       const likePostEndpoint = `/nodejs/api/posts/likes/${postId}`;

  //       const response = await fetch(likePostEndpoint, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const data = await response.json();
  //       if (!response.ok) {
  //         throw new Error(data.error || "Something went wrong");
  //       }

  //       return data;
  //     } catch (error: any) {
  //       console.error("useLikePost: ", error);
  //       throw error;
  //     }
  //   },
  //   onSuccess: () => {
  //     showToast({
  //       message: "You liked a post",
  //       success: true,
  //       visible: true,
  //     });

  //     // ! this is not the best UX - see video at time 4:50:00 - https://www.youtube.com/watch?v=4GUVz2psWUg
  //     queryClient.invalidateQueries({ queryKey: ["posts"] });
  //   },
  //   onError: (error) => {
  //     showToast({
  //       message: error.message,
  //       success: false,
  //       visible: true,
  //     });
  //   },
  // });

  const { mutate: deletePost, isPending: isPendingDeletePost } =
    useMutateEntity({
      httpMethod: "DELETE",
      endpoint: `/nodejs/api/posts/${post._id}`,
      successToastMessage: "Post deleted",
      invalidateQueryKeys: ["posts"],
    });

  // TODO: I think I should delete this
  // const {
  //   mutate: deletePost,
  //   isPending: isPendingDeletePost,
  //   isError,
  //   error,
  // } = useMutation({
  //   mutationFn: async () => {
  //     const deleteEndpoint = `/nodejs/api/posts/${post._id}`;

  //     try {
  //       const response = await fetch(deleteEndpoint, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const data = await response.json();

  //       // TODO: testing
  //       console.log("delete - response.ok = ", response.ok);
  //       console.log("delete - data = ", data);

  //       if (!response.ok) {
  //         throw new Error(data.error);
  //       }

  //       return data;
  //     } catch (error: any) {
  //       console.error(error.message);
  //       throw error;
  //     }
  //   },
  //   onSuccess() {
  //     showToast({
  //       message: "Post deleted successfully",
  //       success: true,
  //       visible: true,
  //     });
  //     // invalidate cached data to trigger refetch
  //     queryClient.invalidateQueries({ queryKey: ["posts"] });
  //   },
  //   onError() {
  //     showToast({
  //       message: "Error deleting post",
  //       success: false,
  //       visible: true,
  //     });
  //   },
  // });

  const postOwner = post.user;
  const isMyPost = authenticatedUser.data._id === post.user._id;
  const isLiked = post.likes.includes(authenticatedUser.data._id);

  const formattedDate = formatPostDate(post.createdAt);

  const isCommenting = false;

  const handleDeletePost = () => {
    deletePost();
  };

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const t = e.target as HTMLFormElement;
    console.log("handlePostComment(): t = ", t);

    // do not want to send multiple requests at once
    if (isPendingCommentOnPost) {
      return;
    }

    commentOnPost({
      comment,
      postId: post._id,
    });
    setComment("");
  };

  const handleDeleteCommentOnPost = (commentIndex: number) => {
    if (isPendingDeleteCommentOnPost) {
      return;
    }

    deleteCommentOnPost({
      commentIndex,
      postId: post._id,
    });
  };

  const handleLikePost = () => {
    // do not want to send multiple requests at once
    if (isPendingLikePost) {
      return;
    }
    likePost(post._id);
  };

  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700">
        {/* Side Avatar Image */}
        <div className="avatar">
          <Link
            href={`/250327-twitter-ui/home-container/profile/${postOwner.username}`}
            className="w-8 rounded-full overflow-hidden"
          >
            <Image
              alt={`${postOwner.username} avatar`}
              src={
                postOwner.profileImg ||
                "/public-250327-twitter-ui/avatars/avatar-placeholder.png"
              }
              height={32}
              width={32}
            />
            {/* <img
              src={
                postOwner.profileImg ||
                "/public-250327-twitter-ui/avatars/avatar-placeholder.png"
              }
            /> */}
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            {/* display tweet owner name */}
            <Link
              href={`/250327-twitter-ui/home-container/profile/${postOwner.username}`}
              className="font-bold"
            >
              {postOwner.fullName}
            </Link>

            {/* display tweet owner username */}
            <span className="text-gray-700 flex gap-1 text-sm">
              <Link
                href={`/250327-twitter-ui/home-container/profile/${postOwner.username}`}
              >
                @{postOwner.username}
              </Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>

            {/* if tweet author is me, allow me to delete tweet */}
            {isMyPost && (
              <span className="flex justify-end flex-1">
                {!isPendingDeletePost && (
                  <FaTrash
                    className="cursor-pointer hover:text-red-500"
                    onClick={handleDeletePost}
                  />
                )}

                {isPendingDeletePost && <LoadingSpinner size="sm" />}
              </span>
            )}
          </div>

          {/* display tweet text or image */}
          <div className="flex flex-col gap-3 overflow-hidden">
            <span>{post.text}</span>
            {post.img && (
              // <Image
              //   alt=""
              //   src={post.img}
              //   className="h-80 object-contain rounded-lg border border-gray-700"
              //   height={1000}
              //   width={1000}
              // />
              // eslint-disable-next-line
              <img
                src={post.img}
                className="h-80 object-contain rounded-lg border border-gray-700"
                alt=""
              />
            )}
          </div>

          {/* CONJ - I think this is if I want to add comment to tweet */}
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 items-center w-2/3 justify-between">
              <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() =>
                  (document as any)
                    .getElementById("comments_modal" + post._id)
                    .showModal()
                }
              >
                <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
                {/* CONJ - I think this shows number of comments to tweet */}
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div>

              {/* We're using Modal Component from DaisyUI */}
              <dialog
                id={`comments_modal${post._id}`}
                className="modal border-none outline-none"
              >
                <div className="modal-box rounded border border-gray-600">
                  <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                  <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                    {post.comments.length === 0 && (
                      <p className="text-sm text-slate-500">
                        No comments yet 🤔 Be the first one 😉
                      </p>
                    )}

                    {/* Show comments to tweet */}
                    {post.comments.map((comment: any, i: number) => {
                      const isMyComment =
                        comment.user._id === authenticatedUser.data._id;

                      return (
                        <div
                          key={comment._id}
                          className="flex gap-2 items-start"
                        >
                          <div className="avatar">
                            <div className="w-8 rounded-full">
                              <Image
                                alt={`${postOwner.username} avatar`}
                                src={
                                  comment.user.profileImg ||
                                  "/public-250327-twitter-ui/avatars/avatar-placeholder.png"
                                }
                                className="h-80 object-contain rounded-lg border border-gray-700"
                                height={32}
                                width={32}
                              />
                              {/* <img
                                src={
                                  comment.user.profileImg ||
                                  "/public-250327-twitter-ui/avatars/avatar-placeholder.png"
                                }
                              /> */}
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="font-bold">
                                {comment.user.fullName}
                              </span>
                              <span className="text-gray-700 text-sm">
                                @{comment.user.username}
                              </span>
                            </div>
                            <div className="text-sm">{comment.text}</div>
                          </div>

                          {isMyComment && (
                            <span className="flex justify-end flex-1">
                              {!isPendingDeleteCommentOnPost && (
                                <FaTrash
                                  className="cursor-pointer hover:text-red-500"
                                  onClick={() => handleDeleteCommentOnPost(i)}
                                />
                              )}

                              {isPendingDeleteCommentOnPost && (
                                <LoadingSpinner size="sm" />
                              )}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* form to handle add replies to tweet */}
                  <form
                    className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    {/* Submit the comment or show the comment loading */}
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                      {isCommenting ? <LoadingSpinner size="md" /> : "Post"}
                    </button>
                  </form>
                </div>
                {/* if there is a button in form, it will close the modal */}
                <form method="dialog" className="modal-backdrop">
                  <button className="outline-none">close</button>
                </form>
              </dialog>

              {/* Show controls and count for "Likes" */}
              <div className="flex gap-1 items-center group cursor-pointer">
                <BiRepost className="w-6 h-6  text-slate-500 group-hover:text-green-500" />
                <span className="text-sm text-slate-500 group-hover:text-green-500">
                  0
                </span>
              </div>

              {/* Like Post */}
              {isPendingLikePost && <LoadingSpinner size="xs" />}
              {!isPendingLikePost && (
                <div
                  className={`flex gap-1 items-center group cursor-pointer ${
                    isLiked
                      ? "text-pink-500"
                      : "text-slate-500 group-hover:text-pink-500"
                  }`}
                  onClick={handleLikePost}
                >
                  <FaRegHeart
                    className={`w-4 h-4 cursor-pointer ${
                      isLiked
                        ? "text-pink-500"
                        : "text-slate-500 group-hover:text-pink-500"
                    }`}
                  />
                  <span className="text-sm group-hover:text-pink-500">
                    {post.likes.length}
                  </span>
                </div>
              )}
            </div>
            <div className="flex w-1/3 justify-end gap-2 items-center">
              <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
