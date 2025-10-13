"use client";

// next.js
import Link from "next/link";
import Image from "next/image";
// react-query
import { useQuery } from "@tanstack/react-query";
// React hooks

import useFollow from "@/app/250327-twitter-ui/hooks/use-follow";

// React components
import { RightPanelSkeletonMokha } from "@/app/250327-twitter-ui/ui-components/skeleton/right-panel-skeleton-0";
import LoadingSpinner from "./loading-spinner-0";

export default function RightPanel() {
  const { followUser, followUserIsPending } = useFollow();

  const {
    data: suggestedUsers,
    isLoading,
    // eslint-disable-next-line
    isError,
    // eslint-disable-next-line
    error,
  } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        // TODO: need to find route
        // SignUp API: NodeJS Route
        const apiRouteSuggestedUser = "/nodejs/api/users/suggested";
        // SignUp API: NextJS Rote
        // const apiRouteSuggestedUser = "/250327-twitter-ui/suggested-user/api";

        const response = await fetch(apiRouteSuggestedUser);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error: any) {
        console.error(error);
        throw error;
      }
    },
  });

  // NOTE: if no suggested users returned, then just have a DOM placeholder present so dimensions of other components (e.g. <Posts> area)
  if (suggestedUsers?.length === 0) {
    return <div className="md:w-64 w-0"></div>;
  }

  // TODO: can delete code below - mocking "loading" state
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

  return (
    <aside className="hidden lg:block mx-2 my-4">
      <div className="bg-[#16181C] p-4 rounded-md sticky top-2">
        <p className="font-bold">Who to follow</p>
        <div className="flex flex-col gap-4">
          {isLoading && (
            <>
              <RightPanelSkeletonMokha />
              <RightPanelSkeletonMokha />
              <RightPanelSkeletonMokha />
              <RightPanelSkeletonMokha />
            </>
          )}
        </div>

        {!isLoading &&
          suggestedUsers.map((user: Record<string, any>) => (
            <Link
              key={user._id}
              className="flex items-center justify-between gap-4"
              href={`/250327-twitter-ui/home-container/profile/${user.username}`}
            >
              <div className="flex-items-center justify-between gap-4">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <Image
                      alt="profile image"
                      src={
                        user.profileImg ||
                        "/public-250327-twitter-ui/avatars/avatar-placeholder.png"
                      }
                      height={32}
                      width={32}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold tracking-tight truncate w-28">
                    {user.fullName}
                  </span>
                  <span className="text-sm text-slate-500">
                    @{user.username}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    followUser(user._id);
                  }}
                >
                  {followUserIsPending ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    "Follow"
                  )}
                </button>
              </div>
            </Link>
          ))}
      </div>
    </aside>
  );
}

/*
import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";

const RightPanel = () => {
	const isLoading = false;

	return (
		<div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Who to follow</p>
				<div className='flex flex-col gap-4'>
					* // item
					{isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					)}
					{!isLoading &&
						USERS_FOR_RIGHT_PANEL?.map((user) => (
							<Link
								to={`/profile/${user.username}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={user.profileImg || "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{user.fullName}
										</span>
										<span className='text-sm text-slate-500'>@{user.username}</span>
									</div>
								</div>
								<div>
									<button
										className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
										onClick={(e) => e.preventDefault()}
									>
										Follow
									</button>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};
export default RightPanel;
*/
