import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import Post from "./post-0";
import { PostSkeletonMokha } from "../skeleton/post-skeleton-0";

import { FeedTypeEnum } from "@/app/250327-twitter-ui/types";

export default function Posts({
  feedType = FeedTypeEnum.forYou,
  userId = "",
  username = "",
}: {
  feedType?: FeedTypeEnum;
  userId?: string;
  username?: string;
}): React.JSX.Element {
  function determinePostEndpoint() {
    // SignUp API: NodeJS Route
    const apiRoutePostsAll = "/nodejs/api/posts/all";
    const apiRoutePostsFollowing = "/nodejs/api/posts/following";
    const apiRoutePostsFromUser = `/nodejs/api/posts/users/${username}`;
    const apiRouteLikesFromUser = `/nodejs/api/posts/likes/${userId}`;
    // SignUp API: NextJS Rote
    // const apiRouteAuthMe = "/250327-twitter-ui/me/api";

    switch (feedType) {
      case FeedTypeEnum.following:
        return apiRoutePostsFollowing;
      case FeedTypeEnum.userPosts:
        return apiRoutePostsFromUser;
      case FeedTypeEnum.userLikes:
        return apiRouteLikesFromUser;
      case FeedTypeEnum.forYou:
      default:
        return apiRoutePostsAll;
    }
  }

  const postEndpoint = determinePostEndpoint();

  const {
    data: posts,
    isLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error,
    refetch,
    isRefetching,
  } = useQuery({
    // NOTE: added `feedType` to queryKey so it triggers a refetch when the state changes
    // queryKey: ["posts", feedType],
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const response = await fetch(postEndpoint);
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
    // NOTE: I think `enabled: true` allows for refetching when `query
    enabled: true,
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch, username]);

  // TODO: I can delete this - this is mocking a "loading" state
  // const isLoading = true;
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   // mimics loading so I can see skeleton loader
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1200);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  const arePostsLoading = isLoading || isRefetching;

  return (
    <>
      {arePostsLoading && (
        <div className="flex flex-col justify-center">
          <PostSkeletonMokha />
          <PostSkeletonMokha />
          <PostSkeletonMokha />
        </div>
      )}
      {!arePostsLoading && posts.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!arePostsLoading && posts && (
        <div>
          {posts.map((post: any) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
